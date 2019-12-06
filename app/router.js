import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('devices', function() {
    this.route('new');
    this.route('show', { path: ':device_id' });
    this.route('edit', { path: 'edit/:device_id' });
  });
  // this.route('agents', function() {
  //   this.route('new');
  //   this.route('show', { path: ':agent_id' });
  //   this.route('edit', { path: '/agent/edit/:agent_id' });
  // });
  this.route('inventory-transactions', function() {
    this.route('new');
    this.route('show', { path: ':transaction_id' });
    this.route('edit', { path: ':transaction_id/edit' });
  });
  this.route('devices');
});

export default Router;
