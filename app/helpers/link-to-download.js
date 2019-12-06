import Ember from 'ember';
import _ from 'lodash';

export function linkToDownload([type, ...params]) {
  let namespace = '/storage/files/',
    target_url = '';
  if (type === 'acceptance_act') {
    let model = _.first(params);
    target_url = 'acceptance_act/' + model.id;
  }
  return namespace + target_url;
}

export default Ember.Helper.helper(linkToDownload);
