/// <reference types="vite/client" />
declare module '*.vue' {
    import { ComponentOptions } from 'vue'
    const componentOptions: ComponentOptions
    export default componentOptions
}

declare module  'screenfull'
declare module  'html2object'

declare var _AMapSecurityConfig:{
    securityJsCode:string
}
