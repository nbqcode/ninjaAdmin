<script setup lang="ts">
import {computed} from "vue";
import {UserFilled} from  "@element-plus/icons-vue"
const props = defineProps<{
  modelValue:any
}>()
const emits = defineEmits(['update:modelValue'])
const value = computed({
  get(){
    if(props.modelValue instanceof  File){
       return URL.createObjectURL(props.modelValue);
    }
    return props.modelValue
  },
  set(value){
    emits('update:modelValue',value);
  }
})
const upload = ()=>{
   const file= document.createElement('input');
         file.setAttribute('type','file');
         file.click();
         const FileExchange = (Event:Event)=>{
            const file = Event.target.files[0];
             value.value = file
         }
         file.addEventListener('change',FileExchange)
}
</script>

<template>
   <div class="upload-avatar">
     <el-avatar :src="value" @click.prevent="upload" :size="80"  >
       <el-icon :size="30"><UserFilled /></el-icon>
     </el-avatar>
   </div>
</template>

<style scoped lang="scss">
    .upload-avatar{
      display: flex;justify-content: center;width: 100%;
    }
</style>