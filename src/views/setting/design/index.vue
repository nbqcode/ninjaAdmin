<script lang="ts" setup>
import Editor from "@/components/design/Editor.vue"
import {markRaw, reactive, ref} from "vue";
import {asyncResolveComponent, aysncResolveProps} from "@/hook/helper";
import draggable from "vuedraggable"

const moduleComponents = asyncResolveComponent()
const modulePropsComponents = aysncResolveProps()
const data = reactive([
  {
    id: Symbol('id'),
    component: 0,
    props: {title: '组件1', color: 'red'},
    children:[]
  }
])
const components = [
  {
    id: Symbol('id'),
    component: 0,
    props: {title: '组件1', color: 'red'},
    children:[]
  },
  {
    id: Symbol('id'),
    component: 1,
    props: {title: '组件1', color: 'red'},
    children:[]
  },
]
</script>
<template>
  <el-container class="design-container">
    <el-aside width="300px">
      <draggable
          :list="components"
          tag="span"
          :group="{ name: 'g1',pull:'clone',put:false }"
          item-key="id"
        >
        <template #item="{element}">
          <component :is=" moduleComponents[element.component].component" v-bind="element.props" />
        </template>
      </draggable>
    </el-aside>
    <el-main  class="design-main">
      <Editor v-model="data" ></Editor>
    </el-main>
    <el-aside width="300px">
        <component :is="modulePropsComponents[0]" v-model="data[0].props" />
    </el-aside>
  </el-container>
</template>
<style lang="scss" scoped>
.design-container {
  height: 100%;
  .design-main{
    background-color: #edeff6;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>