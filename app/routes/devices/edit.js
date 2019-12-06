import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

import Changeset from 'inventory/lib/extended-changeset';


export default Route.extend({
  flashMessages: service(),

  model(params) {
    return this.get('store').findRecord('device', params.device_id)
  },

  setupController(controller, model) {
    controller.set('changeset', new Changeset(model));
    controller.set('relations', { devType: model.get('devType') });
  },

  afterModel(model) {
    if (model.get('takenIntoAccount')) {
      this.transitionTo('devices.show', model.get('id'));
    }
  },

  actions: {
    update(changeset) {
      changeset.set('source.devType', get(this, 'controller.relations.devType'));
      return changeset.save()
        .then(() => { this.transitionTo('devices.show', changeset.get('id')); })
        .catch(() => {
          let errorMessages = get(changeset, 'serverErrors').map(({attribute, message}) => {
            return `${attribute} - ${message}`;
          });
          errorMessages.forEach((message) => {
            this.get('flashMessages').danger(message);
          });
          let source = changeset.get('source');
          source.rollbackAttributes();
        });
    }
  }
});
