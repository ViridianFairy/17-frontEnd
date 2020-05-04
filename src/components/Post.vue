<template>
   <div id="wrapper">
       <p style="margin-left:35px;margin-top:25px;font-size:25px" >任务动态</p>
       <a-divider />
      <div id="post">
          
    <a-list item-layout="horizontal" :data-source="data">
    <a-list-item slot="renderItem" slot-scope="item">
      <a-list-item-meta
        :description="item.content"
      >
        <a slot="title" href="">{{ item.title }}</a>
        
        <a-avatar
          slot="avatar"
          
        />
      </a-list-item-meta>
      <div style="margin-right:30px;font-size:12px">XXXX年XX月XX日 XX:XX:XX</div>
    </a-list-item>
  </a-list>
  </div>
  <a-divider style="margin-top:0px"/>
  <div id="send">
      <a-textarea placeholder="@提及他人 Enter快速发布" :rows="5" style="font-size:15px;margin-top:-25px;width:1700px"/>
    <a style="color:gray"><a-icon type="link" style="font-size:23px;margin-left:25px;margin-top:12px"/></a>
    <a style="color:gray"><a-icon type="smile" style="font-size:23px;margin-left:20px;margin-top:12px"/></a>
    <a-button type="link" :size="size" style="font-size:18px;float:right;margin-top:6px;margin-right:10px">
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
        data,
      };
   },
    
   
};
</script>

<style scoped>

#post{
    margin-left:40px;
    height: 340px;
    overflow-y: scroll;
    margin-top:-32px;
}
#send{
    
    height:140px;

}
</style>


