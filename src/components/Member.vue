<template>
    <div id="wrapper">
        <p style="margin-left:35px;margin-top:25px;font-size:25px" >项目成员</p>
        <a-divider style="margin-top:10px"/>
    
    <div id="post">
      <!--邀请新成员弹窗-->
      <a-modal v-model="addMemberVisible" title="邀请新成员" ok-text="确认" cancel-text="取消" @ok="addMemberHandleOk">
        <h3>账号邀请</h3>
        <a-input placeholder="输入邮箱或电话直接邀请" style="width: 400px" v-model="addText1" />
        <a-radio-group v-model="value2" @change="onMemberChange" style="margin-top:9px">
          <a-radio value="1">
            邮箱
          </a-radio>
          <a-radio value="2" disabled>手机号</a-radio>
          <a-radio value="3">
            用户ID
          </a-radio>
        </a-radio-group>

        <p style="margin-top:50px">项目成员数量·{{this.memberNum}}</p>
      </a-modal>
       <!--修改管理员弹窗-->
      <a-modal v-model="amendVisible" title="修改成员信息" @ok="okMessage()">
        <h3>权限设置</h3>
        <a-radio-group v-model="identityType" @change="identityChange" style="margin-top:9px">
          <a-radio :value="'admin'">
            管理员
          </a-radio>
          <a-radio :value="'member'">
            成员
          </a-radio>
        </a-radio-group>
        <br /><br />
        <a-button @click="showConfirm" type="danger">
          移除成员
        </a-button>
      </a-modal>

        <p><a-icon @click="showAddMemberModal" type="plus-circle"  style="fontSize:35px;color:#003366;margin-top:25px;margin-bottom:-5px;vertical-align:bottom" theme="filled"/>
        <em style="font-size:18px;font-style:normal;padding-left:10px;">邀请新成员</em></p>
        <a-list item-layout="horizontal" :data-source="memberData"><!---->
    <a-list-item slot="renderItem" slot-scope="item">
      <a-list-item-meta
      >                            <!--//item.title-->
        <a slot="title" href="" style="font-size:18px;color:gray">{{item.username}}
          <a-icon @click="getMessage" type="eye" style="color:gray;fontSize:22px;margin-left:20px;vertical-align:bottom;margin-bottom:9px;"/></a>
          
        
        <a-avatar
          slot="avatar"
          :src="item.photo"
          size="large"
          
        />
      </a-list-item-meta>
      
      <div style="display:inline;margin-right:900px;font-size:12px">
        
        <a-icon v-if="item.identity=='originator'" type="crown" style="color:gold;fontSize:22px;margin-right:220px;vertical-align:bottom;margin-bottom:4.5px;"/>
        <a-icon v-if="item.identity=='admin'" type="sketch" style="color:#003366;fontSize:22px;margin-right:250px;vertical-align:bottom;margin-bottom:4.5px;"/>
      <a><a-icon @click="amendModal(item.identity,item.id)" v-if="item.identity!='originator'&&(identity=='admin'||identity=='originator')" type="setting" style="fontSize:25px;color:gray"/></a></div>
    </a-list-item>
  </a-list>
    </div>    
    </div>
</template>


<script>

export default {
  name: "Member",

  components: {},
  data() {
    return {
      addMemberVisible: false,
      addText1:"",
      value2: 1,
      inviteVisible:false,
      amendVisible:false,
      allData:[],
      nowId:0,//现在设置的成员id
      identity:"originator",//登录者的身份
      searchWay:'phone',
      identityType:'admin',
      memberNum:0,
      memberData:[/*{
          id:1,
          username:'张三',
          identity:'originator',
          photo:null,
      },
      {
          id:2,
          username:'李四',
          identity:'admin',
          photo:null,
      },
      {
          id:3,
          username:'王五',
          identity:'member',
          photo:"",
      },*/],
    };
  },
   
  mounted(){
    this.getMember()
  },

  methods:{
    searchMember(){

    },
    showConfirm(){//确认是否删除
      var a=confirm("确认移除该成员吗？");
       if(a){
      this.$http.post(`/api/project/${this.$store.state.project.id}/user/remove`, { 
				account_type: 'id',
				account:this.nowId,
			}).then(doc => {
            var code = doc.data.status;
            var msg = doc.data.msg;
            if (code == 0) {
              this.$alert(msg, "true");        
              this.amendVisible=false;
            }
            else {
              this.$alert(msg, "false");
            }
         })
         this.amendVisible=false;
      }
      
    },
    okMessage(){//设置成员信息
    if(this.identityType=='member'){//身份为member
      this.$http.post(`/api/project/${this.$store.state.project.id}/admin/remove`, { //删除管理员
        project_id: this.$store.state.project.id,
        id:this.nowId,
      }).then(doc => {
            var code = doc.data.status;
            var msg = doc.data.msg;
            if (code == 0) {
          this.$alert(msg, "true");
            } else {
              this.$alert(msg, "false");
            }
        })
    }
    else if(this.identityType=='admin'){//身份为member
      this.$http.post(`/api/project/${this.$store.state.project.id}/admin/add`, { //添加管理员
        project_id: this.$store.state.project.id,
        id:this.nowId,
      }).then(doc => {
            var code = doc.data.status;
            var msg = doc.data.msg;
            if (code == 0) {
          this.$alert(msg, "true");
            } else {
              this.$alert(msg, "false");
            }
        })
    }
      this.amendVisible=false;
    },
    identityChange(e){//单选设置身份按钮
      this.identityType=e.target.value;
      console.log('radio checked', e.target.value);
    },
    inviteModal() {
      this.inviteVisible = true;
    },
    amendModal(identity,id) {
      this.amendVisible = true;
      this.nowId=id;
      this.identityType=identity;
      console.log(id);
    },
    searchWayChange(e) {
      console.log('radio checked', e.target.value);
    },
    getMember(){
       this.$http.get(`/api/project/${this.$store.state.project.id}`,{params:{project_id:this.$store.state.project.id}})
       .then(doc=>{
        var code = doc.data.status;
        var msg = doc.data.msg;
				if (code == 0){
			    if(doc.data.data)
            this.allData=doc.data.data;
          else
            this.allData=[];
          if(doc.data.data.member){
            this.memberNum=doc.data.data.member.length;
            this.memberData=doc.data.data.member; 
          }
          else
            this.memberData=[];
        }
       }).catch(err=>{
				this.$alert("未知错误", "false");  //服务器还没搭起来
      })
    },
    getMessage(){

    },

    ////添加成员
    showAddMemberModal() {
			this.value2 = '1'
      this.addMemberVisible = true;
    },
      addMemberHandleOk(e) {
		  var val = this.value2
			if(val == '1')
				val = 'email'
			if(val == '3')
				val = 'id'
			console.log(val);
			this.$http.post(`/api/project/${this.$store.state.project.id}/user/add`,{
				project_id:this.$store.state.project.id,
				account:this.addText1,
				account_type:val,
			}).then(doc => {
            var code = doc.data.status;
            var msg = doc.data.msg;
            if (code == 0) {
					this.$alert(msg,'true')
					this.addMemberVisible = false;
            } else 
					this.$alert(msg,'false')
         });
      },
      onMemberChange(e) {
			
      },
      //添加/移除管理员部分
      showAddAdminModal() {
			this.value3 = '3'
        this.addAdminVisible = true;
      },
      addAdminHandleOk(e) {
		  var val = this.value3
			if(val == '1')
				val = 'email'
			if(val == '3')
				val = 'id'
			console.log(val);
			this.$http.post(`/api/project/${this.$store.state.project.id}/admin/add`,{
				project_id:this.$store.state.project.id,
				account:this.addText2,
				account_type:val,
			}).then(doc => {
            var code = doc.data.status;
            var msg = doc.data.msg;
            if (code == 0) {
					this.$alert(msg,'true')
					this.addAdminVisible = false;
            } else 
					this.$alert(msg,'false')
         });
      },
      onAdminChange(e) {
         console.log("radio3 checked", e.target.value);
      },
  },
     
    
   
};
</script>

<style scoped>
.ant-list-item-meta-title {
    margin-bottom: 4px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    line-height: 38px;
}
#post{
    margin-left:40px;
    height: 340px;
    overflow-y: scroll;
    margin-top:-25px;
}
#send{
    height:135px;

}
</style>