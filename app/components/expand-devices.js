import Component from '@ember/component';


export default Component.extend({
  tagName: '',
  isExpanded: false,

  actions: {
    toggleIsExpanded() {
      this.toggleProperty('isExpanded');
    }
  }
});
