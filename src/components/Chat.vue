<template>


    <div class="main-content" v-if="group">
      <div id="chatName"  >
        <p>{{group.name}}</p>
      </div>
      <div id="chatContent" >

        <div id="chatShow" ref="chatList">
          <template
            v-for="message in currentMessageList"
          >
            <div v-if="message.from === loginInfo.userID" class="chatOut">
              <a-avatar :size="50" slot="avatar" style="float:right">U</a-avatar>
              <div class="contentOut" style="float:right;color:white">
                <p>
                  {{message.payload.text}}
                </p>
              </div>
              <br>
              <br>
            </div>
            <div v-else class="chatIn">
              <a-avatar :size="50" slot="avatar" style="float:left">U</a-avatar>
              <div class="contentIn">
                <p>
                  {{message.payload.text}}
                </p>
              </div>
            </div>
          </template>
        </div>




      </div>
      <div id="chatInput">
        <div id="chatInputText">
          <a-textarea v-model="chatText" style="height:93px" placeholder="" :rows="5" />
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

          <a-button style="float:right" size="large" @click="sendMessage">发送</a-button>
        </div>

      </div>

    </div>


</template>


<script>
  import zhCN from 'ant-design-vue/es/locale-provider/zh_CN';
  import TIM from 'tim-js-sdk';
  import COS from "cos-js-sdk-v5";

  export default {
    name: "Chat",
    components: {},

    data() {
      return {
        zhCN,
        showCreate:0,
        createGroupVisible:false,
        mockData: [],
        targetKeys: [],
        project_id: 0,
        timDisabled: true,
        tim_is_login: false,
        messageList: {},
        currentMessageList: [],
        conversationList: [],
        groupsList: [],
        conversationID: null,
        chatSelect: null,
        tim: null,
        chatText: "",
        group: null,
        loginInfo:{
          userID: null,
          userSig: null,
        },
        messageBox: [],
      }
    },
    mounted() {
      this.getMock();
      this.timLogin();
    },
    methods: {
      timLogin() {
        if (this.project_id !== this.$store.state.project.id) {
          this.timDisabled = true;
          this.$http
                  .get(`/api/project/${this.$store.state.project.id}/chat/sig`, {})
                  .then(doc => {
                    var code = doc.data.status;
                    var msg = doc.data.msg;
                    if (code === 0) {
                      let data = doc.data.data;
                      console.log(data)
                      if (this.tim == null) {
                        this.timInit(data.app_id);
                      }
                      this.login(data.user_id, data.user_sig, this.$store.state.project.id);
                    }
                  });
        }
      },
      timInit(app_id) {
        this.tim = TIM.create({
          SDKAppID: app_id
        });
        this.tim.setLogLevel(1);
        this.tim.registerPlugin({'cos-js-sdk': COS});
      },
      logout() {
        console.log(TIM.EVENT, this);
        let promise = this.tim.logout();
        if (promise){
          promise.then(function (imResponse) {
            console.log("logout success：", imResponse.data); // 登出成功
          }).catch(function (imError) {
            console.warn('logout error:', imError);
          });
        }
      },
      login(user_id, user_sig, project_id) {
        this.logout();
        let promise = this.tim.login({userID: user_id, userSig: user_sig});
        promise.then((imResponse)=> {
          console.log("login success", imResponse.data); // 登录成功
          this.project_id = project_id;
          this.loginInfo.userID = user_id;
          this.loginInfo.userSig = user_sig;
          this.initListener();
        }).catch(function(imError) {
          console.warn('login error:', imError); // 登录失败的相关信息
        });
      },
      initListener() {
        this.tim.on(TIM.EVENT.SDK_READY, this.onReady);
        this.tim.on(TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage);
      },
      onReady(event) {
        this.getGroupList()
      },
      onReceiveMessage({ data: messageList }) {
        this.updateMessageList(messageList)
      },
      updateMessageList(data) {
        if (Array.isArray(data)) {
          // 筛选出当前会话的消息
          const result = data.filter(item => item.conversationID === this.conversationID)
          this.currentMessageList = [...this.currentMessageList, ...result]
        } else if (data.conversationID === this.conversationID) {
          this.currentMessageList = [...this.currentMessageList, data]
        }
        this.$refs.chatList.scrollTop = this.$refs.chatList.scrollHeight;
        console.log(this.$refs.chatList)
      },
      getGroupList () {
        console.log("123123")
        let promise = this.tim.getGroupList();
        promise.then((imResponse) => {
          console.log("group list:", imResponse.data.groupList); // 群组列表
          this.groupsList = imResponse.data.groupList;
          if(this.groupsList){
            this.group = this.groupsList[0];
            this.conversationID = "GROUP"+this.group.groupID;
          }
          this.getMessageList();
        }).catch(function(imError) {
          console.warn('getGroupList error:', imError); // 获取群组列表失败的相关信息
        });



      },
      getConversation() {
        let promise = this.tim.getConversationList();
        promise.then(imResponse => {
          const conversationList = imResponse.data.conversationList; // 会话列表，用该列表覆盖原有的会话列表
          console.log("conversation list:", conversationList);
          this.conversationList = conversationList;
        }).catch(function(imError) {
          console.warn('getConversationList error:', imError); // 获取会话列表失败的相关信息
        });
      },

      getMessageList() {
        let id = `GROUP${this.group.groupID}`;
        let promise = this.tim.getMessageList({conversationID: id, count: 15});
        promise.then((imResponse)=> {
          const messageList = imResponse.data.messageList; // 消息列表。
          const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
          const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
          // this.messageList[group.groupID]=messageList;
          this.currentMessageList = messageList;
        });
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
      onSearch() {

      },
      sendMessage() {
        if (this.chatText){
          let message = this.tim.createTextMessage({
            to: this.group.groupID,
            conversationType: TIM.TYPES.CONV_GROUP,
            payload: {
              text: this.chatText
            }
          });
          this.updateMessageList(message);
          console.log(this.messageList)
          this.tim.sendMessage(message);
          this.chatText = "";
        }
      }
    },
  };
</script>



<style scoped>
  #wrapper{
    margin-left: 30px;
    margin-right: 30px;
  }

  #chatName{
    width: 100%;
    text-align: center;
    font-size: 20px;
    background-color: #001529;
    color: white;
  }

  .main-content{

  }
  #chatContent{
    width: 100%;
  }
  #chatShow{
    width: 100%;
    height: 500px;
    overflow: scroll;
    background-color: #F5F5F5;
  }
  .chatIn{
    width: 80%;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
  }
  .chatOut{
    width: 100%;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .contentIn{
    max-width: 70%;
    margin-left: 10px;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: white;
  }
  .contentOut {
    max-width: 70%;
    margin-right: 10px;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #1890FF;
  }


  #chatInput{
    width: 100%;
    bottom:0;
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
 