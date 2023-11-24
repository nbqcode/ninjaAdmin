<script setup lang="ts">
interface menu {
  icon?: string,
  path: string,
  name: string,
  children?: menu[],

  [props: string]: any
}

withDefaults(defineProps<{
  router: menu[],
  routeKey?: keyof menu
}>(), {routeKey: 'path'})
</script>
<template>
  <template v-for="(item) in router">
      <el-sub-menu v-if="item.children && item.children.length && item.type == 0" :index="item[routeKey]">
        <template #title>
          <el-icon>
            <i :class="item.icon"></i>
          </el-icon>
          <span>{{ item.name }}</span>
        </template>
        <NavMenu :router="item.children" :route-key="routeKey"></NavMenu>
      </el-sub-menu>
    <template v-else>
        <el-menu-item :index="item[routeKey]" :route="{ path: item[routeKey] }" v-if="[0].includes(item.type)">
          <el-icon>
            <i :class="item.icon"></i>
          </el-icon>
          <template #title>
            <span style=" text-overflow:ellipsis;overflow:hidden;">{{ item.name }}</span>
          </template>
        </el-menu-item>
    </template>

  </template>
</template>
<style scoped lang="scss">
.el-menu-item.is-active {
  background-color: #008080;
}
</style>

