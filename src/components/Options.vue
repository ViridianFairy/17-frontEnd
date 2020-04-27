<template>
   <div id="wrapper">
      <section>任务面板</section>
      <section>文档协作</section>
      <section>文件管理</section>
      <section>日程安排</section>
      <a-icon type="team" />
      <section>群组聊天</section>
      <section>消息通知</section>
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
   padding-left: 0.6rem;
   color:white;
   background-color: #08466B;
}
section {
   padding: 1.2rem;
}
</style>
