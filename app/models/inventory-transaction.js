import { computed } from '@ember/object';
import DS from 'ember-data';
import moment from 'moment';


export default DS.Model.extend({
  // Attributes
  transactionTime: DS.attr('date'),
  description: DS.attr('string'),
  createdAt: DS.attr('date'),
  committed: DS.attr('boolean'),

  // Relations
  agentFrom: DS.belongsTo('agent'),
  agentTo: DS.belongsTo('agent'),
  devices: DS.hasMany('device'),
  createdBy: DS.belongsTo('user'),

  // Computed properties
  time: computed('transactionTime', function() {
    let time = this.get('transactionTime');
    return moment(time).format('HH:mm:ss DD-MM-YYYY');
  })
});
