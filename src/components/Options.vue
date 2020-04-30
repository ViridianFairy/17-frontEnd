<template>
  <div style="width: 170px">
    <a-menu
      :defaultSelectedKeys="['1']"
      mode="inline"
      theme="dark"
      :inlineCollapsed="collapsed"
    >
      <a-menu-item key="1">
        <a-icon type="clock-circle" />
        <span>任务面板</span>
      </a-menu-item>

      <a-menu-item key="2">
        <a-icon type="bars" />
        <span>动态查看</span>
      </a-menu-item>

      <a-menu-item key="3">
        <a-icon type="edit" />
        <span>文档协作</span>
      </a-menu-item>

      <a-menu-item key="4">
        <a-icon type="table" />
        <span @click="$router.push('/disk')">文件管理</span>
      </a-menu-item>

      <a-menu-item key="5">
        <a-icon type="schedule" />
        <span @click="$router.push('/schedule')">日程安排</span>
      </a-menu-item>

      <a-menu-item key="6">
        <a-icon type="team" />
        <span>群组聊天</span>
      </a-menu-item>

      <a-menu-item key="7">
        <a-icon type="bell" />
        <span>消息通知</span>
      </a-menu-item>

    </a-menu>
  </div>
</template>

<script>
export default {
   name: "Options",
   components: {},
   data() {
     return {
      collapsed: false,
    };
   },
   methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
   },
};
</script>

<style scoped>

</style>