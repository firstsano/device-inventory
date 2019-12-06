import DS from 'ember-data';
import { computed } from '@ember/object';


export default DS.Model.extend({
  name: DS.attr('string'),
  shortName: DS.attr('string'),
  platformCode: DS.attr('string'),
  fullName: computed('name', 'shortName', 'platformCode', function() {
    const name = this.get('name'),
          shortName = this.get('shortName'),
          code = this.get('platformCode')
    ;
    return `${name} (${shortName}) - ${code}`;
  })
});
