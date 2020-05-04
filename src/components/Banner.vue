<template>
   <div id="wrapper">
      <img src="http://funx.pro/resource/junk/17logo.svg" />
      <!-- login测试用，实际不跳转至login --->
      <a-button style="color:black" type="link" id="user" @click="">
         <a-icon type="user" />{{name}}
      </a-button>
   </div>
</template>

<script>
export default {
   name: "Banner",
   components: {},
   data() {
      return {
			name:"未登录"
		};
	},
	methods:{
		jump(){
			if(this.name == '未登录')
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
				//var msg = doc.data.msg
				if(code == 0){
					this.name = doc.data.data.username
				}else{
					this.name = '未登录'
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
