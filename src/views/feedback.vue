<script lang="ts" setup>
import {ref, nextTick, onMounted, computed, reactive, onActivated} from 'vue'
import request from "@/plugins/request";
import { bindToolbar} from "@/hook/helper";
import type {VxeTableInstance} from "vxe-table"
const listing = ref([])
bindToolbar();
const tableRef = ref<VxeTableInstance>()
interface Params {
  page: number,
  limit: number,
  total: number,
}


const params = reactive<Params>({
  page: 1,
  limit: 10,
  total: 0
})

const fetch = async (params: Params) => {
  const {total, list} = await request.get('/system_login_log', {params})
  params.total = total;
  listing.value = list;
  return list;
}
onActivated(async () => {
  await fetch(params);
})
</script>
<template>
  <vxe-toolbar ref="toolbarRef" custom :refresh="{queryMethod:fetch}">
    <template #buttons>

    </template>
  </vxe-toolbar>
  <div style="height: calc(100vh - 200px - 0.5em)">
    <vxe-table :menu-config="{}" ref="tableRef" height="100%" show-overflow :data="listing">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="id" width="60" title="id" sortable></vxe-column>
      <vxe-column field="image" width="100" title="图片"></vxe-column>
      <vxe-column field="content" title="内容"></vxe-column>
      <vxe-column field="created_at" title="创建时间"></vxe-column>
      <vxe-column field="updated_at" title="修改时间"></vxe-column>
    </vxe-table>
  </div>
  <vxe-pager background v-model:current-page="params.page" v-model:page-size="params.limit" @page-change="fetch(params)"
             :total="params.total"
             :layouts="['PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']"></vxe-pager>

</template>
<style lang="scss" scoped>
.tool-btn {
  font-size: 20px;
  cursor: pointer;
}

.tool-btn:hover {
  color: #409eff;
}
</style>