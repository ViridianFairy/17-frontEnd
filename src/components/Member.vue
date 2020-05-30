<template>
    <div id="wrapper">
        <p style="margin-left:35px;margin-top:25px;font-size:25px" >项目成员</p>
        <a-divider style="margin-top:10px"/>
    
    <div id="post">
        <p><a><a-icon type="plus-circle"  style="fontSize:35px;color:#003366;margin-top:25px;margin-bottom:-5px;vertical-align:bottom" theme="filled"/></a>
        <em style="font-size:18px;font-style:normal;padding-left:10px;">邀请新成员</em></p>
        <a-list item-layout="horizontal" :data-source="memberData"><!---->
    <a-list-item slot="renderItem" slot-scope="item">
      <a-list-item-meta
      >                            <!--//item.title-->
        <a slot="title" href="" style="font-size:18px">{{item.username}}</a>
        
        <a-avatar
          slot="avatar"
          :src="item.photo"
          size="large"
          
        />
      </a-list-item-meta>
      <div style="margin-right:900px;font-size:12px"><a><a-icon type="setting" style="fontSize:25px;color:gray"/></a></div>
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
      allData:[],
      memberData:[{
          id:1,
          username:'张三',
          identity:'manager',
          photo:"",
      }],
    };
  },
   
  mounted(){
    this.getMember()
  },

  methods:{
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
          if(doc.data.data.member)
            this.memberData=doc.data.data.member; 
          else
            this.memberData=[];
        }
       }).catch(err=>{
				this.$alert("未知错误", "false");  //服务器还没搭起来
      })
    }
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