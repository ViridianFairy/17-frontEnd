<template>
   <div id="wrapper">
      <img src="http://funx.pro/resource/junk/17logo.svg" />
      <!-- login测试用，实际不跳转至login --->
      <a-button style="color:black" type="link" id="user" @click="">
         <a-icon type="user" />{{!name?'未命名':name}}
      </a-button>
   </div>
</template>

<script>
export default {
   name: "Banner",
	computed:{
		name(){
         return this.$store.state.banner.name
		},
	},
   data() {
      return {
			
		};
	},
	methods:{
		jump(){
			if(!this.name)
				this.$router.push('/login').catch(()=>{})
			else{
				//弹框
			}
		}
	},
   mounted() {
      this.$http
         .get(`/api/user/info`)
         .then(doc => {
				var code = doc.data.status
				if(code == 0){
					this.$store.commit('bannerReload',{
						name:doc.data.data.username,
						avatar:doc.data.data.avatar
					})
					//console.log('已分发'+ doc.data.data.username)
				}else{
					this.$store.commit('bannerReload',{
						name:'未登录',
					})
				}
         });
   }
};
</script>

<style scoped>
#wrapper img:nth-child(1) {
   width: 46px;
   float: left;
   margin-left: calc(85px - 23px);
}
#wrapper {
   /* display: flex; */
}
#user {
   padding: 15px;
   float: right;
}
</style>
