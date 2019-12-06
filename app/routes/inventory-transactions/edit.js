import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { includes } from 'lodash';

import Changeset from 'inventory/lib/extended-changeset';


export default Route.extend({
  flashMessages: service(),

  model(params) {
    return this.get('store').findRecord('inventory-transaction', params.transaction_id)
  },

  setupController(controller, model) {
    controller.set('changeset', new Changeset(model));
    controller.set('relations', {
      agentFrom: model.get('agentFrom'),
      agentTo: model.get('agentTo'),
      devices: model.get('devices').toArray()
    });
  },

  afterModel(model) {
    if (model.get('committed')) {
      this.transitionTo('inventory-transactions.show', model.get('id'));
    }
  },

  actions: {
    edit(changeset) {
      ['agentFrom', 'agentTo', 'devices'].forEach((attribute) => {
        let value = get(this, `controller.relations.${attribute}`);
        changeset.set(`source.${attribute}`, value);
      });
      return changeset.save()
        .then(() => { this.transitionTo('inventory-transactions.show', get(changeset, 'id')); })
        .catch(() => {
          let errorMessages = get(changeset, 'serverErrors').map(({attribute, message}) => {
            return `${attribute} - ${message}`;
          });
          errorMessages.forEach((message) => {
            this.get('flashMessages').danger(message);
          });
        });
    }
  }
});
