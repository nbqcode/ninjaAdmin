<template>
  <div>
    <vxe-toolbar ref="toolbarRef" custom :refresh="{queryMethod:fetch}">
      <template #buttons>
        <vxe-button v-auth:create @click="router.push('/system_menu/operation')"  content="添加" status="primary"
                    icon="vxe-icon-add"></vxe-button>
      </template>
    </vxe-toolbar>
    <div style="height: calc(100vh - 50px - 0.5em - 100px  - 50px)">
      <vxe-table  :menu-config="{}" :tree-config="treeConfig"  ref="tableRef" height="100%" show-overflow :data="listing">
        <vxe-column type="seq"  ></vxe-column>
        <vxe-column field="id" title="id" sortable></vxe-column>
        <vxe-column tree-node align="left" field="name" title="菜单名称"></vxe-column>
        <vxe-column field="type" title="类型" :formatter="['status','菜单','路由','按钮']"></vxe-column>
        <vxe-column field="route_path" align="left" title="路由"></vxe-column>
        <vxe-column field="sort" title="序号"></vxe-column>
        <vxe-column field="status" :formatter="['status','关闭','开启']" title="状态"></vxe-column>
        <vxe-column field="icon"  title="图标">
          <template #default="{ row }">
            <i :class="row.icon"></i>
          </template>
        </vxe-column>
        <vxe-column field="icon_color"  title="图标颜色"></vxe-column>
        <vxe-column field="created_at" title="created_at"></vxe-column>
        <vxe-column field="updated_at" title="updated_at"></vxe-column>
        <vxe-column title="操作" width="200" :visible="auth(['delete','update'])">
          <template #default="{row}">
            <vxe-button v-auth:delete status="danger" @click="remove(row)" content="删除" icon="vxe-icon-delete"/>
            <vxe-button v-auth:update status="primary" @click="router.push(`/system_menu/operation/${row?.id}`)"
                        content="修改" icon="vxe-icon-edit"/>
          </template>
        </vxe-column>
      </vxe-table>
    </div>
    <vxe-pager background v-model:current-page="params.page" v-model:page-size="params.limit" @page-change="fetch"
               :total="params.total"
               :layouts="['PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']"></vxe-pager>
  </div>
</template>

<script lang="ts" setup>
import {ref, nextTick, onMounted, reactive} from 'vue'
import request from "@/plugins/request";
import {useRouter} from "vue-router";
import {vAuth,auth} from "@/hook/helper";
import type {VxeTableInstance, VxeToolbarInstance} from "vxe-table";
import VXETable from "vxe-table";
import {ElMessageBox,ElMessage} from "element-plus";

const router = useRouter();
const listing = ref([])
const tableRef = ref<VxeTableInstance>()
const toolbarRef = ref<VxeToolbarInstance>()
const whereRef = ref()
const params = reactive<any>({
  page: 1,
  limit: 10,
  total: 0,
  collapse:false,
})

const treeConfig = reactive({
  lazy: true,
  transform: true,
  parentField: 'parent_id',
  hasChildField: 'has_children',
  childrenField: 'children',
  accordion: true,
  loadMethod: async ({row}:any) => {
    const {list}:any = await request.get('/system_menu', {params: {parent_id: row.id}});
    return list;
  }
})
const fetch = async () => {
  const {list, total}:any = await request.get('/system_menu', {params})
  listing.value = list;
  params.total = total;
}
const remove = async (row:any) => {
  const $table = tableRef.value
  try {
     await ElMessageBox.confirm(`确认删除${row.name}`, {confirmButtonText: '确认', cancelButtonText: '取消', type: 'error',})
    if(row.has_children){
      await ElMessageBox.confirm(`确认删除${row.name}包含子菜单`, {confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning',})
    }
    await request.delete(`/system_menu/${row.id}`);
    ElMessage('删除成功')
    $table?.remove(row);
  }catch (e){
    if(e== 'cancel') return;
    ElMessage({
      type:'error',
      message:'删除失败'
    })
  }

}
const toolbar = () => {
  nextTick(() => {
    if (tableRef.value && toolbarRef.value) {
      tableRef.value.connect(toolbarRef.value)
    }
  })
}
onMounted(() => {
  fetch();
  toolbar();
})
</script>

<style lang="scss" scoped>
.tool-btn {
  font-size: 20px;
  cursor: pointer;
}

.tool-btn:hover {
  color: #409eff;
}
</style>