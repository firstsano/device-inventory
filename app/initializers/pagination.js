export function initialize(application) {
  application.inject('route', 'pagination', 'service:pagination');
}

export default {
  name: 'pagination',
  initialize
};
