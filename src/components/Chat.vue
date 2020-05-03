<template>
<div id="wrapper">

<div class="top">

  <!-- 发起聊天 -->
  <div v-if="showCreateButton==1" id="chatCreateButton">
    <a-button type="link" icon="plus-circle" @click="showCreateList=1;showCreateButton=0">发起</a-button>
  </div>

  <div v-if="showCreateButton==0" id="backListButton">
    <a-button type="link" icon="left" @click="showCreateList=0;showCreateButton=1">返回</a-button>
  </div>

  <!-- 显示当前群聊名称 -->
  <div id="chatName">
    <p>一根藤上七朵花</p>
  </div>

</div>


<div class="main-content">

  <!-- 聊天列表 -->
  <div v-if="showCreateList==0" id="chatList" style="border-right:1px solid #A9A9A9">
  <div id="chatList-content">
    <a-list itemLayout="horizontal" :dataSource="dataGroup">
      <a-list-item slot="renderItem" slot-scope="item, index">

        <a-list-item-meta description="xxxxxx">
          <a slot="title" href="/schedule">{{ item.title }}</a><!-- 跳转测试 -->
          <a-avatar slot="avatar">U</a-avatar>
        </a-list-item-meta>

      </a-list-item>
    </a-list>
  </div>
  </div>


  <div v-if="showCreateList==1" id="chatCreate" style="border-right:1px solid #A9A9A9">
  <div id="chatCreate-content">

    <a-input-search placeholder="搜索成员" style="width: 230px;margin: auto" @search="onSearch" />

    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="私信">
        <p style="color:#A9A9A9">合作过的成员</p>
        <a-list itemLayout="horizontal" :dataSource="dataMember">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-list-item-meta description="">
              <a slot="title" href="/schedule">{{ item.title }}</a><!-- 跳转测试 -->
              <a-avatar slot="avatar">U</a-avatar>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-tab-pane>

      <a-tab-pane key="2" tab="群聊" force-render>

        <a-button type="primary" @click="showModal">
          点击创建新群聊
        </a-button>
        <a-locale-provider :locale="zhCN">
        <a-modal v-model="createGroupVisible" title="创建新群聊" @ok="handleOk">
          <a-transfer
            :data-source="mockData"
            show-search
            :operations="['加入', '移除']"
            :target-keys="targetKeys"
            :render="item => `${item.title}`"
            @change="handleChange"
          >
            <span slot="notFoundContent">
              暂无成员
            </span>
          </a-transfer>
        </a-modal>
        </a-locale-provider>
      </a-tab-pane>
    </a-tabs>

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
        <a-popover title="添加附件" trigger="click">
          <template slot="content">
            <p></p>
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
const dataGroup = [
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
const dataMember = [
  {
    title: 'A',
  },
  {
    title: 'B',
  },
  {
    title: 'C',
  },
];
import zhCN from 'ant-design-vue/es/locale-provider/zh_CN';
export default {
    name: "Chat",
    components: {},
    data() {
        return {
            zhCN,
            dataGroup,
            dataMember,
            showCreateButton:1,
            showCreateList:0,
            createGroupVisible:false,
            mockData: [],
            targetKeys: [],
        };
    },
    mounted() {
      this.getMock();
    },
    methods: {
      onSearch(value) {
        console.log(value);
      },
      callback(key) {
        console.log(key);
      },
      showModal() {
        this.createGroupVisible = true;
      },
      handleOk(e) {
        console.log(e);
        this.createGroupVisible = false;
      },
      getMock() {
        const targetKeys = [];
        const mockData = [];
        for (let i = 0; i < 5; i++) {
          const data = {
            key: i.toString(),
            title: `联系人${i + 1}`,
            //description: `description of content${i + 1}`,
            chosen: 0,
          };
          if (data.chosen) {
            targetKeys.push(data.key);
          }
          mockData.push(data);
        }
        this.mockData = mockData;
        this.targetKeys = targetKeys;
      },
      handleChange(targetKeys, direction, moveKeys) {
        console.log(targetKeys, direction, moveKeys);
        this.targetKeys = targetKeys;
      },
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
    /* margin-top: 10px; */
    width: 100%;
    height: 30px;
}
#chatCreateButton,#backListButton{
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
#chatList,#chatCreate{
    width: 250px;
    height: 520px;
    overflow: auto;
}
#chatList-content{

}
#chatCreate-content{
    width: 249px;
    height: 520px;
    /* background-color: #1890FF; */
}
#chatContent{
    width: calc(100% - 250px);
    height: 520px;
}
#chatShow{
    width: 100%;
    height: 390px;
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
 