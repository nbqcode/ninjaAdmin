<script lang="ts" setup>
import NavMenu from "@/components/NavMenu.vue";
import { Fold, Expand } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { onMounted, watch } from "vue";
import screenfull from "screenfull"
import { useUserStore } from "@/stores/user";
const router = useRouter();
const userStore = useUserStore();
watch(
    ()=>router.currentRoute.value,
    ({path})=>{
        userStore.active =path;
    },
    {
      immediate:true
    }
)
const handleScreen = () => {
  if (!screenfull.isEnabled) {
    return false;
  }
  screenfull.toggle();
};
onMounted(() => {

});
</script>
<template>
  <el-container class="main-layout">
    <el-aside :width="userStore.collapse ? 'auto' : '200px'">
      <div style="background-color: #0d121b;height: 50px;text-align: center;line-height: 50px;display: flex;align-items: center;justify-content: center"  >
        <img  :style="{width:userStore.collapse ? '50px' : '50px'}"  src="@/assets/logo.png" alt="">
        <span  v-show="!userStore.collapse" style="font-size: 20px;color:#ffffff;margin-left: 0.5em;">设备报修</span>
      </div>
      <el-menu
        class="main-menu"
        :default-active="userStore.active"
        :collapse="userStore.collapse"
        active-text-color="#ffffff"
        background-color="#0d121b"
        unique-opened
        router
        :ellipsis="true"
        text-color="#f4f4f5"
      >
      <NavMenu  route-key="route_path" :router="userStore.menu" />
      </el-menu>
    </el-aside>
    <el-container>
      <el-header height="auto" style="padding: 0">
        <div class="layout-header">
          <div class="header-left" >
            <el-icon :size="24" @click="userStore.collapse = !userStore.collapse">
              <Expand v-if="userStore.collapse"/>
              <Fold  v-else/>
            </el-icon>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
              <el-breadcrumb-item
              ><a href="/">promotion management</a></el-breadcrumb-item
              >
              <el-breadcrumb-item>promotion list</el-breadcrumb-item>
              <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="header-right">
            <el-icon :size="24" class="vxe-icon-setting"></el-icon>
            <el-icon
              :size="24"
              class="vxe-icon-zoom-out"
              @click="handleScreen"
            ></el-icon>
            <el-avatar
              src="data:image/jpeg;base64,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"
            />
            <el-icon :size="24" class="vxe-icon-ellipsis-v"></el-icon>
          </div>
        </div>
        <div class="layout-tabs">
          <div style="padding: 0 1em">
            <i class="vxe-icon-arrow-double-left"></i>
          </div>
          <div class="tabs-main">
             <div
              class="layout-tabs-item"
              :class="{ active: userStore.active == item.path }"
              v-for="(item, index) in userStore.tabs"
              @click="router.push(item)"
            >
              {{ item?.meta?.title }}
              <i
                class="vxe-icon-close"
                style="font-size: 0.5em; margin-left: 1em"
                @click.stop="userStore.tabs.splice(index, 1)"
              ></i>
            </div>
          </div>
          <div style="padding: 0 1em">
            <i class="vxe-icon-arrow-double-right"></i>
          </div>
        </div>
      </el-header>

      <el-main class="layout-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<style lang="scss" scoped>
.main-layout {
  padding: 0;
  margin: 0;
  background-color: #edeff6;
  .main-menu {
    height: calc(100vh - 50px);
    overflow: auto;
    border: none;
  }
  .layout-header {
    display: flex;
    padding: 0 1em;
    align-items: center;
    height: 50px;
    background-color: #fff;
    .header-left {
      flex: 1;
      display: flex;
      align-items: center;
      .el-icon{
        margin-right: 1em;
      }
    }
    .header-right {
      display: flex;
      align-items: center;
      & > * {
        margin-left: 1em;
        cursor: pointer;
      }
    }
  }
  .layout-tabs {
    display: flex;
    background-color: #fff;
    height: 40px;
    align-items: center;
    margin-top: 1px;
    .tabs-main {
      flex: 1;
      display: flex;
      .layout-tabs-item {
        padding: 0.5em 1em;
        cursor: pointer;
      }
      .active {
        background: #008080;
        color: #ffffff;
      }
    }
  }
  .layout-main {
    background-color: #edeff6;
    height: calc(100vh - 250px);
    padding: 0.5em;
    box-sizing: border-box;
  }
}
</style>
