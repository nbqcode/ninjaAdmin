<template>
  <el-form :model="form" ref="formRef" label-width="120px">
    <el-form-item label="菜单名称">
      <el-input v-model="form.name" placeholder="请输入菜单名称"/>
    </el-form-item>
    <el-form-item label="父菜单">
      <el-cascader ref="cascaderRef" @change="cascaderChange" placeholder="请选择父亲级菜单" clearable v-model="form.path_id" :props="cascaderProps"
                   :options="menu"></el-cascader>
    </el-form-item>
    <el-form-item label="类型" >
      <el-radio-group  v-model="form.type">
        <el-radio-button  :disabled="form.parent_type == 1" label="0" >{{ type[0] }}</el-radio-button>
        <el-radio-button  :disabled="form.parent_type == 1" label="1">{{ type[1] }}</el-radio-button>
        <el-radio-button  :disabled="form.parent_type!==1" label="2">{{ type[2] }}</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="form.type>0" :label="`${type[form.type]}标识`">
      <el-autocomplete
          v-model="form.route_path"
          label="fsdfsdf"
          :fetch-suggestions="page"
          value-key="1"
          clearable
          class="inline-input w-50"
          placeholder="请输入路由"
      >
        <template #suffix>
          <i class="vxe-icon-link"></i>
        </template>
        <template #default="{ item }">
          <span class="link">{{ item[1]}}</span>
        </template>
      </el-autocomplete>
    </el-form-item>
    <el-form-item label="icon">
      <el-col :span="6">
        <el-input v-model="form.icon" style="width: auto" placeholder="请输入图标"></el-input>
      </el-col>
      <el-col :span="2">
        <el-color-picker v-model="form.icon_color"/>
      </el-col>
    </el-form-item>
    <el-form-item label="序号">
      <el-input-number v-model="form.sort" :min="0" :max="255"/>
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
import {has, assign} from "xe-utils"
import {Promotion} from  "@element-plus/icons-vue"
import {ElMessage} from "element-plus";
const router = useRouter();
const route = useRoute();
const cascaderRef = ref();
const pages = import.meta.glob('@/views/pages/**/*.vue',{ as:'url',eager: true});
const page  = Object.entries(pages).map(item=>{
  item[1] = item[1].replace(/\/src\/views\/pages|\.vue/ig,'');
  return item;
});

interface FormData {
  id?: number,
  name?: string,
  type: number,
  sort?: number,
  [props: string]: any
}
const type = ['菜单','路由','按钮']
const menu = ref<FormData[]>([])
const cascaderProps: CascaderProps = {
  lazy: true,
  label: 'name',
  value: 'id',
  expandTrigger:'hover',
  checkStrictly:true,
  leaf: "has_children",
  lazyLoad: async (node, resolve) => {
    const {data, level}: { data: any, level: number } = node
    const params: any = {limit:30};
    if (level) params.parent_id = data['id']
    const {list} = await request.get<any, { list: FormData[], total: number }>('/system_menu', {params});
    list.map((item: any) => {
      item['has_children'] = !item['has_children']
      item.disabled =item.type == 2 || item.id == route.params.id  || item.path_id.includes(parseInt(route.params.id))

      return item;
    })
   if(!level)  list.unshift({name:'顶级',type:0,id:0,has_children:true})
    resolve(list);
  },
}
const cascaderChange =()=>{
    const [{data:{type,id}}] = cascaderRef.value.getCheckedNodes();
    console.log(type);
    form.parent_type =type;
    form.type = type+1;
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
  const data = await request.get(`/system_menu/${form.id}`);
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
  form.parent_id = form.path_id[form.path_id.length -1]
   const data = {
     method:'post',
     url:'/system_menu',
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
