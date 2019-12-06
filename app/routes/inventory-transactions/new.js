import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { includes } from 'lodash';

import Changeset from 'inventory/lib/extended-changeset';


export default Route.extend({
  flashMessages: service(),

  model() {
    return this.get('store').createRecord('inventory-transaction');
  },

  setupController(controller, model) {
    controller.set('changeset', new Changeset(model));
    controller.set('relations', {
      agentFrom: this.get('settings').defaultAgent,
      agentTo: null,
      devices: []
    });
  },

  actions: {
    create(changeset) {
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
