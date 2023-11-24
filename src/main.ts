
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './permission'
import 'animate.css';
import Ninja from "@/plugins/ninja";

import '@dabu/vue3-amap/dist/style.css'
import { useAmap } from '@dabu/vue3-amap'
const { initAMapApiLoader } = useAmap()
initAMapApiLoader({
    key: '6105425b0788cebc29762f42f40305a8', // 高德地图 Key
    version: '2.0'
})
const app = createApp(App)
app.use(router)
app.use(Ninja);
app.mount('#app')
