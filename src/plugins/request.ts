import axios, { AxiosError } from "axios";
import type { AxiosResponse, InternalAxiosRequestConfig, AxiosInstance } from "axios";
import { ElMessage } from "element-plus";
import router from "@/router";
import { useUserStore } from "@/stores/user";
import {HandlerMessage} from "@/hook/helper";

// 创建一个自定义的Axios对象
const request: AxiosInstance = axios.create({
    baseURL: '/admin',
    timeout: 3000,
    withCredentials: true
});
request.interceptors.request.use((req: InternalAxiosRequestConfig) => {
    // 请求拦截处理
    // console.log('这里是请求拦截器，我拦截了请求', req);
    const userStore = useUserStore();
    const token: string | null = userStore.token;
    if (token) {
        req.headers.token = token;
    }
    return req;
}, err => {
    console.log('在发送请求时发生错误，错误为', err);
    //这里不能直接放回err,需要按照官方说明返回一个Promise
    return Promise.reject(err);
})
request.interceptors.response.use((res: AxiosResponse) => {
    const { data:{code,data} } = res;
    if (code) {
        if ([4000, 4001].includes(code)) {
            router.replace({ path: '/login' })
        }
    }
    if(code!==200){
        throw  new HandlerMessage(data);
        return Promise.reject(data)
    }
    return data;
}, (error: AxiosError) => {
    //按照实际的响应包进行解析，通过关键字匹配的方式
     ElMessage.error(error.message);
    router.replace({ path: '/login' })
     Promise.reject(error.message);
})

export default request;



