import ENV from 'inventory/config/environment';
import AjaxService from 'ember-ajax/services/ajax';


const { backend } = ENV;

export default AjaxService.extend({
    contentType: 'application/json; charset=utf-8',
    host: '/',
    namespace: backend.namespace
});
