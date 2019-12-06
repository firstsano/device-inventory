import Route from '@ember/routing/route';
import { hash } from 'rsvp';


export default Route.extend({
  model(params) {
    let store = this.get('store');
    return hash({
      agent: store.findRecord('agent', params.agent_id),
      devices: store.query('device', { filter: { owner: params.agent_id }, scope: 'all' })
    });
  }
});
