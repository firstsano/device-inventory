import { computed } from '@ember/object';

import ENV from 'inventory/config/environment';
import ServerModelsTable from 'ember-models-table/components/models-table-server-paginated';


const { pagination } = ENV;

export default ServerModelsTable.extend({
  metaPagesCountProperty: pagination.totalPagesParam,
  metaItemsCountProperty: pagination.totalItemsParam,
  pageSize: pagination.pageSize,
  filterQueryParameters: computed(() => ({
    globalFilter: 'globalSearch',
    sort: 'sort',
    sortDirection: 'sortDirection',
    page: pagination.pageParam,
    pageSize: pagination.pageSizeParam
  }))
});
