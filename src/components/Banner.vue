<template>
   <div id="wrapper">
      <img src="http://funx.pro/resource/junk/17logo.svg" >
      <section id="user"><a-icon type="user" />用户名</section>
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
}
#wrapper{
   /* display: flex; */
}
#user{
   padding: 15px;
   float:right;
}
</style>
