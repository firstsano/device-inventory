import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { hash } from 'rsvp';

import Changeset from 'inventory/components/extended-changeset';


export default Route.extend({
  ajaxStorage: service(),

  model(params) {
    let store = this.get('store'), aStore = this.get('ajaxStorage');
    return hash({
      agent: store.findRecord('agent', params.agent_id),
      agentTypes: store.findAll('agent-type'),
      userProfiles: aStore.getUsers()
    });
  },

  setupController(controller, model) {
    let complexModel = model;
    controller.set('model', complexModel.agent);
    controller.set('changeset', new Changeset(complexModel.agent));
    controller.set('agentTypes', complexModel.agentTypes);
    controller.set('selectedAgentType', get(complexModel, 'agent.agentType.id'));
    controller.set('userProfiles', complexModel.userProfiles);
  },

  actions: {
    update(changeset) {
      return changeset.clearErrors().save().then(
        () => {
          let modelId = get(this, 'controller.model.id');
          this.send('refresh');
          this.transitionTo('agents.show', modelId);
        },
        () => {
          let sourceModel = this.controller.get('model'), currentErrors = [];
          sourceModel.get('errors').forEach(({ attribute, message }) => { currentErrors.push({attribute: attribute, message: message}); });
          sourceModel.rollbackAttributes();
          currentErrors.forEach(({ attribute, message }) => { changeset.pushErrors(attribute, message); })
        }
      );
    },
    rollback(changeset) {
      changeset.rollback();
    }
  }
});
