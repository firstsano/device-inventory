import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed, get } from '@ember/object';
import { hash } from 'rsvp';

export default Service.extend({
  store: service(),
  ajax: service(),
  defaultAgent: null,
  devTypes: null,
  preloadParams: computed(() => ({
    scope: 'all'
  })),

  load() {
    const store = this.get('store'),
          ajax = this.get('ajax'),
          params = this.get('preloadParams')
    ;
    return hash({
      defaultAgent: ajax.request('/agents/initial_agent'),
      devTypes: store.query('dev-type', params)
    }).then((settings) => {
      store.pushPayload('agent', get(settings, 'defaultAgent'));
      const agentId = get(settings, 'defaultAgent.agent.id');
      this.set('defaultAgent', store.peekRecord('agent', agentId));
      this.set('devTypes', store.peekAll('dev-type'));
    });
  }
});
