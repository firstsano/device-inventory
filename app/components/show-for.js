import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { isEmpty, includes } from 'lodash';


export default Component.extend({
  modelName: alias('model.constructor.modelName'),

  modelProperties: computed('model', function() {
    let attributes = [], model = this.get('model');

    model.eachAttribute((name, meta) => {
      attributes.push({
        name: name,
        meta: meta,
      });
    });

    model.eachRelationship((name) => {
      attributes.push({
        name: name,
        meta: { type: 'relation' }
      });
    });

    return attributes;
  }),

  showForProperties: computed('model', 'displayProperties', function() {
    let dp = this.get('displayProperties'), mp = this.get('modelProperties');
    if (!isEmpty(dp)) {
      return mp.filter((item) => includes(dp, item.name));
    }
    return mp;
  })
});
