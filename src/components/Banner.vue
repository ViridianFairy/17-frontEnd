<template>
   <div id="wrapper">
      <img src="http://funx.pro/resource/junk/17logo.svg" />

      <div id="dropdown1">
         <a-dropdown :trigger="['hover']" style="color:black">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()" :disabled="!login">
               项目：{{login?projectName:'无'}}
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
                     <a-input style="width: 300px" placeholder v-model="newName" />
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
                           @click="exchangeHandleOk(value)"
                        >切换</a-button>
                     </template>
                     请选择要切至的项目：
                     <a-radio-group v-model="value" @change="onGroupChange">
                        <a-radio :key="i.id" :value="i.id" v-for="i in changeProject">{{i.name}}</a-radio>
                     </a-radio-group>
                  </a-modal>
               </a-menu-item>

               <a-menu-divider />
               <a-menu-item key="-3" @click="showDeleteConfirm">删除项目</a-menu-item>
            </a-menu>
         </a-dropdown>
      </div>




      <div id="dropdown2">
         <a-dropdown :trigger="['hover']" style="color:black">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()" :disabled="!login">
               管理 <a-icon type="down" />
            </a>
            <a-menu slot="overlay" style="margin-top:7px;">
               <a-menu-item key="3" @click="showMemberModal">
                  查看项目成员
                  <a-modal v-model="memberVisible" title="项目成员信息" ok-text="确认" cancel-text="关闭" @ok="memberHandleOk">
                     <p style="padding-left:30px"><a-avatar :size="30" slot="avatar">U</a-avatar>A</p>
                     <p style="padding-left:30px"><a-avatar :size="30" slot="avatar">U</a-avatar>B</p>
                     <p style="padding-left:30px"><a-avatar :size="30" slot="avatar">U</a-avatar>C</p>
                  </a-modal>
               </a-menu-item>

               <a-menu-divider />
               <a-menu-item key="4" @click="showAddMemberModal">
                  添加/移除项目成员
                  <a-locale-provider :locale="zhCN">
                     <a-modal v-model="addMemberVisible" title="添加/移除项目成员" @ok="addMemberHandleOk">
                        <a-transfer
                           :data-source="mockData1"
                           show-search
                           :operations="['加入', '移除']"
                           :target-keys="targetKeys1"
                           :render="item => `${item.title}`"
                           @change="addMemberHandleChange"
                        >
                           <span slot="notFoundContent">
                           暂无成员
                           </span>
                        </a-transfer>
                     </a-modal>
                  </a-locale-provider>
               </a-menu-item>

               <a-menu-divider />
               <a-menu-item key="5" @click="showAddAdminModal">
                  添加/移除项目管理员
                  <a-locale-provider :locale="zhCN">
                     <a-modal v-model="addAdminVisible" title="添加/移除项目成员" @ok="addAdminHandleOk">
                        <a-transfer
                           :data-source="mockData2"
                           show-search
                           :operations="['加入', '移除']"
                           :target-keys="targetKeys2"
                           :render="item => `${item.title}`"
                           @change="addAdminHandleChange"
                        >
                           <span slot="notFoundContent">
                           暂无成员
                           </span>
                        </a-transfer>
                     </a-modal>
                  </a-locale-provider>
               </a-menu-item>
            </a-menu>
         </a-dropdown>
      </div>

      <a-dropdown :trigger="['hover']" style="color:black" id="user">
         <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            <a-icon type="user" style="margin-right:4px;" />
            {{!name?'未命名':name}}
         </a>
         <a-menu slot="overlay" style="margin-top:-10px;">
            <a-menu-item key="6" @click="showInfoModal" v-if="login">
               查看信息
               <a-modal
                  v-model="infoVisible"
                  title="个人信息"
                  ok-text="确认"
                  cancel-text="关闭"
                  @ok="infoHandleOk"
                  @cancel="infoHandleCancel"
               >
                  <p style="padding-left:10px">
                     头像：
                     <a-avatar :size="50" slot="avatar" :src="userInfo.photo"></a-avatar>
                     <a-upload
                        name="file"
                        :multiple="true"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        :headers="headers"
                        @change="photoHandleChange"
                        style="float:right"
                     >
                        <a-button style="width:100px;height:25px;margin-top:10px">上传头像</a-button>
                     </a-upload>
                     <!-- 
                     <a-button style="float:right;width:100px;height:25px;margin-top:10px" @click="updatePhoto">上传头像</a-button>
                     -->
                  </p>
                  
                  <p style="padding-left:10px">
                     用户名：
                     <showName v-if="changingName==0">{{name}}</showName>
                     <a-input v-if="changingName==1" style="width:385px" default-value="" />
                     <a-button v-if="changingName==0" style="float:right;width:100px;height:25px" @click="changeName">更改用户名</a-button>
                  </p>

                  <p style="padding-left:10px">
                     邮箱：
                     <showEmail>{{userInfo.email}}</showEmail>
                  </p>

                  <p style="padding-left:10px">
                     所在地：
                     <showAddress v-if="changingAddress==0">{{userInfo.location}}</showAddress>
                     <a-cascader v-if="changingAddress==1" style="width:385px" :options="addressOptions" placeholder="请选择地址" @change="onAddressChange" />
                     <a-button v-if="changingAddress==0" style="float:right;width:100px;height:25px" @click="changeAddress">更改地址</a-button>
                  </p>

                  <p style="padding-left:10px">
                     个人主页：
                     <showWebsite v-if="changingWebsite==0">{{userInfo.website}}</showWebsite>
                     <a-input v-if="changingWebsite==1" style="width:370px" addon-before="http://" addon-after=".com" default-value="" />
                     <a-button v-if="changingWebsite==0" style="float:right;width:100px;height:25px" @click="changeWebsite">更改网站</a-button>
                  </p>

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
import { Modal } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale-provider/zh_CN'
import china from '../js/china'
export default {
   name: "Banner",
   computed: {
      name() {
         return this.$store.state.banner.name;
      },
      login() {
         return this.$store.state.login;
      },
      projectName() {
         return this.$store.state.project.name;
      }
   },
   data() {
      return {
         //addressOptions,
         infoVisible: false,
         createVisible: false,
         createLoading: false,
         zhCN,
			curName:"",
         createLoading: false,
         exchangeVisible: false,
         exchangeLoading: false,
         value: 1,
         newName: "",
         changeProject: [],
         userInfo: { photo: "", email: "", website: "", location: "" },
         memberVisible: false,
         addMemberVisible: false,
         mockData1: [],
         targetKeys1: [],
         addAdminVisible: false,
         mockData2: [],
         targetKeys2: [],
         infoVisible: false,
         newName:"",
			changeProject:[],

         headers: {
            authorization: 'authorization-text',
         },
         changingName: 0,
         changingAddress: 0,
         changingWebsite: 0,
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
         this.$http.post(`/api/project`, { name: this.newName }).then(doc => {
            var code = doc.data.status;
            var msg = doc.data.msg;
            if (code != 0) {
               this.$alert(msg, "false");
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
            console.log(doc);
            var code = doc.data.status;
            var msg = doc.data.msg;
            this.changeProject = doc.data.data;
            if (code != 0) {
            } else {
            }
         });
      },
      exchangeHandleOk(id, name) {
         var store = window.localStorage;
         this.exchangeLoading = true;
         this.changeProject.forEach(i => {
            if (i.id == id) name = i.name;
         });
         //proj
         this.$store.commit("projectReload", { id, name });
         store.setItem(this.$cookies.get("session"), id);
         setTimeout(() => {
            this.exchangeVisible = false;
            this.exchangeLoading = false;
         }, 100);
      },
      exchangeHandleCancel(e) {
         this.exchangeVisible = false;
      },
      onGroupChange(e) {
         console.log("radio checked", e.target.value);
      },
 
		//删除项目部分
		
      showDeleteConfirm() {
			var self = this
         Modal.confirm({
            title: "确定要删除项目吗？",
            content: "",
            okText: "是",
            okType: "danger",
            cancelText: "否",
            onOk() {
               self.$http
         		.post(`/api/project/${self.$store.state.project.id}/task/delete`, {
						project_id:self.$store.state.project.id,
						id:self.id,
					})
         		.then(doc => {
         		   var code = doc.data.status;
         		   var msg = doc.data.msg;
						if (code == 0)
							self.$alert(msg,'true')
						else
							self.$alert(msg,'false')
						console.log(doc)
         		})
            },
            onCancel() {
               console.log("Cancel");
            }
         });
      },

      //显示项目成员信息部分
      showMemberModal(){
         this.memberVisible = true;
      },
      memberHandleOk(e) {
         console.log(e);
         this.memberVisible = false;
      },

      //添加/移除成员部分
      showAddMemberModal() {
        this.addMemberVisible = true;
      },
      addMemberHandleOk(e) {
        console.log(e);
        this.addMemberVisible = false;
      },
      getMock1() {
        const targetKeys1 = [];
        const mockData1 = [];
        for (let i = 0; i < 5; i++) {
          const data = {
            key: i.toString(),
            title: `联系人${i + 1}`,
            //description: `description of content${i + 1}`,
            chosen: 0,
          };
          if (data.chosen) {
            targetKeys1.push(data.key);
          }
          mockData1.push(data);
        }
        this.mockData1 = mockData1;
        this.targetKeys1 = targetKeys1;
      },
      addMemberHandleChange(targetKeys1, direction, moveKeys) {
        console.log(targetKeys1, direction, moveKeys);
        this.targetKeys1 = targetKeys1;
      },

      //添加/移除管理员部分
      showAddAdminModal() {
        this.addAdminVisible = true;
      },
      addAdminHandleOk(e) {
        console.log(e);
        this.addAdminVisible = false;
      },
      getMock2() {
        const targetKeys2 = [];
        const mockData2 = [];
        for (let i = 0; i < 5; i++) {
          const data = {
            key: i.toString(),
            title: `联系人${i + 1}`,
            //description: `description of content${i + 1}`,
            chosen: 0,
          };
          if (data.chosen) {
            targetKeys2.push(data.key);
          }
          mockData2.push(data);
        }
        this.mockData2 = mockData2;
        this.targetKeys2 = targetKeys2;
      },
      addAdminHandleChange(targetKeys2, direction, moveKeys) {
        console.log(targetKeys2, direction, moveKeys);
        this.targetKeys2 = targetKeys2;
      },

      //显示个人信息部分
      showInfoModal() {
         this.infoVisible = true;
         this.$http.get(`/api/user/info`).then(doc => {
            var code = doc.data.status;
            var msg = doc.data.msg;
            if (code == 0) {
               this.userInfo = doc.data.data;
            } else {
            }
         });
      },
      infoHandleOk(e) {
         console.log(e);
         this.infoVisible = false;

         this.changingName = 0;
         this.changingAddress = 0;
         this.changingWebsite = 0;
      },
      infoHandleCancel() {
         this.infoVisible = false;

         this.changingName = 0;
         this.changingAddress = 0;
         this.changingWebsite = 0;
      },

      //修改个人信息部分
      photoHandleChange(info) {
         if (info.file.status !== 'uploading') {
         console.log(info.file, info.fileList);
         }
         if (info.file.status === 'done') {
         this.$message.success(`${info.file.name} file uploaded successfully`);
         } else if (info.file.status === 'error') {
         this.$message.error(`${info.file.name} file upload failed.`);
         }
      },
      changeName() {
         this.changingName = 1;
      },
      changeAddress() {
         this.changingAddress = 1;
      },
      onAddressChange(value) {
         console.log(value);
      },
      changeWebsite() {
         this.changingWebsite = 1;
      },
      showOutLoginConfirm() {
         Modal.confirm({
            title: "确定要退出登录吗？",
            content: "",
            okText: "是",
            okType: "danger",
            cancelText: "否",
            onOk() {
					
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
            this.update();
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
               this.$http.get(`/api/user/project`).then(doc => {
                  if (code == 0) {
							this.changeProject = doc.data.data;
							var id = window.localStorage[this.$cookies.get("session")];
							this.exchangeHandleOk(id)
                  }
               });
               
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
		this.update();
		this.getMock1();
      this.getMock2();
	},
	watch: {
    	'$store.state.userUpdate': function () {
			this.update();
   	}
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
   color: #aaa;
}
#dropdown1 {
   float: left;
   margin-left: 75px;
   padding: 15px;
}
#dropdown2 {
   float: left;
   padding: 15px;
}
#user {
   padding: 15px;
   float: right;
}
</style>
