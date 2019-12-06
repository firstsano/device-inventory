import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

import Changeset from 'inventory/lib/extended-changeset';


export default Route.extend({
  flashMessages: service(),

  model() {
    return this.get('store').createRecord('device');
  },

  setupController(controller, model) {
    controller.set('changeset', new Changeset(model));
    controller.set('relations', { devType: null });
  },

  actions: {
    create(changeset) {
      changeset.set('source.devType', get(this, 'controller.relations.devType'));
      return changeset.save()
        .then(() => { this.transitionTo('devices.show', get(changeset, 'id')); })
        .catch(() => {
          let errorMessages = get(changeset, 'serverErrors').map(({attribute, message}) => {
            return `${attribute} - ${message}`;
          });
          errorMessages.forEach((message) => {
            this.get('flashMessages').danger(message);
          });
        });
    },
  }
});
