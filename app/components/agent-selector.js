import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { toLower } from 'lodash';
import { decamelizeKeys } from 'humps';


const DEBOUNCE_MS = 400;

const AgentSelector = Component.extend({
  store: service(),
  pagination: service(),
  performSearch: task(function* (name) {
    yield timeout(DEBOUNCE_MS);
    return this.getAgents(toLower(name));
  }).restartable(),

  getAgents(name) {
    const store = this.get('store'),
          pagination = this.get('pagination'),
          filterParams = decamelizeKeys({ filter: { byName: name } })
    ;
    return store.query('agent', pagination.paginate(filterParams));
  }
});

AgentSelector.reopenClass({
  positionalParams: ['value', 'label']
});

export default AgentSelector;
