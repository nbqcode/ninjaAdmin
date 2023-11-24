import type {Directive, Ref} from "vue"
import {onMounted, getCurrentInstance, reactive, nextTick} from "vue";
import {useRouter} from "vue-router"
import router from "@/router";
import {ElMessage} from "element-plus";

export const auth = (binding: string[]) => {
    const {auth}: any = router.currentRoute.value.meta;
    if (!auth) return false;
    return binding.every((v: string) => auth.includes(v));
}


export const vAuth: Directive<HTMLElement, string[]> = (el: HTMLElement, binding, vnode, prevVNode) => {

    const {auth}: any = router.currentRoute.value.meta;
    if (!auth) {
        el.style.display = 'none';
        return false;
    }
    if (Array.isArray(binding.value) && binding.value.length) {
        const checker = binding.value.every((v: string) => auth.includes(v));
        if (!checker) {
            el.style.display = 'none'
        }
        return;
    }

    if (!auth.includes(binding.arg)) {
        el.style.display = 'none'
    }
}


export const useAuth = () => {
    onMounted(() => {
        const router = useRouter();
        console.log(router.currentRoute)
    })
}

export const column = (arr: Array<{ [props: string]: any }>, key: string) => {
    return arr.map(item => item[key])
}

export interface GlobEager {
    [props: string]: {
        default: {
            props: object
        }
    }
}

export const URLDirname = (path: string) => {
    return path.substr(0, path.lastIndexOf("/") - 1);
}

export const asyncResolveComponent = () => {
    const component: GlobEager = import.meta.glob('@/components/design/components/**/*.vue', {eager: true});
    const module: any[] = [];
    for (const [, components] of Object.entries(component)) {
        const prop: any = {}
        let props: any = components.default?.props ?? {};
        for (const [key, value] of Object.entries(props)) {
            prop[key] = (value as { default: string })?.default
        }
        module.push({
            component: components.default,
            prop
        })
    }
    return module;
};

export const aysncResolveProps = () => {
    const component: GlobEager = import.meta.glob('@/components/design/props/**/*.vue', {eager: true});
    const module: any[] = [];
    for (const [key, value] of Object.entries(component)) {
        module.push(value.default);
    }
    return module;
}



export class HandlerMessage extends Error {
    constructor(msg: string) {
        super();
        ElMessage.error(msg)
    }
}


export function bindToolbar() {
    onMounted(() => {
        const instance = getCurrentInstance();
        const {tableRef,toolbarRef} = instance?.refs
        nextTick(() => {
            tableRef.connect(toolbarRef)
        })
    })
}











