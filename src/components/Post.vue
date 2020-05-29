<template>
   <div id="wrapper">
       <p style="margin-left:35px;margin-top:25px;font-size:25px" >任务动态</p>
       <a-divider style="margin-top:10px"/>
      <div id="post">
          
    <a-list item-layout="horizontal" :data-source="postdata"><!---->
    <a-list-item slot="renderItem" slot-scope="item">
      <a-list-item-meta
        :description="item.content"
      >                            <!--//item.title-->
        <a slot="title" href="">{{item.user.username}}{{item.action}}</a>
        
        <a-avatar
          slot="avatar"
          
        />
      </a-list-item-meta>
      <div style="margin-right:30px;font-size:12px">{{item.time}}</div>
    </a-list-item>
  </a-list>
  </div>
  <a-divider style="margin-top:0px"/>
  <div id="send">
      <a-textarea placeholder="@提及他人 Enter快速发布" :rows="5" style="font-size:15px;margin-top:-25px;width:1700px"/>
    <a style="color:gray"><a-icon type="link" style="font-size:23px;margin-left:25px;margin-top:10px"/></a>
    <a style="color:gray"><a-icon type="smile" style="font-size:23px;margin-left:20px;margin-bottom:-6px"/></a>
    <a-button type="link" style="font-size:18px;float:right;margin-top:0px;margin-right:10px">
      发布
    </a-button>
  </div>
</div>
  
</template>

<script>
export default {
   name: "Post",

   components: {},
   data() {
      return {
        num:0,
        /*unit:{
          action:'',
          content:'',
          user:null,
          time:null,
          link:''
        },
        post:unit[100],*/
        postdata:[{
          action: "成为了管理员",
          content: "AA",
          link: "task:16",
          time: "2020-05-13 00:36:13",
          user: {
          id: 3,
          photo: null,
          username: "用户03",
          }
        },
        {
          action: "成为了管理员",
          content: "BB",
          link: "task:16",
          time: "2020-05-23 00:36:13",
          user: {
          id: 2,
          photo: null,
          username: "用户02",
          }
        }],
        /*
        action:['sda'],
        content:['sadasda'],
        user:[],
        time:[],
        link:[],
        userid:[],
        username:['sdasda'],
        userphoto:[],
        project_id:1,
        */
      };
   },

   mounted(){
    this.getData()
   },

   methods:{
     getData:function(){
       var project_id=this.project_id;
       this.$http.get(`/api/project/${this.$store.state.project.id}/action`,{params:{project_id:project_id}})
       .then(doc=>{
          this.postdata=doc.data.data;
       }).catch(err=>{
				this.$alert("未知错误", "false");  //服务器还没搭起来
      })
      /*var i;
      var action=[],
        content=[],
        user=[],
        time=[],
        link=[],
        username=[],
        userid=[],
        userphoto=[];
      for(i=0;i<this.postdata.length;i++){
        action.push(this.postdata[i].action);
        content.push(this.postdata[i].content);
        user.push(this.postdata[i].user);
        time.push(this.postdata[i].time);
        link.push(this.postdata[i].link);
      }
      this.action=action;
      this.content=content;
      this.user=user;
      this.time=time;
      this.link=link;
      for(i=0;i<this.user.length;i++){
        userid.push(this.user[i].id);
        username.push(this.user[i].username);
        userphoto.push(this.user[i].photo);
      }
      this.username=username;
      this.userid=userid;
      this.userphoto=userphoto;*/
     }
     
   }
    
   
};
</script>

<style scoped>

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


