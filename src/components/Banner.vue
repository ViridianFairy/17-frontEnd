<template>
   <div id="wrapper">
      <img src="http://funx.pro/resource/junk/17logo.svg" />

      <div id="dropdown">
         <a-dropdown :trigger="['hover']" style="color:black">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()" :disabled="!login">
               项目：{{login?curName:'无'}}
               <a-icon type="down" />
            </a>
            <a-menu slot="overlay" style="margin-top:7px;">
               <a-menu-item key="-1" @click="showCreateModal">
                  创建项目
                  <a-modal v-model="createVisible" title="创建新项目" on-ok="handleOk">
                     <template slot="footer">
                        <a-button key="back" @click="createHandleCancel">取消</a-button>
                        <a-button
                           key="submit"
                           type="primary"
                           :loading="createLoading"
                           @click="createHandleOk"
                        >创建</a-button>
                     </template>
                     请输入项目名：
                     <a-input style="width: 300px" placeholder v-model="newName"/>
                  </a-modal>
               </a-menu-item>

               <a-menu-divider />
               <a-menu-item key="-2" @click="showExchangeModal">
                  切换项目
                  <a-modal v-model="exchangeVisible" title="切换项目" on-ok="handleOk">
                     <template slot="footer">
                        <a-button key="back" @click="exchangeHandleCancel">取消</a-button>
                        <a-button
                           key="submit"
                           type="primary"
                           :loading="exchangeLoading"
                           @click="exchangeHandleOk"
                        >切换</a-button>
                     </template>
                     请选择要切至的项目：
                     <a-radio-group v-model="value" @change="onChange">
                        <a-radio :key="i.id" :value="i.id" v-for="i in changeProject">{{i.name}}</a-radio>
                     </a-radio-group>
                  </a-modal>
               </a-menu-item>

               <a-menu-divider />
               <a-menu-item key="-3" @click="showDeleteConfirm">删除项目</a-menu-item>
            </a-menu>
         </a-dropdown>
      </div>

      <a-dropdown :trigger="['hover']" style="color:black" id="user">
         <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            <a-icon type="user" style="margin-right:4px;" />
            {{!name?'未命名':name}}
         </a>
         <a-menu slot="overlay" style="margin-top:-10px;">
            <a-menu-item key="0" @click="showInfoModal" v-if="login">
               查看信息
               <a-modal
                  v-model="infoVisible"
                  title="个人信息"
                  ok-text="确认"
                  cancel-text="关闭"
                  @ok="infoHandleOk"
               >
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
               </a-modal>
            </a-menu-item>
            <a-menu-divider v-if="login" />
            <a-menu-item key="1" style="color:red" @click="toExit" v-if="login">退出登录</a-menu-item>
            <a-menu-item key="3" style @click="toLogin" v-if="!login">登录</a-menu-item>
            <a-menu-item key="4" style @click="toRegister" v-if="!login">注册</a-menu-item>
         </a-menu>
      </a-dropdown>
   </div>
</template>

<script>
import { Modal } from "ant-design-vue";
export default {
   name: "Banner",
   computed: {
      name() {
         return this.$store.state.banner.name;
      },
      login() {
         return this.$store.state.login;
      }
   },
   data() {
      return {
         infoVisible: false,
         createVisible: false,
         createLoading: false,
         curName: "",
         createLoading: false,
         exchangeVisible: false,
         exchangeLoading: false,
			value: 1,
			newName:"",
			changeProject:[],
      };
   },
   methods: {
      //这个jump似乎就用不到了
      jump() {
         if (this.name == "未登录") this.$router.push("/login").catch(() => {});
         else {
            //弹框
            //  name:"未登录",
            // createLoading: false,
            // createVisible: false,
            // infoVisible: false,
            this.infoVisible = true;
         }
      },

      //创建项目部分
      showCreateModal() {
         this.createVisible = true;
      },
      createHandleOk(e) {
			this.createLoading = true;
			this.$http.post(`/api/project`,{name:this.newName}).then(doc => {
            var code = doc.data.status;
				var msg = doc.data.msg;
            if (code != 0) {
					this.$alert(msg,'false')
					this.createLoading = false;
            } else {
               this.createVisible = false;
            	this.createLoading = false;
				}
				
         });
      },
      createHandleCancel(e) {
         this.createVisible = false;
      },

      //切换项目部分
      showExchangeModal() {
			this.exchangeVisible = true;
			this.$http.get(`/api/user/project`).then(doc => {
				console.log(doc)
            var code = doc.data.status;
				var msg = doc.data.msg;
				this.changeProject = doc.data.data
            if (code != 0) {
               
            } else {
               
            }
         });
			
      },
      exchangeHandleOk(e) {
         this.exchangeLoading = true;
         setTimeout(() => {
            this.exchangeVisible = false;
            this.exchangeLoading = false;
         }, 2000);
      },
      exchangeHandleCancel(e) {
         this.exchangeVisible = false;
      },
      onChange(e) {
         console.log("radio checked", e.target.value);
      },

      //删除项目部分
      showDeleteConfirm() {
         Modal.confirm({
            title: "确定要删除项目吗？",
            content: "",
            okText: "是",
            okType: "danger",
            cancelText: "否",
            onOk() {
               console.log("OK");
            },
            onCancel() {
               console.log("Cancel");
            }
         });
      },

      //显示个人信息部分
      showInfoModal() {
         this.infoVisible = true;
      },
      infoHandleOk(e) {
         console.log(e);
         this.infoVisible = false;
      },

      //退出登录后返回登录界面
      showOutLoginConfirm() {
         Modal.confirm({
            title: "确定要退出登录吗？",
            content: "",
            okText: "是",
            okType: "danger",
            cancelText: "否",
            onOk() {
               console.log("OK");
            },
            onCancel() {
               console.log("Cancel");
            }
         });
      },
      toLogin() {
         this.$router.push("/login").catch(() => {});
      },
      toRegister() {
         this.$router.push("/register").catch(() => {});
      },
      toExit() {
         this.$http.get(`/api/user/logout`).then(doc => {
            var code = doc.data.status;
				var msg = doc.data.msg;
				this.update()
            if (code == 0) {
               this.$alert(msg, "true");
            } else {
               this.$alert(msg, "false");
            }
         });
      },
      update() {
         this.$http.get(`/api/user/info`).then(doc => {
            var code = doc.data.status;
            if (code == 0) {
               this.$store.commit("bannerReload", {
                  name: doc.data.data.username,
                  avatar: doc.data.data.avatar
               });
               this.$store.commit("loginReload", true);
               //console.log('已分发'+ doc.data.data.username)
            } else {
               this.$store.commit("bannerReload", {
                  name: "未登录"
               });
               this.$store.commit("loginReload", false);
            }
         });
      }
   },
   mounted() {
		this.update()
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
   color: #aaa;
}
#dropdown {
   float: left;
   margin-left: 75px;
   padding: 15px;
}
#user {
   padding: 15px;
   float: right;
}
</style>
