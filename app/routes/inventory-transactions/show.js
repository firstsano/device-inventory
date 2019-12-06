import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';


export default Route.extend({
  ajax: service(),
  flashMessages: service(),

  model(params) {
    return this.get('store').findRecord('inventory-transaction', params.transaction_id);
  },

  actions: {
    confirm(model) {
      let id = model.get('id');
      this.get('ajax').request(`/inventory_transactions/${id}/commit`, { method: 'PUT' })
        .then(() => { this.refresh(); })
        .catch((errorObject) => {
          let errors = get(errorObject, 'errors').map(({title}) => title);
          errors.forEach((message) => { this.get('flashMessages').danger(message); });
        });
    }
  }
});
