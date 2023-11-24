<script setup lang="ts">
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart ,RadarChart} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  RadarComponent
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide } from 'vue';
provide(THEME_KEY, 'light');
use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  RadarChart,
  RadarComponent
]);
const chartOption =ref( {
  grid: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 20,
  },
  legend: {
    show: true,
    top: 'center',
    right: '0',
    orient: 'vertical',
    icon: 'circle',
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 20,
    textStyle: {
      color: '#4E5969',
    },
  },
  radar: {
    center: ['40%', '50%'],
    radius: 80,
    indicator: [
      { name: '国际', max: 6500 },
      { name: '财经', max: 22000 },
      { name: '科技', max: 30000 },
      { name: '其他', max: 38000 },
      { name: '体育', max: 52000 },
      { name: '娱乐', max: 25000 },
    ],
    axisName: {
      color: '#4E5969',
    },
    axisLine: {
      lineStyle: {
        color:  '#E5E6EB',
      },
    },
    splitLine: {
      lineStyle: {
        color: '#E5E6EB',
      },
    },
    splitArea: {
      areaStyle: {
        color: [],
      },
    },
  },
  series: [
    {
      type: 'radar',
      areaStyle: {
        opacity: 0.2,
      },
      data: [
        {
          value: [4850, 19000, 19000, 29500, 35200, 20000],
          name: '纯文本',
          symbol: 'none',
          itemStyle: {
            color:  '#249EFF',
          },
        },
        {
          value: [2250, 17000, 21000, 23500, 42950, 22000],
          name: '图文类',
          symbol: 'none',
          itemStyle: {
            color:  '#313CA9',
          },
        },
        {
          value: [5850, 11000, 26000, 27500, 46950, 18000],
          name: '视频类',
          symbol: 'none',
          itemStyle: {
            color:  '#21CCFF',
          },
        },
      ],
    },
  ],
})
</script>

<template>
  <v-chart class="chart" :option="chartOption" autoresize />
</template>

<style scoped lang="scss">
.chart {
  height: 300px;
}
</style>