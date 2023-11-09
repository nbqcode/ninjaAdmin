import XEUtils, {filter} from "xe-utils"
import { useUserStore } from "@/stores/user";
import  type  { Directive,Ref} from "vue"
import {nextTick, onMounted, ref,getCurrentInstance} from "vue";
import {useRouter} from "vue-router"
import router from "@/router";
export const asyncRouter = async ()=>{
    const userStore = useUserStore();
    const auth = XEUtils.toTreeArray(userStore.menu);
    const page = import.meta.glob('@/views/pages/**/*.vue');
 
    const module:any = {};
    for (let [keys,value] of Object.entries(page)) {
      keys =   keys.replace(/\/src\/views\/pages|\.vue/ig,'')
      module[keys] = value;
    }
    for (let  {route_path,meta} of auth) {
        if(module[route_path]){
            router.addRoute('home',{
                name:XEUtils.camelCase((route_path as string).replace(/\//g,'-')),
                path:route_path,
                meta:meta ??  [],
                component:module[route_path]
            })
        }
        
    }
    return Promise.resolve("完成")
    
}
export const auth  = (binding:string[])=>{
    const {auth}:any=router.currentRoute.value.meta;
    if(!auth) return false;
    return   binding.every((v:string) =>auth.includes(v));
}


export const  vAuth:Directive<HTMLElement,string[]>=(el:HTMLElement, binding, vnode, prevVNode)=>{
     const {auth}:any=router.currentRoute.value.meta;
    if(!auth) {
        el.style.display ='none';
        return false;
    }
    if(Array.isArray(binding.value) && binding.value.length){
        const  checker =binding.value.every((v:string) =>auth.includes(v));
        if(!checker){
            el.style.display ='none'
        }
        return;
    }

    if(!auth.includes(binding.arg)){
        el.style.display = 'none'
    }
}


export const useAuth = ()=>{
    onMounted(()=>{
        const router = useRouter();
        console.log(router.currentRoute)
    })
}

export const column  = (arr:Array<{[props:string]:any}>,key:string)=>{
    return arr.map(item=>item[key])
}
