import ENV from 'inventory/config/environment';
import ActiveModelAdapter from 'active-model-adapter';

const { backend } = ENV;

export default ActiveModelAdapter.extend({
  namespace: backend.namespace
});
