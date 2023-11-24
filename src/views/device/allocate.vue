<script lang="ts" setup>
import {ref, nextTick, onMounted, computed, reactive, onActivated} from 'vue'
import request from "@/plugins/request";
import {bindToolbar} from "@/hook/helper";
import {ElMessageBox, ElMessage, CascaderProps} from "element-plus";

import type {FormInstance} from "element-plus"
import {isBoolean} from "xe-utils";
import type {VxeTableInstance} from "vxe-table"

const listing = ref([])
bindToolbar();
const tableRef = ref<VxeTableInstance>()

interface Params {
  page: number,
  limit: number,
  total: number,
}

interface Form {
  id?: number,
  name: string
  visible: boolean,

  [props: string]: any
}

const params = reactive<Params>({
  page: 1,
  limit: 10,
  total: 0
})

const fetch = async (params: Params) => {
  const {total, list} = await request.get('/company', {params})
  params.total = total;
  listing.value = list;
  return list;
}
const remove = async (row: any) => {
  const $table = tableRef.value

  try {
    await ElMessageBox.confirm(`确认删除${row.name}`, {confirmButtonText: '确认', cancelButtonText: '取消', type: 'error',})
    if (row.has_children) {
      await ElMessageBox.confirm(`确认删除${row.name}包含子菜单`, {confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning',})
    }
    await request.delete(`/company/${row.id}`);
    ElMessage.success('删除成功')
    $table?.remove(row);
  } catch (e) {
    if (e == 'cancel') return;
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}
const updated = async () => {
  await request.put(`/company/${form.id}`, form);
  ElMessage.success('修改成功');
  await fetch(params);
  form.visible = false;
}
const created = async () => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(form)) {
    formData.append(key, value);
  }
  await request.post('/company', form, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  ElMessage.success('创建成功');
  await fetch(params);
  form.visible = false;
}
const form = reactive<Form>(Object.create({
  visible: false,
}))

const formRef = ref<FormInstance>()

const dialogVisible = computed({
  get() {
    return form.visible;
  },
  set(value) {
    if (isBoolean(value)) form.visible = value;
    if (isBoolean(value) && !value) {
      for (const formKey in form) {
        Reflect.deleteProperty(form, formKey);
      }
    }
    if (!isBoolean(value)) {
      form.visible = true;
      Object.assign(form, value);
    }
  }

})
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('密码不能为空!'))
  } else if (value !== form.password) {
    callback(new Error("两次密码不一致"))
  } else {
    callback()
  }
}

const onSubmit = async () => {
  const hasId = Reflect.has(form, 'id');
  await formRef.value.validate()

  if (hasId) return await updated();
  return await created();
}

onActivated(async () => {
  await fetch(params);
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
    <vxe-table :menu-config="{}" ref="tableRef" height="100%" show-overflow :data="listing">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="id" width="60" title="id" sortable></vxe-column>
      <vxe-column field="name" title="设备名称"></vxe-column>
      <vxe-column field="address" title="设备分类"></vxe-column>
      <vxe-column field="address" title="调出单位"></vxe-column>
      <vxe-column field="address" title="调出区域"></vxe-column>
      <vxe-column field="address" title="调拨原因"></vxe-column>
      <vxe-column field="address" title="调入单位"></vxe-column>
      <vxe-column field="address" title="调入部门"></vxe-column>
      <vxe-column field="address" title="调入区域"></vxe-column>
      <vxe-column field="created_at" title="调拨时间"></vxe-column>
      <vxe-column field="updated_at" title="修改时间"></vxe-column>
      <vxe-column title="操作" width="200">
        <template #default="{row}">
          <vxe-button  status="danger" @click="remove(row)" content="删除" icon="vxe-icon-delete"/>
          <vxe-button  status="primary" @click="dialogVisible=row"
                       content="修改" icon="vxe-icon-edit"/>
        </template>
      </vxe-column>
    </vxe-table>
  </div>
  <vxe-pager background v-model:current-page="params.page" v-model:page-size="params.limit" @page-change="fetch(params)"
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
      <span>{{ form.hasOwnProperty('id') ? `编辑${form.name}` : '添加' }}</span>
    </template>
    <el-form v-if="dialogVisible" :model="form" ref="formRef" label-width="120px">
      <el-form-item label="名称"
                    prop="name"
                    :rules="[ { required: true, message: '请输入名称', trigger: 'blur', } ]"
      >
        <el-input v-model="form.name" placeholder="请输入名称"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click.stop="onSubmit">
          保存
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