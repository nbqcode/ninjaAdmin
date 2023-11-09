<template>
  <el-statistic :value="98500">
    <template #prefix>
      <el-tag class="mx-1" type="success" size="large">待</el-tag>
    </template>
    <template #title>
      <div>
        待接单
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
  <v-chart class="chart" :option="chartOption" autoresize />
</template>

<style scoped lang="scss">

.chart {
  height: 122px;
}
.general-card {
  min-height: 204px;
}
.content {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
}
.percent-text {
  margin-left: 16px;
}
.chart {
  width: 100%;
  height: 80px;
  vertical-align: bottom;
}

.unit {
  padding-left: 8px;
  font-size: 12px;
}

.label {
  padding-right: 8px;
  font-size: 12px;
}
</style>
<script setup lang="ts">
import VChart from "vue-echarts";
import {Warning} from "@element-plus/icons-vue";
const props = withDefaults(defineProps<{
  type: string
}>(),{
})
const chartOption = {
  grid: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  xAxis: {
    type: 'category',
    show: false,
  },
  yAxis: {
    show: false,
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    formatter: '{c}',
  },
  series: [
    {
      barWidth: 7,
      data: [
        120,
        {
          value: 200,
          itemStyle: {
            color: '#468DFF'
          }
        },
        150,
        80,
        70,
        110,
        130
      ],
      type: props.type
    }
  ],
}


</script>