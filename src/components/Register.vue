<template>
   <div class="logincontent">
      <img src="http://funx.pro/resource/junk/17logo.svg" >
      <br /><br />
      <a-input placeholder="邮箱" v-model="userName" ref="userNameInput" />
      <br /><br />
      <a-input-password placeholder="6-16位密码，区分大小写" />
      <br /><br />
      <a-input-password placeholder="确认密码" />
      <br /><br />
      <a-input placeholder="11位手机号码" v-model="teleNumber" ref="teleNumberInput" />
      <br /><br />
      <a-input placeholder="输入验证码" v-model="verificationCode" ref="verificationCodeInput" style="width: 65%;float: left"/>
      <a-button style="float: right">获取验证码</a-button>
      <br /><br /><br />
      <a-button type="primary" style="width: 50%;float: left">注册</a-button>
      <a-button type="link" style="float: right;float: right">使用现有账号登录</a-button>
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
    margin-top: 5%;
    overflow: hidden;
    text-align: center;
}

.logincontent img:nth-child(1){
    width: 15%;
    margin: auto;
}
</style>

