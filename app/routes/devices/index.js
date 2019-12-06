import Route from '@ember/routing/route';


export default Route.extend({
  model() {
    let store = this.get('store'),
        pagination = this.get('pagination')
    ;
    return store.query('device', pagination.paginate());
  }
});
