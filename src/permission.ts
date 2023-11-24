import router from "./router";
import { useUserStore } from '@/stores/user';
import { column} from "@/hook/helper";
import {asyncView} from "@/stores/user";

const white = ['/login']

const hasNecessaryRoute =(to:any)=>{
  const module = asyncView();
   return  !router.hasRoute(to.name) && module.hasOwnProperty(to.path) ;
}
router.beforeEach( async (to) => {
  const userStore = useUserStore();
  if(!white.includes(to.path)){
    if(!userStore.token)return {path:'/login',query:{original:to.fullPath}}
    if (hasNecessaryRoute(to)) {
        await  userStore.getUserInfo()
        return {path:to.fullPath,replace:true}
    }
  }
})
router.afterEach((to)=>{
  const userStore = useUserStore();
  const path = column(userStore.tabs,'path');
  if(!path.includes(to.path)){
    userStore.tabs.push(to);
  }
})