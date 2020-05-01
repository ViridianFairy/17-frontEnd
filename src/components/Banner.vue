<template>
   <div id="wrapper">
      <img src="http://funx.pro/resource/junk/17logo.svg" >
      <!-- login测试用，实际不跳转至login --->
      <a-button type="link" id="user" @click="$router.push('/login')"><a-icon type="user" />用户名</a-button>
   </div>
</template>

<script>
export default {
   name: "Banner",
   components: {},
   data() {
      return {};
   }
};
</script>

<style scoped>
#wrapper img:nth-child(1){
	width:46px;
   float: left;
	margin-left:calc(85px - 23px);
}
#wrapper{
   /* display: flex; */
}
#user{
   padding: 15px;
   float:right;
}
</style>
