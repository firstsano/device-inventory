import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { hash } from 'rsvp';

import Changeset from 'inventory/components/extended-changeset';


export default Route.extend({
  ajaxStorage: service(),

  model() {
    let store = this.get('store'), aStore = this.get('ajaxStorage');
    return hash({
      agent: store.createRecord('agent'),
      agentTypes: store.findAll('agent-type'),
      userProfiles: aStore.getUsers()
    });
  },

  setupController(controller, model) {
    let complexModel = model;
    controller.set('model', complexModel.agent);
    controller.set('changeset', new Changeset(complexModel.agent));
    controller.set('agentTypes', complexModel.agentTypes);
    controller.set('userProfiles', complexModel.userProfiles);
  },

  actions: {
    create(changeset) {
      return changeset.clearErrors().save().then(
        () => {
          this.send('refresh');
          this.transitionTo('agents.index');
        },
        () => {
          get(this, 'controller.model.errors').forEach(({ attribute, message }) => {
            changeset.pushErrors(attribute, message);
          });
        }
      );
    }
  }
});
