<template>
   <div id="wrapper">
      <img src="http://funx.pro/resource/junk/17logo.svg" >

      <div id="dropdown">
         <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
               软工实践 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
               <a-menu-item key="0" @click="showModal">
                  创建项目

                  <a-modal v-model="visible" title="创建新项目" on-ok="handleOk">
                     <template slot="footer">
                     <a-button key="back" @click="handleCancel">
                        取消
                     </a-button>
                     <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
                        创建
                     </a-button>
                     </template>
                     请输入项目名：<a-input style="width: 300px" placeholder="" />
                  </a-modal>

               </a-menu-item>
               <a-menu-divider />
               <a-menu-item key="1">
                  删除项目
               </a-menu-item>
            </a-menu>
         </a-dropdown>
      </div>

      <!-- login测试用 --->
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
         name:"未登录",
         loading: false,
         visible: false,
		};
	},
	methods:{
		jump(){
			if(this.name == '未登录')
				this.$router.push('/login').catch(()=>{})
			else{
				//弹框
            
			}
      },
      showModal() {
         this.visible = true;
      },
      handleOk(e){
         this.loading = true;
         setTimeout(() => {
            this.visible = false;
            this.loading = false;
         }, 3000);
      },
      handleCancel(e) {
         this.visible = false;
      },
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
   },
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
#dropdown {
   float: left;
   margin-left: 75px;
   padding:15px;
}
#user {
   padding: 15px;
   float: right;
}
</style>
