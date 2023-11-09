import {defineStore} from 'pinia'
import request from '@/plugins/request'
import {asyncRouter} from '@/hook/helper';
import type {RouteLocation} from  "vue-router"
interface User {
    token: string,
}
interface UserStore{
    token:string,
    active:string,
    collapse:boolean,
    tabs:RouteLocation[]
    menu:any[]
}
export const useUserStore = defineStore('User', {
    state: ():UserStore => {
        return {
            token: '',
            active: '/dashboard/index',
            collapse:false,
            tabs: [],
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
            try {
                const data: any = await request.get('/login/userinfo');
                this.menu = data.auth;
                this.token = data.token;
                await asyncRouter();
            } catch ($e) {
                return Promise.reject($e);
            }

        }
    },
    persist: {
        paths: ['token']
    }
})




