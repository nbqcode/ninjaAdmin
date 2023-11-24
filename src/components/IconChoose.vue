<script setup lang="ts">
import {onMounted, ref, reactive, computed} from "vue";
  import axios from "axios";
  const list = ref([])
  const props = defineProps<{
    modelValue?:string
  }>()
 const emits =  defineEmits(['update:modelValue'])
  const value = computed({
   get(){
     return props.modelValue
   },
   set(value){
     emits('update:modelValue',value);
   }
  })
  onMounted(async ()=>{
    const {data:{css_prefix_text,glyphs}} = await     axios.get('https://at.alicdn.com/t/c/font_3983075_kcv1ny4m1y.json?spm=a313x.manage_type_myprojects.i1.6.54a03a810jd43U&file=font_3983075_kcv1ny4m1y.json');
     glyphs.map((item)=> item.font_class= [css_prefix_text,item.font_class].join(''))
    list.value= glyphs;
  })

</script>

<template>
    <div class="icon-choose">
     <input v-model="value"  placeholder="请选择图标"  /> <i :class="value" class="iconfont" ></i>
      <div class="choose">
        <div v-for="item in list" class="iconfont" @click="value = item.font_class"  :class="{active:value==item.font_class}">
          <i :class="item.font_class"></i>
        </div>
      </div>
    </div>

</template>

<style scoped lang="scss">

  .icon-choose{
     position: relative;
     width: 200px;
    .choose{
      display: none;
      flex-wrap: wrap;
      position: absolute;
      justify-content: space-between;
      align-items: center;
      left:0;
      top: 110%;
      height: 200px;
      z-index: 999;
      width: 100%;

      overflow: auto;
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
      background-color: #FFFFFF;
      &:hover{
        display: flex;
      }
      div{
        font-size: 2em;
        box-sizing: border-box;
        overflow: hidden;
        font-style: normal;
        padding: 0.5em;
      }
      .active{
        background-color: rgba(0,0,0,0.1);
        color:  #409eff;
      }
    }
    input{
      padding: 0.5em;
      border:1px solid #ccc;
      &:focus{
        outline-color: #409eff;
      }
      &:focus~.choose{
         display: flex;

      }
    }
  }
</style>