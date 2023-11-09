/// <reference types="vite/client" />
import 'vue-router'
declare module  'screenfull'

declare module 'vue-router' {
    interface RouteMeta {
        // 是可选的
        title?: string
        // 每个路由都必须声明
        auth?:string[]
    }
}