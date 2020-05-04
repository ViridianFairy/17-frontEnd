<template>
   <div id="wrapper">
      <img src="http://funx.pro/resource/junk/17logo.svg" />
      <!-- login测试用，实际不跳转至login --->
      <a-button style="color:black" type="link" id="user" @click="" />
         <a-icon type="user" />{{!name?'未命名':name}}
      <!-- <img src="http://funx.pro/resource/junk/17logo.svg" > -->

      <div id="dropdown">
         <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
               软工实践 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
               <a-menu-item key="0" @click="showCreateModal">
                  创建项目

                  <a-modal v-model="createVisible" title="创建新项目" on-ok="handleOk">
                     <template slot="footer">
                     <a-button key="back" @click="createHandleCancel">
                        取消
                     </a-button>
                     <a-button key="submit" type="primary" :loading="createLoading" @click="createHandleOk">
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
      <a-button style="color:black" type="link" id="user" @click="jump">
            <a-modal v-model="infoVisible" title="个人信息" ok-text="确认" cancel-text="关闭" @ok="infoHandleOk">
               <p>Some contents...</p>
               <p>Some contents...</p>
               <p>Some contents...</p>
            </a-modal>
         <a-icon type="user" />{{name}}
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
	methods: {
		jump() {
			if(this.name == '未登录')
				this.$router.push('/login').catch(()=>{})
			else{
				//弹框
				//  name:"未登录",
         	// createLoading: false,
         	// createVisible: false,
         	// infoVisible: false,
            this.infoVisible = true;
			}
      },
      showCreateModal() {
         this.createVisible = true;
      },
      createHandleOk(e){
         this.createLoading = true;
         setTimeout(() => {
            this.createVisible = false;
            this.createLoading = false;
         }, 2000);
      },
      createHandleCancel(e) {
         this.createVisible = false;
      },
      infoHandleOk(e) {
         console.log(e);
         this.infoVisible = false;
      },
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
