<template>
   <div class="logincontent">
      <img src="http://funx.pro/resource/junk/17logo.svg" >
      <br /><br />
      <a-input placeholder="请输入手机号码或邮箱" v-model="userName" ref="userNameInput">
         <a-icon slot="prefix" type="user" />
      </a-input>
      <br /><br />
      <a-input placeholder="请输入密码" v-model="password" ref="passwordInput">
         <a-icon slot="prefix" type="lock" />
      </a-input>
      <br /><br />
      <a-checkbox @change="autoLogin" style="float: left">自动登录</a-checkbox>
      <a-button type="link" style="float: right">忘记密码</a-button>
      <a-button type="link" style="float: right">注册账户</a-button>
      <br /><br />
      <a-button type="primary" block>登录</a-button>
   </div>
</template>

<script>
export default {
   name: "Login",
   components: {},
   data() {
      return {
         userName: '',
      };
   },
   methods: {
      emitEmpty() {
         this.$refs.userNameInput.focus();
         this.userName = '';
      },
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
}

.logincontent img:nth-child(1){
    width: 15%;
    margin: auto;
}
</style>