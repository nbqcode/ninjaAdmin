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
  [props:string]:any
}


const params = reactive<Params>({
  page: 1,
  limit: 10,
  total: 0,
  status:0,
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
  <div style="height: 60px;line-height: 60px;background-color: #FFFFFF;padding: 0 1em;">
    <vxe-input placeholder="请输入关键字" prefix-icon="vxe-icon-search" ></vxe-input>
    <vxe-button status="primary"  content="新建工单" icon="vxe-icon-send"/>
    <vxe-button status="primary"  content="补单" icon="vxe-icon-edit"/>
  </div>
  <vxe-toolbar ref="toolbarRef" custom :refresh="{queryMethod:fetch}">
    <template #buttons>
      <vxe-radio-group v-model="params.status">
        <el-badge value="99">
            <vxe-radio-button :label="0" content="全部"></vxe-radio-button>
        </el-badge>
        <el-badge value="99">
        <vxe-radio-button :label="1" content="待派单"></vxe-radio-button>
        </el-badge>
        <vxe-radio-button :label="2" content="未接单"></vxe-radio-button>
        <vxe-radio-button :label="3" content="处理中"></vxe-radio-button>
        <vxe-radio-button :label="4" content="待确认"></vxe-radio-button>
        <vxe-radio-button :label="5" content="已完成"></vxe-radio-button>
        <vxe-radio-button :label="6" content="已取消"></vxe-radio-button>
        <vxe-radio-button :label="7" content="已驳回"></vxe-radio-button>
      </vxe-radio-group>
    </template>
  </vxe-toolbar>
  <div style="height: calc(100vh - 260px - 0.5em)">
    <vxe-table show-header-overflow :menu-config="{}" ref="tableRef" height="100%" show-overflow :data="listing">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="id" width="60" title="id" sortable></vxe-column>
      <vxe-column field="image"  title="工单编号"></vxe-column>
      <vxe-column field="image"  title="单位名称"></vxe-column>
      <vxe-column field="image"  title="报修区域"></vxe-column>
      <vxe-column field="image"  title="姓名"></vxe-column>
      <vxe-column field="image"  title="联系电话"></vxe-column>
      <vxe-column field="image"  title="故障类型"></vxe-column>
      <vxe-column field="image"  title="故障描述"></vxe-column>
      <vxe-column field="image"  title="设备名称"></vxe-column>
      <vxe-column field="image"  title="设备编号"></vxe-column>
      <vxe-column field="image"  title="技术员"></vxe-column>
      <vxe-column field="created_at" :visible="false" title="创建时间"></vxe-column>
      <vxe-column field="updated_at" :visible="false" title="修改时间"></vxe-column>
      <vxe-column title="操作" width="500" field="operation" >
        <template #default="{row}">
          <vxe-button status="primary"  content="派单" icon="vxe-icon-edit"/>
          <vxe-button status="primary"  content="驳回" icon="vxe-icon-edit"/>
          <vxe-button status="primary"  content="编辑" icon="vxe-icon-edit"/>
          <vxe-button status="primary"  content="报告" icon="vxe-icon-edit"/>
          <vxe-button status="danger"  content="删除" icon="vxe-icon-edit"/>
        </template>
      </vxe-column>
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
:deep(.vxe-buttons--wrapper){
  padding-left: 0;
}
.tool-btn:hover {
  color: #409eff;
}
</style>