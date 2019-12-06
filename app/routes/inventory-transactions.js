import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { task } from 'ember-concurrency';
import { includes } from "lodash";
import { decamelizeKeys } from 'humps';


export default Route.extend({
  checkAgentDevice: task(function* (agent, mac) {
    const filters = {
      filter: {
        byOwner: get(agent, 'id'),
        byMac: mac
      }
    };
    let devices = yield this.get('store').query('device', decamelizeKeys(filters));
    if (!get(devices, 'firstObject')) {
      return false;
    }
    return true;
  }),

  actions: {
    addDeviceToSelected(selectedDevices, mac) {
      const store = this.get('store');
      const device = store.peekAll('device').filterBy('mac', mac).get('firstObject');
      if (device && !includes(selectedDevices, device)) {
        selectedDevices.pushObject(device);
      }
    }
  }
});
