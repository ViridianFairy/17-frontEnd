import Vue from "vue";
import VueRouter from "vue-router";
import Options from '../components/Options'
import Tasks from '../components/Tasks'
import Disk from '../components/Disk'
import Banner from '../components/Banner'
import TaskPanel from '../components/TaskPanel'
import Details from '../components/Details'

import Test from '../components/Test'
Vue.use(VueRouter);
const routes = [
   /*{
      path:'/d',redirect:'/'
   },*/
   {
      path: "/",
      components: {
			top: Banner,
         left: Options,
         right: Tasks,
      }
	}, //一样哒！
	{
      path: "/disk",
      components: {
			top: Banner,
         left: Options,
         right: Disk,
      }
   },
   {
      path: "/taskPanel",
      components: {
			top: Banner,
         left: Options,
         right: TaskPanel,
      }
   },
	{
      path: "/test",
      components: {
			top: Banner,
         left: Options,
         right: Test,
      }
   },
   {
      path: "/details",
      components: {
			top: Banner,
         left: Options,
         right: Details,
      }
   },
];
const router = new VueRouter({
   mode: "history",
   routes
});
router.beforeEach((to, from, next) => {
   document.body.scrollTop = 0
   document.documentElement.scrollTop = 0
   window.pageYOffset = 0
   if (to.matched.length === 0) {  //如果未匹配到路由
      //from.path ? next({ path: from.path }) : 
      next('/404');   //如果上级也未匹配到路由则跳转主页面，如果上级能匹配到则转上级路由
   } else {
      next();    //如果匹配到正确跳转
   }
});
export default router;
