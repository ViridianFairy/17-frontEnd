<template>
   <div id="wrapper">
      <section><a-icon type="clock-circle" />任务面板</section>
      <section><a-icon type="edit" />文档协作</section>
      <section><a-icon type="table" />文件管理</section>
      <section><a-icon type="schedule" />日程安排</section>
      <section><a-icon type="team" />群组聊天</section>
      <section><a-icon type="bell" />消息通知</section>
   </div>
</template>
<script>
export default {
   name: "Options",
   components: {},
   data() {
      return {};
   }
};
</script>

<style scoped>
#wrapper{
	/* width: 300px; */
	font-size: 1.5rem;
   /* padding-left: 0.6rem; */
   color:white;
   background-color: #08466B;
}
section{
   padding: 1.5rem;
}
section:active{
   background: rgb(59, 165, 236);
}
</style>
