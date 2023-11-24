import type {App} from "vue";
import {ElMessage} from "element-plus";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VxeTable from  "./VxeTable"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import {createPinia} from "pinia";
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
export default {
    install(app:App){
        app.use(VxeTable)
        app.use(ElementPlus)
        app.use(pinia)
    }
}