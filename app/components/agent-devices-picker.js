import Component from '@ember/component';
import { observer, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { decamelize, decamelizeKeys } from 'humps';


const EMPTY_OWNER_SCOPE = decamelize('withoutOwner');

const AgentDevicesPicker = Component.extend({
  store: service(),
  pagination: service(),
  tableSettings: computed(() => ({
    columns: [
      { propertyName: 'mac' },
      {
        title: 'type',
        propertyName: 'devType.name',
      }
    ],
    customClasses: {
      table: "selectable-table",
    }
  })),

  selectedAgentChanged: observer('selectedAgent', function() {
    this.loadAgentDevices();
    this.clearSelection();
  }),

  init() {
    this._super(...arguments);
    let preselectedItems = this.get('selectedDevices');
    if (preselectedItems) {
      this.set('preselectedItems', preselectedItems);
    }
    this.loadAgentDevices();
  },

  loadAgentDevices() {
    const store = this.get('store'),
          pg = this.get('pagination'),
          agentId = this.get('selectedAgent.id')
    ;
    let filters = agentId ? { filter: { byOwner: agentId } } : { filter: { scopes: EMPTY_OWNER_SCOPE } };
    filters = decamelizeKeys(filters);
    store.query('device', pg.paginate(filters)).then((devices) => {
      this.set('devices', devices);
    });
  },

  removeDeviceFromSelection(device) {
    this.get('selectedDevices').removeObject(device);
  },

  setSelection(devices) {
    this.set('selectedDevices', devices);
  },

  clearSelection() {
    this.get('selectedDevices').clear();
  },

  actions: {
    changeSelection(e) {
      this.setSelection(e.selectedItems);
    },

    deselectDevice(device) {
      this.removeDeviceFromSelection(device);
    }
  }
});

AgentDevicesPicker.reopenClass({
  positionalParams: ['selectedAgent', 'selectedDevices']
});

export default AgentDevicesPicker;
