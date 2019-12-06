import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { isEmpty } from 'lodash';
import { decamelizeKeys } from 'humps';


export default Route.extend({
  model() {
    const store = this.get('store'),
          pagination = this.get('pagination')
    ;
    return store.query('inventory-transaction', pagination.paginate());
  },

  setupController(controller, model) {
    controller.set('transactions', model);
  },

  actions: {
    filter(filterSet) {
      const store = this.get('store'),
            pagination = this.get('pagination'),
            deviceMac = get(filterSet, 'deviceMac')
      ;
      const queryParams = {
        filter: {
          agent_from_id: get(filterSet, 'agentFrom.id'),
          agent_to_id: get(filterSet, 'agentTo.id'),
          byDevice: (isEmpty(deviceMac) ? {} : deviceMac)
        }
      };
      store.query('inventory-transaction', pagination.paginate(decamelizeKeys(queryParams))).then((transactions) => {
        this.controller.set('transactions', transactions)
      });
    }
  }
});
