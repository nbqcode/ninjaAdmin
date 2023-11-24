<template>

  <el-tooltip
      placement="bottom-start"
      effect="light"
      popper-class="map"
      trigger="click"
  >
    <el-button>{{ amapOptions.center }}</el-button>
    <template #content>
      <ElAmap @hotspotclick="hotspotclick" @complete="complete" style="height: 300px;width: 800px"
              ref="AmapRef"
              v-model:center="amapOptions.center"
              v-model:zoom="amapOptions.zoom"
      >
        <PlaceSearch/>
        <ElMarker
            :position="amapOptions.center"
            :label="{
            content: 'Hello, Vue3-AMap!',
            offset: [0, 0],
            direction: 'bottom',
          }"
        />
      </ElAmap>
    </template>
  </el-tooltip>


</template>
<script setup lang="ts">
import PlaceSearch from "@/components/PlaceSearch.vue";
import {onMounted, reactive, ref} from "vue";
import { ElAmap, ElMarker } from "@dabu/vue3-amap";
import type { ElAmapProps, ElAmapExpose } from "@dabu/vue3-amap";

const AmapRef = ref<ElAmapExpose | null>(null);
// 组件参数
const amapOptions = reactive<ElAmapProps>({
  zoom: 16,
  center: [116.397428, 39.90923],
});

interface MapsEvent{
  id:string,
  name:string,
  originEvent:{
    Adt:string,
    [props:string]:any
  },
  lnglat:{
    KL:number,
    className:string,
    kT:number,
    lat:number,
    lng:number,
    pos:[number,number]
  }
}





const hotspotclick =(event:MapsEvent)=>{
   console.log(event);
   const {lng,lat} =  event.lnglat
   const MapInstance = AmapRef.value?.getInstance();
  MapInstance?.setCenter([lng,lat]);
}
</script>
<style  lang="scss">
.map{
  padding: 0 !important;
}
</style>