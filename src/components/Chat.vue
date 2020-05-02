<template>
<div id="wrapper">

<div class="top">

  <!-- 发起聊天 -->
  <div id="chatCreate">
    <a-button type="link" icon="plus-circle">发起</a-button>
  </div>

  <!-- 显示当前群聊名称 -->
  <div id="chatName">
    <p>一根藤上七朵花</p>
  </div>

</div>


<div class="main-content">

  <!-- 聊天列表 -->
  <div id="chatList" style="border-right:1px solid #A9A9A9">
  <div id="chatList-content">
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

  <!-- 聊天内容显示+输入框 -->
  <div id="chatContent" style="border-right:1px solid #A9A9A9">

    <div id="chatShow">
      <div id="chatIn">
        <a-avatar :size="50" slot="avatar" style="float:left">U</a-avatar>
        <div id="contentIn">
          <p>
            啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
          </p>
        </div>
      </div>

      <div id="chatOut">
        <a-avatar :size="50" slot="avatar" style="float:right">U</a-avatar>
        <div id="contentOut" style="float:right;color:white">
          <p>
            啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
            啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
          </p>
        </div>
      </div>

      <div id="chatIn">
        <a-avatar :size="50" slot="avatar" style="float:left">U</a-avatar>
        <div id="contentIn">
          <p>
            啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
            啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
          </p>
        </div>
      </div>

      <div id="chatOut">
        <a-avatar :size="50" slot="avatar" style="float:right">U</a-avatar>
        <div id="contentOut" style="float:right;color:white">
          <p style="float:right">
            啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
          </p>
        </div>
      </div>

      <div id="chatIn">
        <a-avatar :size="50" slot="avatar" style="float:left">U</a-avatar>
        <div id="contentIn">
          <p>
            啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
            啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
          </p>
        </div>
      </div>

      <div id="chatIn">
        <a-avatar :size="50" slot="avatar" style="float:left">U</a-avatar>
        <div id="contentIn">
          <p>
            啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
            啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
          </p>
        </div>
      </div>

    </div>

    <div id="chatInput">
      <div id="chatInputText">
        <a-textarea style="height:93px" placeholder="" :rows="5" />
      </div>

      <div id="chatInputOther">
        <a-popover title="Title" trigger="click">
          <template slot="content">
            <p>Content</p>
            <p>Content</p>
          </template>
          <a-button type="link">
            <a-icon style="fontSize:28px;color:white;padding-top:7px" type="paper-clip" />
          </a-button>
        </a-popover>

        <a-popover title="表情" trigger="click">
          <template slot="content">
            <p><a-icon style="fontSize:20px" type="smile" /></p>
            <p><a-icon style="fontSize:20px" type="frown" /></p>
            <p><a-icon style="fontSize:20px" type="meh" /></p>
          </template>
          <a-button type="link">
            <a-icon style="fontSize:28px;color:white;padding-top:7px" type="smile" />
          </a-button>
        </a-popover>

        <a-button style="float:right" size="large">发送</a-button>
      </div>

    </div>


  </div>
 

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
}

.top{
    display: flex;
    margin-top: 10px;
    width: 100%;
    height: 30px;
}
#chatCreate{
    width: 250px;
}
#chatName{
    width: calc(100% - 250px);
    text-align: center;
    font-size: 20px;
    background-color: #001529;
    color: white;
}

.main-content{
    display: flex;
}
#chatList{
    width: 250px;
    height: 500px;
}
#chatList-content{

}
#chatContent{
    width: calc(100% - 250px);
    height: 500px;
}
#chatShow{
    width: 100%;
    height: 370px;
    overflow: auto;
    background-color: #F5F5F5;
}
#chatIn{
    width: 100%;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex; 
}
#chatOut{
    width: 100%;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
}
#contentIn{
    max-width: 70%;
    margin-left: 10px;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: white;
}
#contentOut{
    max-width: 70%;
    margin-right: 10px;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #1890FF;
}

#chatInput{
    height: 130px;
}
#chatInputOther{
    width: 100%;
    height: 40px;
    background-color: #001529;
}
#chatInputText{
    width: 100%;
    height: 90px;
}
</style>
 