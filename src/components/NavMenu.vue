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
}>(), { routeKey: 'path' })
</script>
<template>
  <template v-for="(item) in router">
    <el-sub-menu :index="item[routeKey]" v-if="item.children && item.children.length && item.type == 0">
      <template #title>
        <el-icon>
          <i :class="item.icon"></i>
        </el-icon>
        <el-tooltip class="box-item" effect="dark" :content="item.name" placement="right-end">
          <span style="overflow: hidden; text-overflow:ellipsis;">{{ item.name }}</span>
        </el-tooltip>
      </template>
      <NavMenu :router="item.children" :route-key="routeKey"></NavMenu>
    </el-sub-menu>
    <template v-else>
      <el-menu-item :index="item[routeKey]" :route="{ path: item[routeKey] }" v-if="[0, 1].includes(item.type)">
        <el-icon>
          <i :class="item.icon"></i>
        </el-icon>
        <template #title>
          <el-tooltip class="box-item" effect="dark" :content="item.name" placement="right-end">
            <span style=" text-overflow:ellipsis;overflow:hidden;">{{ item.name }}</span>
          </el-tooltip>
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

