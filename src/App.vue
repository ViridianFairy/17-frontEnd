<template>
   <div id="main-app">
      <div id="top">
         <router-view name="top"></router-view>
      </div>
      <div id="main-wrapper">
         <div id="left">
            <router-view name="left"></router-view>
         </div>
         <div id="right">
            <router-view name="right"></router-view>
         </div>
      </div>
   </div>
</template>


<script>
export default {
   name: "App",
   components: {},
   data() {
      return {
         router: 0,
      };
   },
	created(){
		//this.$router.push('/disk')
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
   z-index: 999;
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
