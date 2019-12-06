import Route from '@ember/routing/route';
import { get } from '@ember/object';


export default Route.extend({
  actions: {
    destroy(model) {
      model.destroyRecord()
        .then(() => { this.transitionTo('devices.index'); })
        .catch((errorObject) => {
          let errors = get(errorObject, 'errors').map(({title}) => title);
          errors.forEach((message) => { this.get('flashMessages').danger(message); });
        });
    }
  }
});
