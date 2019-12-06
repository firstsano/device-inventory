import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';


export default Route.extend({
  i18n: service(),
  flashMessages: service(),

  model() {
    let p = this.get('pagination');
    return this.get('store').query('agent', p.paginate());
  },

  actions: {
    refresh() {
      this.refresh();
    },

    destroy(model) {
      model.destroyRecord().then(
        () => {
          this.transitionTo('agents');
          this.send('refresh');
        },
        (errors) => {
          let errorMessage = errors.errors.map((e) => e.detail).join('');
          this.get('flashMessages').danger(errorMessage);
        }
      );
    },
  }
});
