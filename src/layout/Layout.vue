<script lang="ts" setup>
import NavMenu from "@/components/NavMenu.vue";
import {Fold, Expand} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import {onMounted, watch} from "vue";
import screenfull from "screenfull"
import {useUserStore} from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();
watch(
    () => router.currentRoute.value,
    ({path}) => {
      userStore.active = path;
    },
    {
      immediate: true
    }
)

const closeTab = (index: number) => {
  userStore.tabs.splice(index, 1);
}
const handleScreen = () => {
  if (!screenfull.isEnabled) {
    return false;
  }
  screenfull.toggle();
};
const userCommand = async (command: string) => {
  if(/^\//.test(command)){
    router.push(command)
    return;
  }
   await  userStore.Logout();
  
}

</script>
<template>
  <el-container class="main-layout">
    <el-aside :width="userStore.collapse ? 'auto' : '200px'">
      <div
          style="background-color: #0d121b;height: 50px;text-align: center;line-height: 50px;display: flex;align-items: center;justify-content: center">
        <img :style="{width:userStore.collapse ? '50px' : '50px'}" src="@/assets/logo.png" alt="">
        <span v-show="!userStore.collapse" style="font-size: 20px;color:#ffffff;margin-left: 0.5em;">设备报修</span>
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
        <NavMenu route-key="route_path" :router="userStore.menu"/>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header height="auto" style="padding: 0">
        <div class="layout-header">
          <div class="header-left">
            <el-icon :size="24" @click="userStore.collapse = !userStore.collapse">
              <Expand v-if="userStore.collapse"/>
              <Fold v-else/>
            </el-icon>

          </div>
          <div class="header-right">
            <el-icon :size="24" class="vxe-icon-setting"></el-icon>
            <el-icon
                :size="24"
                class="vxe-icon-zoom-out"
                @click="handleScreen"
            ></el-icon>
            <el-dropdown @command="userCommand">
              <el-avatar
                  :src="userStore.user.avatar"
              />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="/my">个人中心</el-dropdown-item>
                  <el-dropdown-item command="logout">注销</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
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
                :key="index"
            >
              {{ item?.meta?.title }}
              <i
                  class="vxe-icon-close"
                  style="font-size: 0.5em; margin-left: 1em"
                  @click.stop="closeTab(index)"
              ></i>
            </div>
          </div>
          <div style="padding: 0 1em">
            <i class="vxe-icon-arrow-double-right"></i>
          </div>
        </div>
      </el-header>
      <el-main class="layout-main">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component"/>
          </keep-alive>
        </router-view>
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

      .el-icon {
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
      position: relative;

      .layout-tabs-item {
        padding: 0.5em 1em;
        z-index: 9999;
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
    position: relative;

    * {
      background-color: #FFFFFF;
    }
  }
}
</style>
