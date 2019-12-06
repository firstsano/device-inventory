import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';


export default Route.extend({
  ajax: service(),

  model(params) {
    return this.get('store').findRecord('device', params.device_id);
  }
});
