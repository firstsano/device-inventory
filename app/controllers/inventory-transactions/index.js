import Controller from '@ember/controller';
import { computed } from '@ember/object';


export default Controller.extend({
  tableSettings: computed(() => ({
    columns: [
      {
        title: 'Id',
        propertyName: 'id',
        routeName: 'inventory-transactions.show'
      },
      {
        title: 'От кого',
        propertyName: 'agentFrom.name',
      },
      {
        title: 'Время операции',
        propertyName: 'time',
      },
      {
        title: 'Устройства',
        propertyName: 'devices',
        component: 'ember-model-table/transaction-devices',
        disableSorting: true
      },
      {
        title: 'Кому',
        propertyName: 'agentTo.name',
      },
      {
        title: 'Комментарий',
        propertyName: 'description'
      },
      {
        title: 'Подтверждена',
        propertyName: 'committed',
        component: 'ember-model-table/transaction-committed'
      }
    ]
  })),

  init() {
    this._super(...arguments);
    this.set('filter', {})
  }
});
