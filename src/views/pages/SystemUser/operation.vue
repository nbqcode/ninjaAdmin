<template>
  <el-form :model="form" ref="formRef" label-width="120px">
    <el-form-item label="用户名称">
      <el-input v-model="form.name" placeholder="请输入用户名称"/>
    </el-form-item>
    <el-form-item label="头像">
      <el-input v-model="form.avatar" />
    </el-form-item>
    <el-form-item label="角色">
      <el-input v-model="form.system_role_id"  show-password placeholder="请输入密码"/>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password" type="password" show-password placeholder="请输入密码"/>
    </el-form-item>
    <el-form-item label="确认密码">
      <el-input v-model="form.confirm_password" type="password" show-password placeholder="确认密码"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" :icon="Promotion">保存</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import {computed, onMounted, reactive, ref, toRaw} from 'vue'
import type {CascaderProps,CascaderValue} from 'element-plus'
import request from "@/plugins/request"
import {useRouter, useRoute} from "vue-router";
import {assign} from "xe-utils"
import {Promotion} from  "@element-plus/icons-vue"
import {ElMessage} from "element-plus";
const router = useRouter();
const route = useRoute();
const cascaderRef = ref();
interface FormData {
  id?: number,

  [props: string]: any
}

const formRef = ref<HTMLElement | null>()
// do not use same name with ref
const form = reactive<FormData>({
  name: '',
  type: 0,
  sort: 255,
  parent_id:0,
  parent_type:0,
  path_id:[0]
})
const fetch = async () => {
  const data = await request.get(`/system_user/${form.id}`);
  assign(form, data);
}
onMounted(() => {
   const {params} = route;
   assign(form, params);
   if (params?.id) {
      fetch()
  }

})

const onSubmit = async () => {
   const data = {
     method:'post',
     url:'/system_user',
     data:form
   }
   if(form?.id){
      data.url = `${data.url}/${form.id}`
      data.method= 'put'
   }
   try {
     await  request(data);
     router.go(-1);
   }catch (e) {
      console.log(e);
   }
}

</script>

<style scoped lang="scss">
.el-form {
  padding: 1em;
  background-color: #ffffff;

  .el-input {
    width: 300px;
  }
}
</style>
