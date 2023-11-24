<script lang="ts" setup>
import {ref, nextTick, onMounted, computed, reactive, onActivated} from 'vue'
import request from "@/plugins/request";
import {vAuth, auth,bindToolbar} from "@/hook/helper";
import {ElMessageBox, ElMessage} from "element-plus";
import type {FormInstance} from  "element-plus"
import LazyCascader from "@/components/LazyCascader.vue";
import {isBoolean} from "xe-utils";
import type {VxeTableInstance} from  "vxe-table"
import {useUserStore} from "@/stores/user";
const userStore = useUserStore();

const listing = ref([])
bindToolbar();
const tableRef =ref<VxeTableInstance>()
interface  Params{
  page?:number,
  limit?:number,
  total?:number,
  [props:string]:any
}
interface Form {
  id?: number,
  name:string
  visible: boolean,
  [props: string]: any
}
const params = reactive<Params>({
  page: 1,
  limit: 10,
  total: 0
})
const treeConfig ={
  loadMethod: async ({row}: any) => {
   return await  fetch( {parent_id: row.id})
  }
}
const fetch = async (params: Params) => {
  const {total,list}  = await request.get('/fault', {params})
  params.total =total;
  return list;
}
const remove = async (row: any) => {
  const $table = tableRef.value

  try {
    await ElMessageBox.confirm(`确认删除${row.name}`, {confirmButtonText: '确认', cancelButtonText: '取消', type: 'error',})
    if (row.has_children) {
      await ElMessageBox.confirm(`确认删除${row.name}包含子菜单`, {confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning',})
    }
    await request.delete(`/fault/${row.id}`);
    ElMessage.success('删除成功')
    $table?.remove(row);
    await userStore.getUserInfo();
  } catch (e) {
    if (e == 'cancel') return;
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }

}
const  updated = async (data) => {
   await request.put(`/fault/${data.id}`,data);
   ElMessage.success('修改成功');
   await userStore.getUserInfo();
   form.visible =false;
}
const created =  async () => {
  await request.post('/fault',form);
  ElMessage.success('创建成功');
  await userStore.getUserInfo();
  await changePage();
  form.visible =false;
}
const form = reactive<Form>(Object.create({
  visible: false,
  type: 0,
  sort: 255,
  status: 1
}))

const formRef = ref<FormInstance>()

const dialogVisible = computed({
  get() {
    return form.visible;
  },
  set(value) {
    if (isBoolean(value))  form.visible = value;
    if(isBoolean(value) && !value){
      for (const formKey in form) {
          Reflect.deleteProperty(form,formKey);
      }
    }
    if (!isBoolean(value)) {
      form.visible = true;
      Object.assign(form, value);
    }
  }

})


const onSubmit = async () => {
  const hasId = Reflect.has(form,'id');
  if(hasId) return await  updated(form);
  return await  created();
}
const changePage =async ()=>{
  listing.value = await fetch(params);
}
onActivated(async ()=>{
   listing.value = await fetch(params);
})
</script>
<template>
  <vxe-toolbar ref="toolbarRef" custom :refresh="{queryMethod:fetch}">
    <template #buttons>
      <vxe-button  @click="dialogVisible=true" content="添加" status="primary"
                  icon="vxe-icon-add"></vxe-button>
    </template>
  </vxe-toolbar>
  <div style="height: calc(100vh - 200px - 0.5em)">
    <vxe-table :menu-config="{}" :tree-config="treeConfig" ref="tableRef" height="100%" show-overflow :data="listing">
      <vxe-column type="seq" width="100"></vxe-column>
      <vxe-column field="id" title="id" width="100" sortable></vxe-column>
      <vxe-column tree-node align="left" field="name" title="名称"></vxe-column>
      <vxe-column field="created_at" title="created_at"></vxe-column>
      <vxe-column field="updated_at" title="updated_at"></vxe-column>
      <vxe-column title="操作" width="500" >
        <template #default="{row}">
          <vxe-button status="danger" @click="remove(row)" content="删除" icon="vxe-icon-delete"/>
          <vxe-button status="primary" @click="dialogVisible=row"
                      content="修改" icon="vxe-icon-edit"/>
        </template>
      </vxe-column>
    </vxe-table>
  </div>
  <vxe-pager background v-model:current-page="params.page" v-model:page-size="params.limit" @page-change="changePage"
             :total="params.total"
             :layouts="['PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']"></vxe-pager>
<!-- 表单start  -->
  <el-dialog
      v-model="dialogVisible"
      :draggable="true"
      align-center
      width="30%"
  >
    <template #header>
      <span>{{form.hasOwnProperty('id') ? `编辑${form.name}` : '添加'}}</span>
    </template>
    <el-form :model="form" v-if="dialogVisible" ref="formRef" label-width="120px" >
      <el-form-item label="名称">
        <el-input v-model="form.name" placeholder="请输入菜单名称"/>
      </el-form-item>
      <el-form-item label="父菜单">
        <LazyCascader v-model="form.parent_id" url="/fault" :exclude="[form.id]" v-model:path="form.path_id"></LazyCascader>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="0"></el-switch>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click.stop="onSubmit">
          保存提交
        </el-button>
      </span>
    </template>
  </el-dialog>
<!-- 表单end -->
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