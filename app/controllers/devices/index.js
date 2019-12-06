import Controller from '@ember/controller';
import { computed, get } from '@ember/object';
import { first } from "lodash";


export default Controller.extend({
  tableSettings: computed(() => ({
    columns: [
      {
        title: 'Mac-адрес',
        propertyName: 'mac',
      },
      {
        title: 'Модель',
        propertyName: 'devType.name',
      },
      {
        title: 'Тип устройства',
        propertyName: 'devType.shortName',
      },
      {
        title: 'Код платформы',
        propertyName: 'devType.platformCode',
      }
    ]
  })),

  actions: {
    displayDataChanged(e) {
      const device = first(e.selectedItems);
      if (device) {
        this.transitionToRoute('devices.show', get(device, 'id'));
      }
    },
  }
});
