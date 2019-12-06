import DS from 'ember-data';


export default DS.Model.extend({
  // Attributes
  mac: DS.attr('string'),
  createdAt: DS.attr('date'),
  takenIntoAccount: DS.attr('boolean'),

  // Relations
  devType: DS.belongsTo('devType'),
  agent: DS.belongsTo('agent')
});
