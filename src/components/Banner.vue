<template>
   <div id="wrapper">
      <img src="http://funx.pro/resource/junk/17logo.svg" />

      <div id="dropdown1">
         <a-dropdown :trigger="['hover']" style="color:black">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()" :disabled="!login">
               项目：{{login?curName:'无'}} <a-icon type="down" />
            </a>
            <a-menu slot="overlay" style="margin-top:7px;">
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
               <a-menu-item key="1" @click="showExchangeModal">
                  切换项目
                  <a-modal v-model="exchangeVisible" title="切换项目" on-ok="handleOk">
                     <template slot="footer">
                     <a-button key="back" @click="exchangeHandleCancel">
                        取消
                     </a-button>
                     <a-button key="submit" type="primary" :loading="exchangeLoading" @click="exchangeHandleOk">
                        切换
                     </a-button>
                     </template>
                     请选择要切至的项目：
                     <a-radio-group v-model="value" @change="onChange">
                        <a-radio :value="1">
                        A
                        </a-radio>
                        <a-radio :value="2">
                        B
                        </a-radio>
                        <a-radio :value="3">
                        C
                        </a-radio>
                        <a-radio :value="4">
                        D
                        </a-radio>
                     </a-radio-group>
                  </a-modal>
               </a-menu-item>

               <a-menu-divider />
               <a-menu-item key="2" @click="showDeleteConfirm">
                  删除项目
               </a-menu-item>
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
            <a-icon type="user" style="margin-right:4px;"/>{{!name?'未命名':name}}
         </a>
         <a-menu slot="overlay" style="margin-top:-10px;">
            <a-menu-item key="6" @click="showInfoModal" v-if="login">
               查看信息
               <a-modal v-model="infoVisible" title="个人信息" ok-text="确认" cancel-text="关闭" @ok="infoHandleOk">
                  <p style="padding-left:30px">头像：<a-avatar :size="50" slot="avatar">U</a-avatar></p>
                  <p style="padding-left:30px">用户名：{{name}}</p>
                  <p style="padding-left:30px">当前项目：</p>
                  <p style="padding-left:30px">邮箱：</p>
                  <p style="padding-left:30px">个人主页：</p>
               </a-modal>
            </a-menu-item>
            <a-menu-divider v-if="login"/>
            <a-menu-item key="7" style="color:red" @click="toExit" v-if="login">
               退出登录
            </a-menu-item>
				<a-menu-item key="8" style="" @click="toLogin" v-if="!login">
               登录
            </a-menu-item>
				<a-menu-item key="9" style="" @click="toRegister" v-if="!login">
               注册
            </a-menu-item>
         </a-menu>
      </a-dropdown>
   </div>
</template>

<script>
import {Modal} from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale-provider/zh_CN'
export default {
   name: "Banner",
	computed:{
		name(){
         return this.$store.state.banner.name
		},
		login(){
			return this.$store.state.login
		}
	},
   data() {
      return {
         zhCN,
			createVisible: false,
			createLoading: false,
			curName:"",
         createLoading: false,
         exchangeVisible: false,
         exchangeLoading: false,
         value: 1,
         memberVisible: false,
         addMemberVisible: false,
         mockData1: [],
         targetKeys1: [],
         addAdminVisible: false,
         mockData2: [],
         targetKeys2: [],
         infoVisible: false,
		};
	},
	methods: {
      //这个jump似乎就用不到了
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
      
      //创建项目部分
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

      //切换项目部分
      showExchangeModal() {
         this.exchangeVisible = true;
      },
      exchangeHandleOk(e){
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
         console.log('radio checked', e.target.value);
      },
 
      //删除项目部分
      showDeleteConfirm() {
         Modal.confirm({
            title: '确定要删除项目吗？',
            content: '',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
               console.log('OK');
            },
            onCancel() {
               console.log('Cancel');
            },
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
      showInfoModal(){
         this.infoVisible = true;
      },
      infoHandleOk(e) {
         console.log(e);
         this.infoVisible = false;
      },

      //退出登录后返回登录界面
      showOutLoginConfirm() {
         Modal.confirm({
            title: '确定要退出登录吗？',
            content: '',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
               console.log('OK');;
            },
            onCancel() {
               console.log('Cancel');
            },
         });
      },
      toLogin(){
         this.$router.push('/login').catch(()=>{})
      },
      toRegister(){
         this.$router.push('/register').catch(()=>{})
      },
      toExit(){
			this.$http
         .get(`/api/user/logout`)
         .then(doc => {
				var code = doc.data.status
				var code = doc.data.msg
				if(code == 0){
					this.$alert(msg,'true')
				}else{
					this.$alert(msg,'false')
				}
         });
         
      },
	},
   mounted() {
      this.getMock1();
      this.getMock2();
      this.$http
         .get(`/api/user/info`)
         .then(doc => {
				var code = doc.data.status
				if(code == 0){
					this.$store.commit('bannerReload',{
						name:doc.data.data.username,
						avatar:doc.data.data.avatar
					})
					this.$store.commit('loginReload',true)
					//console.log('已分发'+ doc.data.data.username)
				}else{
					this.$store.commit('bannerReload',{
						name:'未登录',
					})
					this.$store.commit('loginReload',false)
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
	color:#aaa;
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
