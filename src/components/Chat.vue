<template>
<div id="wrapper">

<div id="chatCreate">
  <a-button type="link" icon="plus-circle">发起</a-button>
</div>

<div id="chatList">
  <a-list itemLayout="horizontal" :dataSource="data">
    <a-list-item slot="renderItem" slot-scope="item, index">

      <a-list-item-meta description="xxxxxx">
        <a slot="title" href="/schedule">{{ item.title }}</a><!-- 跳转测试 -->
        <a-avatar slot="avatar">U</a-avatar>
      </a-list-item-meta>

    </a-list-item>
  </a-list>
</div>




</div>
</template>


<script>
const data = [
  {
    title: '一根藤上七朵花',
  },
  {
    title: '前端小组',
  },
  {
    title: '后端小组',
  },
];
export default {
    name: "Chat",
    components: {},
    data() {
        return {
            data,
        };
    },
};
</script>



<style scoped>
#wrapper{
    margin-left: 30px;
    margin-right: 30px;
    /* display: flex; */
}
#chatCreate{
    margin-top: 10px;
    width: 250px;
}
#chatList{
    margin-top: 10px;
    width: 250px;
}

</style>
