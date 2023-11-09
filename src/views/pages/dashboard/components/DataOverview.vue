<script setup lang="ts">
import { use } from 'echarts/core';
import {LineChart} from 'echarts/charts';

import { ToolboxComponent,GraphicComponent } from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide } from 'vue';
provide(THEME_KEY, 'light');
use([
  LineChart,
  ToolboxComponent,
  GraphicComponent
]);
const xAxis = ref<string[]>([]);

const chartOption =ref( {
  color: ['#80FFA5'],
  title: {
    text: '总数据预览'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },

  legend: {
    data: ['Line 1']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Line 1',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.5,
      },
      emphasis: {
        focus: 'series'
      },
      data: [140, 232, 101, 264, 90, 340, 250, 232, 101, 264, 90, 340, 250, 232, 101, 264, 90, 340, 250]
    },
    {
      name: 'Line 2',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.5,
      },
      emphasis: {
        focus: 'series'
      },
      data: [120, 282, 111, 234, 220, 340, 310, 232, 101, 264, 90, 340, 250, 232, 101, 264, 90, 340, 250, 232, 101, 264, 90, 340, 250]
    },
    {
      name: 'Line 3',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.5,

      },
      emphasis: {
        focus: 'series'
      },
      data: [320, 132, 201, 334, 190, 130, 220, 232, 101, 264, 90, 340, 250, 232, 101, 264, 90, 340, 250, 232, 101, 264, 90, 340, 250]
    },
    {
      name: 'Line 4',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.5,

      },
      emphasis: {
        focus: 'series'
      },
      data: [220, 402, 231, 134, 190, 230, 120, 232, 101, 264, 90, 340, 250, 232, 101, 264, 90, 340, 250, 232, 101, 264, 90, 340, 250]
    },
    {
      name: 'Line 5',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      label: {
        show: true,
        position: 'top'
      },
      areaStyle: {
        opacity: 0.5,
      },
      emphasis: {
        focus: 'series'
      },
      data: [220, 302, 181, 234, 210, 290, 150, 232, 101, 264, 90, 340, 250, 232, 101, 264, 90, 340, 250]
    }
  ]
})
</script>

<template>
  <v-chart class="chart" :option="chartOption" autoresize />
</template>

<style scoped lang="scss">
.chart {
  height: 400px;
}
</style>