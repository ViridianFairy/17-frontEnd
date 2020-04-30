import Vue from "vue";
import VueRouter from "vue-router";
import Options from '../components/Options'
import Tasks from '../components/Tasks'
import Disk from '../components/Disk'
import Banner from '../components/Banner'
import TaskPanel from '../components/TaskPanel'
import TaskDetails from '../components/TaskDetails'
import Schedule from '../components/Schedule'
import ScheduleAdd from '../components/ScheduleAdd'

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
      path: "/schedule",
      components: {
			top: Banner,
         left: Options,
         right: Schedule,
      }
   },
   {
      path: "/scheduleAdd",
      components: {
			top: Banner,
         left: Options,
         right: ScheduleAdd,
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
      path: "/taskDetails",
      components: {
			top: Banner,
         left: Options,
         right: TaskDetails,
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
