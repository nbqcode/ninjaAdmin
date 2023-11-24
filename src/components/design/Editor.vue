<script setup lang="ts">
import draggable from "vuedraggable"
import {computed} from "vue";
import {asyncResolveComponent} from '@/hook/helper';
const moduleComponents = asyncResolveComponent()
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
defineOptions({
  name:'EditorChildren'
})
</script>
<template>
  <draggable
      :list="value"
      :group="{ name: 'g1',pull:true,put:true }"
      item-key="id"
      class="editor"
      animation="100"
      tag="div"
      :fallback-on-body="true"
      :fallback-tolerance="50"
      >
      <template #item="{element}">
      <component :is=" moduleComponents[element.component].component" v-bind="element.props">
      </component>
    </template>
  </draggable>
</template>

<style scoped lang="scss">
.editor{
  background-color: #fff;
  width: 375px;
  height: 667px;
  overflow: auto;
   &::-webkit-scrollbar {
    width: 2px;
    height: 1px;
  }
  & ::-webkit-scrollbar-thumb:active {
    background-color: #409eff;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #409eff;
  }
  * ::-webkit-scrollbar-corner {
    background-color: #409eff;
  }
}

</style>