import router from "./router";
import { useUserStore } from '@/stores/user';
import {column} from "@/hook/helper";

let  asyncRouterStatus  = false;
const white = ['/login']
router.beforeEach( async (to) => {
  const userStore = useUserStore();
  if(userStore.token ){
        if(!asyncRouterStatus && userStore.token){
          try {
            await userStore.getUserInfo();
            asyncRouterStatus=true;
            return {path:to.fullPath,replace:true}
          }catch (e) {
            console.log(e);
            asyncRouterStatus=true;
            return {path:'/login'}
          }
        }
  }
  const path = column(userStore.tabs,'path');
  if(!path.includes(to.path)){
    userStore.tabs.push(to);
  }
  if(!white.includes(to.path) && !userStore.token){
    return {path:'/login',query:{original:to.fullPath}}
  }

})