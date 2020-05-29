<template>
   <div id="wrapper">
       <p style="margin-left:35px;margin-top:25px;font-size:25px" >任务动态</p>
       <a-divider style="margin-top:10px"/>
      <div id="post">
          
    <a-list item-layout="horizontal" :data-source="data">
    <a-list-item slot="renderItem" slot-scope="item">
      <a-list-item-meta
        :description="item.post.content"
      >                            <!--//item.title-->
        <a slot="title" href="">{{ item.post.user.username}}{{item.post.action}}</a>
        
        <a-avatar
          slot="avatar"
          
        />
      </a-list-item-meta>
      <div style="margin-right:30px;font-size:12px">{{item.post.time}}</div>
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
const data = [
  {
    title: 'XXX创建了任务',
    content:'任务名',
  },
  {
    title: 'XXX更新了内容',
    content:'XXXXXXXXXX内容',
  },
  {
    title: 'XXX发表了评论',
    content:'XXXXXXXXXX评论',
  },
  {
    title: 'XXX更新了内容',
    content:'XXXXXXXXXX内容',
  },
  {
    title: 'XXX删除了任务',
    content:'任务名',
  },
];
export default {
   name: "Post",

   components: {},
   data() {
      return {
        num:0,
        unit:{
          action:'',
          content:'',
          user:null,
          time:null,
          link:''
        },
        post:unit[100],
        project_id:1,
      };
   },

   mounted(){
    this.getData()
   },

   methods:{
     getData:function(){
       var project_id=this.project_id;
       this.$http.get(`/api/project/<project_id>/action`,{project_id})
       .then(doc=>{
          this.unit.action=doc.data.action;
          this.unit.user=doc.data.user;
          this.unit.content=doc.data.content;
          this.unit.time=doc.data.time;
          this.unit.link=doc.data.link;
          this.post.push(this.unit);
          alert(doc.data.content);
       }).catch(err=>{
				this.$alert("未知错误", "false");  //服务器还没搭起来
			})
     /*this.num++;
     function setData(num){
        this.post[num].action=doc.data.action;
        this.post[num].user=doc.data.user;
        this.post[num].content=doc.data.content;
        this.post[num].time=doc.data.time;
        this.post[num].link=doc.data.link;
     }*/
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


