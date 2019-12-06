import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { toUpper, isEmpty } from 'lodash';


export default Component.extend({
  layoutSwitcher: service(),
  flashMessages: service(),
  isScannerActive: false,

  didInsertElement() {
    this._super(...arguments);
    this.$().find('input').focus();
  },

  filteredMac: computed('mac', function() {
    let mac = this.get('mac') || '',
        switcher = this.get('layoutSwitcher');
    return toUpper(switcher.switchLayout(mac));
  }),

  playErrorSound() {
    this.$().find('.device-scanner__audio')[0].play();
  },

  clearInput() {
    this.set('mac', null);
  },

  scanDevice: task(function* (mac) {
    const message = this.get('flashMessages');
    if (isEmpty(mac)) {
      return false;
    }
    let deviceExists = yield this.get('onScan')(mac);
    if (!deviceExists) {
      message.danger('Прибор с указанным mac-адресом не найден');
      this.playErrorSound();
      return false;
    }
    this.get('onSuccess')(mac);
    this.clearInput();
    return true;
  }),

  actions: {
    switchScanner() {
      this.toggleProperty('isScannerActive');
    }
  }
});
