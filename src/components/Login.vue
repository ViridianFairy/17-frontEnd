<template>
   <div class="logincontent">
      <img src="http://funx.pro/resource/junk/17logo.svg" >
      <br /><br />
      <a-input placeholder="请输入手机号码或邮箱" v-model="userName" ref="userNameInput">
         <a-icon slot="prefix" type="user" />
      </a-input>
      <br /><br />
      <a-input-password  v-model="password" placeholder="请输入密码" />
      <br /><br />
      <a-checkbox v-model="autoLogin" style="float: left">自动登录</a-checkbox>
      <a-button type="link" style="float: right">忘记密码</a-button>
      <a-button type="link" @click="toRegister" style="float: right">注册账户</a-button>
      <br /><br />
      <a-button type="primary" @click="enter" block>登录</a-button>
   </div>
</template>

<script>
export default {
   name: "Login",
   components: {},
   data() {
      return {
			userName: '',
			autoLogin:false,
			password:'',
      };
	},
	mounted(){
		console.log(this.$route.query)
		if(this.$route.query.account)
			this.userName = this.$route.query.account
		if(this.$route.query.password)
			this.password = this.$route.query.password
	},
   methods: {
		toRegister(){
			this.$router.push('/register').catch(()=>{})
		},
      emitEmpty() {
         this.$refs.userNameInput.focus();
         this.userName = '';
		},
		enter(){
			var account_type = 'email'
			var account = this.userName
			var password = this.password
			this.$http.post(`/api/user/login`,{
				account_type,account,password
			}).then(doc=>{

				var code = doc.data.status
				var msg = doc.data.msg
				if(code==0){
					this.$alert(msg,'true')
					this.$router.push('/taskPanel').catch(()=>{})
					
				}else{
					if(typeof msg == 'object')
						msg = getFirstMsg(msg)
					this.$alert(msg,'false')
				}
				console.log(doc)
			})
			function getFirstMsg(obj){
				for(var i in obj){
					return i+' '+obj[i]
				}
			}
		}
   },
};
</script>



<style scoped>
.logincontent{
    width: 30%;
    height: 100%;
    margin: auto;
    margin-top: 8%;
    overflow: hidden;
    text-align: center;
	 min-width: 400px;
}

.logincontent img:nth-child(1){
    width: 15%;
    margin: auto;
}
</style>