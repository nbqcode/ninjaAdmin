<script setup lang="ts">
import {computed, onMounted, onUpdated, reactive, ref} from "vue";
import request from  "@/plugins/request"
import type {VxeTableInstance} from "vxe-table"
const props =withDefaults( defineProps<{
  modelValue:any,
  labelKey?:string,
  valueKey?:string,
  url:string
}>(),{valueKey:'id',labelKey:'name'})
const emits = defineEmits(['update:modelValue'])
const tableRef =ref<VxeTableInstance|undefined>();

const value = computed({
  get(){
    return props.modelValue
  },
  set(value){
    emits('update:modelValue',value[props.valueKey]);
  }
})
interface  Params{
   page:number,
   limit:number,
   total:number
}
const params = reactive<Params>({
  page:1,
  limit:10,
  total:0
})
const listing = ref([])
const fetch  = async ()=>{
 const {list,total} =     await  request.get(props.url,params);
    params.total = total;
    listing.value = list;
}

const radioExchange = ({ row})=>{
     value.value = row;
}

onMounted( async ()=>{

  await  read(props.modelValue)
  await  fetch();
})
let row = ref({})
const read = async (id)=>{
  if(!props.modelValue) return false;
  row.value =     await  request.get(`${props.url}/${id}`,params);
}
onUpdated(()=>{
  read(props.modelValue)
})
</script>
<template>
  <el-tooltip
      class="box-item"
      placement="bottom-start"
      effect="light"
  >
    <el-button  size="small" type="primary"  v-if="row[labelKey]">{{row[labelKey]}}</el-button>
    <span v-else >请选择</span>
    <template #content>
        <vxe-table  ref="tableRef"  :radio-config="{
            checkRowKey:props.modelValue
        }" :row-config="{keyField:props.valueKey}" @radio-change="radioExchange" :data="listing" height="300px" size="mini">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column type="radio" width="60"></vxe-column>
          <vxe-column field="id" width="60"></vxe-column>
           <slot></slot>
        </vxe-table>
        <vxe-pager background v-model:current-page="params.page" v-model:page-size="params.limit" @page-change="fetch(params)"
                 :total="params.total"
                 :layouts="['PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']"></vxe-pager>
    </template>
  </el-tooltip>
</template>

<style scoped lang="scss">

</style>