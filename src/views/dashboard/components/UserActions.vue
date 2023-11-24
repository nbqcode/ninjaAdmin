<script setup lang="ts">
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart ,BarChart} from 'echarts/charts';
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
  BarChart,
  RadarComponent
]);
const chartOption =ref( {
  grid: {
    left: 44,
    right: 20,
    top: 0,
    bottom: 20,
  },
  xAxis: {
    type: 'value',
    axisLabel: {
      show: true,
      formatter(value: number, idx: number) {
        if (idx === 0) return String(value);
        return `${Number(value) / 1000}k`;
      },
    },
    splitLine: {
      lineStyle: {
        color:  '#E5E8EF',
      },
    },
  },
  yAxis: {
    type: 'category',
    data: ['点赞量', '评论量', '分享量'],
    axisLabel: {
      show: true,
      color: '#4E5969',
    },
    axisTick: {
      show: true,
      length: 2,
      lineStyle: {
        color: '#A9AEB8',
      },
      alignWithLabel: true,
    },
    axisLine: {
      lineStyle: {
        color:  '#A9AEB8',
      },
    },
  },
  tooltip: {
    show: true,
    trigger: 'axis',
  },
  series: [
    {
      data: [1033, 1244, 1520],
      type: 'bar',
      barWidth: 7,
      itemStyle: {
        color: '#4086FF',
        borderRadius: 4,
      },
    },
  ],
})
</script>

<template>
  <v-chart class="chart" :option="chartOption" autoresize />
</template>

<style scoped lang="scss">
.chart {
  height: 122px;
}
</style>