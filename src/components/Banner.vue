<template>
   <div id="wrapper">
      <img src="http://funx.pro/resource/junk/17logo.svg" >
      <section>用户名</section>
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
#wrapper{
   /* width: 300px; */
   display: flex;
}
#wrapper img:nth-child(1){
	width:40px;
	margin-left: 30px;
	/* margin-top: 0px; */
}
section {
   padding: 15px;
   margin-left: 1220px;
}
</style>
