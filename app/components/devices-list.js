import Component from '@ember/component';
import { get, computed } from '@ember/object';


export default Component.extend({
  withExpand: true,
  deviceTypes: null,
  devicesCount: computed('devices.[]', function() {
    return get(this, 'devices.length') || 0;
  }),
});
