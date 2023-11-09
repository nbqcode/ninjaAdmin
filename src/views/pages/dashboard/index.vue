<template>
  <el-row :gutter="16">
    <el-col :span="18">
      <el-card  shadow="never">
        <template #header>
          <span>年</span>
        </template>
        <el-row :gutter="16" justify="space-between">
          <el-col :span="4" v-for="i in 5" :key="i">
            <div class="statistic-card">
              <el-statistic  :value="98500">
                <template #prefix>
                  <el-tag class="mx-1" type="success" size="large">待</el-tag>
                </template>
                <template #title>
                  <div>
                    年
                    <el-tooltip
                        effect="dark"
                        content="Number of users who logged into the product in one day"
                        placement="top"
                    >
                      <el-icon style="margin-left: 4px" :size="12">
                        <Warning />
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
              </el-statistic>
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>than </span>
                  <span class="green">
              24%
              <el-icon>
                <CaretTop />
              </el-icon>
            </span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <DataOverview />
      </el-card>
    </el-col>
    <el-col :span="6">
       <el-card shadow="never">
         <template #header>
           <span>数据总览</span>
         </template>
         <UserActions />
         <ContentTypeDistribution />
       </el-card>
    </el-col>
  </el-row>
  <el-row :gutter="16" style="margin-top:20px;">
    <el-col :span="6">
      <el-card shadow="never">
        <template #header>
          <span>年</span>
        </template>
        <chartCard type="bar"></chartCard>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card shadow="never">
        <template #header>
          <span>月</span>
        </template>
        <chartCard type="line"></chartCard>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card shadow="never">
        <template #header>
          <span>周</span>
        </template>
        <chartCard type="line"></chartCard>
      </el-card>
    </el-col>

    <el-col :span="6">
      <el-card shadow="never">
        <template #header>
          <span>日</span>
        </template>
        <chartCard type="bar"></chartCard>
      </el-card>
    </el-col>
  </el-row>
  <el-card style="margin-top:20px;" shadow="never">
    <template #header>
      <span>数据总览</span>
    </template>
    <ContentPublishingSource></ContentPublishingSource>
  </el-card>
</template>
<style scoped lang="scss">

</style>
<script lang="ts" setup>
import {
  CaretTop,
  Warning,
} from '@element-plus/icons-vue'
import ContentTypeDistribution from "@/views/pages/dashboard/components/ContentTypeDistribution.vue";
import UserActions from "@/views/pages/dashboard/components/UserActions.vue";
import DataOverview from "@/views/pages/dashboard/components/DataOverview.vue";
import chartCard from "@/views/pages/dashboard/components/chartCard.vue";
import ContentPublishingSource from "@/views/pages/dashboard/components/ContentPublishingSource.vue";
</script>

<style scoped>

:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}




.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
</style>