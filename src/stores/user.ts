import {defineStore} from 'pinia'
import request from '@/plugins/request'
import type {RouteLocation} from  "vue-router"
import XEUtils from "xe-utils";
import router from "@/router";
interface User {
    token: string,
}
interface UserStore{
    token:string,
    active:string,
    collapse:boolean,
    tabs:RouteLocation[]
    menu:any[],
    user:object
}

export  const  asyncView =  ()=>{
    const page =   import.meta.glob('@/views/**/*.vue');
    const module: any = {};
    for (let [keys, value] of Object.entries(page)) {
        keys = keys.replace(/\/src\/views|\.vue/ig, '').replace('\/src\/views', '')
        module[keys] = value;
    }
    return module;
}
const asyncRouter =  () => {
    const userStore = useUserStore();
    const auth = XEUtils.toTreeArray(userStore.menu);
    const module = asyncView();
    for (let {route_path, meta} of auth) {
        if (module[route_path]) {
            const routerItem = {
                name: XEUtils.camelCase((route_path as string).replace(/\//g, '-')),
                path: route_path,
                meta: meta ?? [],
                component: module[route_path]
            };
            router.addRoute('home', routerItem)
        }
    }

}
export const useUserStore = defineStore('User', {
    state: ():UserStore => {
        return {
            token: '',
            active: '/dashboard/index',
            collapse:false,
            tabs: [],
            user: {},
            menu: []
        }
    },



    
    actions: {
        /**
         * 密码登录
         * @param account
         * @param password
         * @constructor
         */
        async Password(account: string, password: string): Promise<User> {
            try {
                const data: User = await request.post('/login/password', {account, password})
                this.token = data.token;
                return Promise.resolve(data);
            } catch ($e) {
                return Promise.reject($e)
            }

        },
        /**
         * 获取用户信息
         */
        async getUserInfo() {
            const data: any = await request.get('/login/userinfo');
            this.menu = data.auth;
            this.token = data.token;
            this.user = data;
            asyncRouter()
        },
        async Logout(){
            await request.post('/login/logout')
            localStorage.clear();
            await router.replace('/login');
        }
    },
    persist: {
        paths: ['token','menu','user']
    }
})




