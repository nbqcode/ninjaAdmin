<script setup lang="ts">
withDefaults(defineProps<{
  title?:string,
  color?:string,
}>(),{title:'测试',color:'red'})
</script>

<template>
 <span :style="{backgroundColor:color}">{{title}}   <slot>插槽</slot></span>
</template>

<style scoped lang="scss">

</style>