<script setup lang="ts">

</script>

<template>
  <div class="material">
    <div class="material-item" v-for="i in 100">
      <el-image style="width: 100%;height: 100%"></el-image>
    </div>

  </div>
</template>

<style scoped lang="scss">
  .material{
    height: 100%;
    width: 100%;
    display: flex;
    overflow: auto;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-content: flex-start;
    .material-item{
      margin: 1em;
      flex-shrink: 0;
    }
  }
</style>