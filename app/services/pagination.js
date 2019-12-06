import Service from '@ember/service';
import ENV from 'inventory/config/environment';


const { pagination } = ENV;

export default Service.extend({
  paginate(queryParams) {
    queryParams = queryParams || {};
    queryParams[pagination.pageSizeParam] = pagination.pageSize;
    return queryParams;
  }
});
