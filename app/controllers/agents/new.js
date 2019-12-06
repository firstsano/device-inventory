import Controller from '@ember/controller';
import { computed, get } from '@ember/object';


export default Controller.extend({
  isUserProfiled: computed('changeset.agentType', 'agentTypes', function() {
    let selectedProfile = get(this, 'changeset.agentType.hasUserProfile');
    if (selectedProfile === undefined) {
      selectedProfile = get(this, 'agentTypes.firstObject.hasUserProfile');
    }
    return selectedProfile || false;
  }),
});
