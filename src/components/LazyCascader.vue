<script setup lang="ts">
import {computed, onMounted, onUpdated, ref,toValue, watch} from "vue";
 import {CascaderProps} from "element-plus";
 import request from "@/plugins/request";
 const props = defineProps<{
   modelValue?:any,
   url:string,
   exclude?:number[],
   path:number[] | undefined
 }>()
 const emits = defineEmits(['update:modelValue','update:path']);
 const value = computed({
   get(){
     if(props.path ==undefined) return [];
     return props.path;
   },
   set(value){
     emits('update:path',value);
     emits('update:modelValue',value[value.length-1])
   }
 })
const cascaderProps: CascaderProps = {
  lazy: true,
  label: 'name',
  value: 'id',
  expandTrigger: 'hover',
  checkStrictly: true,
  leaf: "has_children",
  lazyLoad: async (node, resolve) => {
    const {data, level}: { data: any, level: number } = node
    const params = {
      parent_id:0,
      limit:30
    };
    if (level) params.parent_id = data['id']
    const list = await  fetch(params);
    !level &&  list.unshift({id:0, name:'顶级',has_children:true})

    resolve(list);
  },
}

const fetch = async (where:any)=>{
  const {list} =  await request.get(props.url, {params:where});
  list.map(item=> {
    item.has_children = !item.has_children;
    return item;
  })
   const result = list.filter(item=>props.exclude?.some((id)=>{
    if(item.id ==id){
      return false;
    }
    if(item.path_id.includes(id)){
      return false;
    }
    return true;
  }))
  return result;
}
</script>
<template>
  <el-cascader  filterable placeholder="请选择父亲级菜单" clearable
               v-model="value" :props="cascaderProps"
  ></el-cascader>
</template>

<style scoped lang="scss">

</style>