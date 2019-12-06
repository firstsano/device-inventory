import Controller from '@ember/controller';
import { computed, get } from '@ember/object';


export default Controller.extend({
  isUserProfiled: computed('changeset.agentType', function() {
    return get(this, 'changeset.agentType.hasUserProfile') || false;
  }),
});
