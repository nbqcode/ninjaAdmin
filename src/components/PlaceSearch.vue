<script setup lang="ts">
import { useParent, ElMarker } from "@dabu/vue3-amap";
const { parent } = useParent();
const MAPInstance = parent?.getInstance();
let search: AMap.PlaceSearch = null;
MAPInstance.plugin(["AMap.PlaceSearch"], () => {
    search = new AMap.PlaceSearch({});
});

</script>

<template>

</template>

<style scoped lang="scss">

</style>