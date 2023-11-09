<script setup lang="ts">
import {reactive} from "vue"
import {User, Lock} from "@element-plus/icons-vue"
import {useUserStore} from "@/stores/user";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

const router = useRouter();
const userStore = useUserStore();

interface form {
  username: string,
  password: string,
  loading: boolean,

  [props: string]: any
}

const form = reactive<form>({
  username: 'admin',
  password: '123456',
  loading: false
})
const onSubmit = async () => {
  try {
    form.loading = true;
    await userStore.Password(form.username, form.password);
    await router.replace('/')
    form.loading = false;
  } catch ($e) {
    form.loading = false;
    ElMessage.error($e as string);
  }
}
</script>
<template>
  <div class="login-container">
    <div class="login-layout">

      <h1 style="text-align: center">象牙学堂</h1>
      <el-form :model="form" label-width="100px" label-position="top">
        <el-form-item label="账号">
          <el-input v-model="form.username" :prefix-icon="User" placeholder="请输入用户名" type="text"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input show-password placeholder="请输入密码" :prefix-icon="Lock" v-model="form.password"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" :loading="form.loading" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style scoped lang="scss">
.login-container {
  height: 100vh;
  --gradient-start: #5583EE;
  --gradient-end: #41D8DD;
  background: linear-gradient(33deg, var(--gradient-start), var(--gradient-end));

  .login-layout {
    width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    border-radius: 5px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    padding: 80px;
  }
}
</style>