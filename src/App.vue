<template>
   <div id="main-app">
      <div id="top" class="top" v-if="isTopShow">
         <router-view name="top"></router-view>
      </div>
      <div id="main-wrapper">
         <div id="left" class="left" v-if="isLeftShow">
            <router-view name="left"></router-view>
         </div>
         <div id="right">
            <router-view name="right"></router-view>
         </div>
      </div>
   </div>
</template>


<script>
import top from './components/Banner'
import left from './components/Options'

export default {
   name: "App",
   components: { top, left },
   data() {
      return {
         isShow: true,
         router: 0,
      };
   },
   mounted() {
      this.TopAndLeftHide()
   },
   watch: {
      '$route.path'(to,from){
         this.TopAndLeftHide()
      }
   },
	created(){
      //console.log(this.$store.state.banner.name)
		var account= 'pixiaojiang@gov.cn'
		var password = '123456'
      this.$router.push({ path: '/login', query: {account,password} }).catch(()=>{})
      console.log(this.$route.path)
   },
   methods: {
      TopAndLeftHide(){
         if (this.$route.path === '/login' || this.$route.path === '/register') {
            this.isTopShow = false
            this.isLeftShow = false
         }
         else if (this.$route.path === '/home') {
            this.isTopShow = true
            this.isLeftShow = false
         } 
         else {
            this.isTopShow = true
            this.isLeftShow = true
         }
      }
   },
};
</script>



<style>
html{
	font-size: 11px;
   height: 100%;
}
body{
	height: 100%;
}
#main-wrapper {
   display: flex;
}
#top {
   width: 100%;
   height: 50px;
   background-color: rgb(250, 248, 248);
   position: fixed;
   z-index: 10;
}
#left {
   width: 170px;
   height: calc(100vh - 50px);
   background-color: #001529;
   position: fixed;
   margin-top: 50px;
}
#right {
   width: calc(100% - 170px);
   margin-left: 170px;
   margin-top: 50px;
}
</style>
