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
const graphicElementStyle = {
  textAlign: 'center',
  fill:  '#4E5969',
  fontSize: 14,
  lineWidth: 10,
  fontWeight: 'bold',
};
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
  legend: {
    left: 'center',
    data: ['UGC原创', '国外网站', '转载文章', '行业报告', '其他'],
    bottom: 0,
    icon: 'circle',
    itemWidth: 8,
    textStyle: {
      color:  '#4E5969',
    },
    itemStyle: {
      borderWidth: 0,
    },
  },
  tooltip: {
    show: true,
    trigger: 'item',
  },
  graphic: {
    elements: [
      {
        type: 'text',
        left: '9.6%',
        top: 'center',
        style: {
          text: '纯文本',
          ...graphicElementStyle,
        },
      },
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: '图文类',
          ...graphicElementStyle,
        },
      },
      {
        type: 'text',
        left: '86.6%',
        top: 'center',
        style: {
          text: '视频类',
          ...graphicElementStyle,
        },
      },
    ],
  },
  series: [
    {
      type: 'pie',
      radius: ['50%', '70%'],
      center: ['11%', '50%'],
      label: {
        formatter: '{d}% ',
        color:  '#4E5969',
      },
      itemStyle: {
        borderColor:  '#fff',
        borderWidth: 1,
      },
      data: [
        {
          value: [148564],
          name: 'UGC原创',
          itemStyle: {
            color: '#249EFF',
          },
        },
        {
          value: [334271],
          name: '国外网站',
          itemStyle: {
            color: '#846BCE',
          },
        },
        {
          value: [445694],
          name: '转载文章',
          itemStyle: {
            color: '#21CCFF',
          },
        },
        {
          value: [445694],
          name: '行业报告',
          itemStyle: {
            color: '#0E42D2',
          },
        },
        {
          value: [445694],
          name: '其他',
          itemStyle: {
            color: '#86DF6C',
          },
        },
      ],
    },
    {
      type: 'pie',
      radius: ['50%', '70%'],
      center: ['50%', '50%'],
      label: {
        formatter: '{d}% ',
        color: '#4E5969',
      },
      itemStyle: {
        borderColor:  '#fff',
        borderWidth: 1,
      },
      data: [
        {
          value: [148564],
          name: 'UGC原创',
          itemStyle: {
            color: '#249EFF',
          },
        },
        {
          value: [334271],
          name: '国外网站',
          itemStyle: {
            color: '#846BCE',
          },
        },
        {
          value: [445694],
          name: '转载文章',
          itemStyle: {
            color: '#21CCFF',
          },
        },
        {
          value: [445694],
          name: '行业报告',
          itemStyle: {
            color: '#0E42D2',
          },
        },
        {
          value: [445694],
          name: '其他',
          itemStyle: {
            color: '#86DF6C',
          },
        },
      ],
    },
    {
      type: 'pie',
      radius: ['50%', '70%'],
      center: ['88%', '50%'],
      label: {
        formatter: '{d}% ',
        color:  '#4E5969',
      },
      itemStyle: {
        borderColor:  '#fff',
        borderWidth: 1,
      },
      data: [
        {
          value: [148564],
          name: 'UGC原创',
          itemStyle: {
            color: '#249EFF',
          },
        },
        {
          value: [334271],
          name: '国外网站',
          itemStyle: {
            color: '#846BCE',
          },
        },
        {
          value: [445694],
          name: '转载文章',
          itemStyle: {
            color: '#21CCFF',
          },
        },
        {
          value: [445694],
          name: '行业报告',
          itemStyle: {
            color: '#0E42D2',
          },
        },
        {
          value: [445694],
          name: '其他',
          itemStyle: {
            color: '#86DF6C',
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