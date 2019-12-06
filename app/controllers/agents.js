import Controller from '@ember/controller';
import { computed, get } from '@ember/object';
import { isEmpty, first } from 'lodash';


export default Controller.extend({
  tableSettings: computed(() => ({
    columns: [
      {
        title: 'Name',
        propertyName: 'name'
      },
      {
        title: 'Type',
        propertyName: 'groupName',
      }
    ],
  })),

  actions: {
    displayDataChanged(e) {
      let selectedItems = e.selectedItems;
      if(!isEmpty(selectedItems)) {
        let agent = first(selectedItems);
        this.transitionToRoute('agents.show', get(agent, 'id'));
      }
    },
  }
});
