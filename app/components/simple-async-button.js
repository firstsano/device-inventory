import Component from '@ember/component';
import { task } from 'ember-concurrency';


const SimpleAsyncButton = Component.extend({
  tagName: "",
  performAction: task(function* () {
    yield this.get('action')();
  }).drop(),
});

SimpleAsyncButton.reopenClass({
  positionalParams: ['label']
});

export default SimpleAsyncButton;
