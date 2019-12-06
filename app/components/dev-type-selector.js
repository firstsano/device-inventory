import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';


const DevTypeSelector = Component.extend({
  dbSettings: service(),
  devTypes: computed(function() {
    return this.get('dbSettings').devTypes;
  })
});

DevTypeSelector.reopenClass({
  positionalParams: ['value', 'label']
});

export default DevTypeSelector;
