<template>
   <div id="wrapper">
      <div id="pending">
         <h2>未完成</h2>
         <div>
            <div>
               <a-button block @click="$router.push('/taskDetails')">软件工程实践</a-button>
            </div>
            <br />
         </div>
         <div>
            <a-collapse accordion id="panel1" @change="setclock=0">
               <a-collapse-panel header="✚" key="1" :showArrow="false">
                  <a-input placeholder="输入任务标题" />
                  <!-- 菜单  -->
                  <p style="margin-top:20px">
                     <a-avatar :size="30" icon="user" />
                     <em style="font-style:normal;font-family:'Microsoft YaHei';color:gray;font-size:15px;margin-left:14.5px">用户</em>
                  </p>
                  <!-- 起止日期 -->                 
                  <a-icon type="calendar" style="fontSize:20px;color:gray;margin-left:4px;margin-top:4px;vertical-align:bottom" />
                     <!--a-date-picker
                        style="margin-top:-10px;margin-bottom:5px;margin-left:18px;"
                        :disabledDate="disabledStartDate"
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        v-model="startValue"
                        placeholder="开始时间"
                        @openChange="handleStartOpenChange"
                     /><br />
                  <a-icon type="calendar" style="fontSize:20px;color:gray;margin-left:4px" />
                     <a-date-picker
                        style="margin-top:-10px;margin-bottom:5px;margin-left:18px;"
                        :disabledDate="disabledEndDate"
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="结束时间"
                        v-model="endValue"
                        :open="endOpen"
                        @openChange="handleEndOpenChange"
                     /-->
                     <a-date-picker style="color:gray;font-size:15px;margin-left:20px" placeholder="设置开始时间" @change="onChange1" @ok="onOk">
                        <span>{{ dateString1 ? dateString1 : '设置开始时间' }}</span>
                     </a-date-picker><br />
                     <p style="margin-top:-20px;display:inline">
                     <a-icon type="calendar" style="fontSize:20px;color:gray;margin-left:4px;margin-top:20px;vertical-align:bottom;margin-bottom:-0.1px" />
                     
                     <a-date-picker style="color:gray;font-size:15px;margin-left:20px" placeholder="设置截止时间" @change="onChange2" @ok="onOk">
                        <span>{{ dateString2 ? dateString2 : '设置截止时间' }}</span>
                     </a-date-picker>
                     
                  <!-- 提醒   -->
                  <br />
                  
                     <a-icon type="clock-circle" style="fontSize:20px;color:gray;margin-left:4px;margin-top:22px;vertical-align:bottom;margin-bottom:0.2px" />                     
                     
                        <!--em class="em11" style="padding-left:20px;margin-bottom:60px" v-if="clocktype==0" @click="showModal">不提醒</em>
                        <em class="em11" style="padding-left:20px" v-if="clocktype==1" @click="showModal">任务开始时</em>
                        <em class="em11" style="padding-left:20px" v-if="clocktype==2" @click="showModal">任务截止时</em-->
                     
                  <p style="padding-left:20.5px;display:inline;color:gray;font-family:'Microsoft YaHei';font-size:15px" v-if="clocktype==0" @click="showModal">不提醒</p>
                  <p style="padding-left:20.5px;display:inline;color:gray;font-family:'Microsoft YaHei';font-size:15px" v-if="clocktype==1" @click="showModal">任务开始时</p>
                  <p style="padding-left:20.5px;display:inline;color:gray;font-family:'Microsoft YaHei';font-size:15px" v-if="clocktype==2" @click="showModal">任务截止时</p>

                  <a-modal
                     title="任务提醒设置"
                     :visible="visible"
                     :confirm-loading="confirmLoading"
                     @ok="handleOk"
                     @cancel="handleCancel"
                     cancelText="取消"
                     okText="保存"
                     width="600px"
                  >                           
                  <p style="font-size:16px">
                     提醒时间
                     <a @click="showclock=1">
                     <a-icon type="plus-circle" theme="filled" style="fontSize:18px;color:#003366;margin-left:370px;"/>                            
                     添加新提醒
                     </a>
                  </p>
                     <a-select v-if="showclock==1" style="width:160px;margin-top:-5px" @change="handleChange">
                        <a-select-option value="begin" @click="clocktype=1">
                           任务开始时
                        </a-select-option>
                        <a-select-option value="end" @click="clocktype=2">
                           任务截止时
                        </a-select-option>
                        <a-select-option value="no" @click="clocktype=0">
                           不提醒
                        </a-select-option>
                     </a-select>
                     <p><br /></p>
                  <p style="font-size:16px;margin-top:-15px">提醒对象</p>
                     <a-avatar :size="35" icon="user" style="margin-top:-20px" />              
                        <a-tooltip>
                           <template slot="title">添加提醒对象</template>                   
                           <a>
                              <a-icon type="plus-circle" theme="filled" style="margin-top:-8px;fontSize:30px;color:#003366;margin-left:10px;"/><br />
                           </a>
                        </a-tooltip>
                  </a-modal>         
               
                  <!-- 优先级   -->
                  <a-menu style="width: 340px;margin-left:10x;margin-right:-20px">                     
                     <a-sub-menu key="priority" style="margin-top:8px">
                     <span slot="title">
                        <a-icon type="fire" style="fontSize:20px;color:gray;margin-left:-12px;vertical-align:middle;margin-bottom:4px"/>
                        <a-tag v-if="taskpriority=='较低'" color="gray" :visible="true" style="font-size:15px;height:22px;margin-left:10px;margin-top:14px">
                           较低
                        </a-tag> 
                        <a-tag v-if="taskpriority=='普通'" color="green" :visible="true" style="font-size:15px;height:22px;margin-left:10px;margin-top:14px">
                           普通
                        </a-tag> 
                        <a-tag v-if="taskpriority=='紧急'" color="orange" :visible="true" style="font-size:15px;height:22px;margin-left:10px;margin-top:14px">
                           紧急
                        </a-tag> 
                        <a-tag v-if="taskpriority=='非常紧急'" color="red" :visible="true" style="font-size:15px;height:22px;margin-left:10px;margin-top:14px">
                           非常紧急
                        </a-tag>                  
                     </span>
                        <a-menu-item key="jd" @click="taskpriority='较低'">
                           <a-tag color="gray" style="font-size:15px;height:22px;margin-left:0px">
                              较低
                           </a-tag>
                        </a-menu-item>   
                        <a-menu-item key="pt" @click="pt">
                           <a-tag color="green" style="font-size:15px;height:22px;margin-left:0px">
                              普通
                           </a-tag>
                        </a-menu-item>   
                        <a-menu-item key=jj @click="jj">
                           <a-tag color="orange" style="font-size:15px;height:22px;margin-left:0px">
                              紧急
                           </a-tag>
                        </a-menu-item>
                        <a-menu-item key=fc @click="fc">
                           <a-tag color="red" style="font-size:14px;height:22px;margin-left:0px">
                              非常紧急
                           </a-tag>  
                        </a-menu-item>    
                     </a-sub-menu>
                  </a-menu>

                  <!--  标签   -->               
                  <a-icon type="tag" style="fontSize:20px;color:gray;margin-left:4px;margin-top:14px;vertical-align:bottom;margin-bottom:0.3px" />

                  <em class="em11" style="margin-left:11.5px;font-size:15px" @click="showlabel=1">标签</em>
                  <div id="tags" v-if="showlabel==1">
                     <div style="margin-left:4px;margin-top:3px">
                        <template v-for="(tag, index) in tags">
                           <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
                              <a-tag
                                 :key="tag"
                                 :closable="index !== 0"
                                 @close="() => handleClose(tag)"
                              >{{ `${tag.slice(0, 20)}...` }}</a-tag>
                           </a-tooltip>
                           <a-tag
                              v-else
                              :key="tag"
                              :closable="index !== 0"
                              color="#003366"
                              style="font-size:14px;text-align:center;height:22px"
                              @close="() => handleClose(tag)"
                           >{{ tag }}</a-tag>
                        </template>
                        <a-input
                           v-if="inputVisible"
                           ref="input"
                           type="text"
                           size="default"
                           :style="{ width: '78px' }"
                           :value="inputValue"
                           @change="handleInputChange"
                           @blur="handleInputConfirm"
                           @keyup.enter="handleInputConfirm"
                        />
                        <a-tag
                           v-else
                           @click="showInput"
                           style="background:#fff;height:22px; borderStyle: dashed;margin-top:8px"
                        >
                           <a-icon type="plus" />
                           <em style="font-size:14px;font-style:normal;font-family:'Microsoft YaHei'">添加标签</em>
                        </a-tag>
                     </div>
                  </div>
                  <a-divider style="margin-top:15px"/>
                  <p style="margin-top:-15px;font-size:16px;margin-left:5px">参与者 · 1</p>                
                     <a-avatar :size="35" icon="user" style="margin-top:-18px" />
                     <a-tooltip>
                        <template slot="title">
                           添加参与者
                        </template>                   
                        <a>
                           <a-icon type="plus-circle" theme="filled" style="fontSize:30px;color:#003366;margin-left:10px;"/><br />
                        </a>
                     </a-tooltip>
                  <a-button style="font-size:16px;float:right" @click="reset">创建</a-button>

                  <br />
                  <br />               
               </a-collapse-panel>
            </a-collapse>
         </div>
      </div>
      <div id="finish">
         <h2>已完成</h2>
         <div>
            <a-collapse accordion>
               <a-collapse-panel header="✚" key="2" :showArrow="false">
                  <a-input placeholder="输入任务标题" />
                  <!-- 菜单  -->
                  <p style="margin-top:20px">
                     <a-avatar :size="30" icon="user" />
                     <em style="font-style:normal;font-family:'Microsoft YaHei';color:gray;font-size:15px;margin-left:14.5px">用户</em>
                  </p>
                  <!-- 起止日期 -->                 
                  <a-icon type="calendar" style="fontSize:20px;color:gray;margin-left:4px;margin-top:4px;vertical-align:bottom" />
                     <!--a-date-picker
                        style="margin-top:-10px;margin-bottom:5px;margin-left:18px;"
                        :disabledDate="disabledStartDate"
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        v-model="startValue"
                        placeholder="开始时间"
                        @openChange="handleStartOpenChange"
                     /><br />
                  <a-icon type="calendar" style="fontSize:20px;color:gray;margin-left:4px" />
                     <a-date-picker
                        style="margin-top:-10px;margin-bottom:5px;margin-left:18px;"
                        :disabledDate="disabledEndDate"
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="结束时间"
                        v-model="endValue"
                        :open="endOpen"
                        @openChange="handleEndOpenChange"
                     /-->
                     <a-date-picker style="color:gray;font-size:15px;margin-left:20px" placeholder="设置开始时间" @change="onChange1" @ok="onOk">
                        <span>{{ dateString1 ? dateString1 : '设置开始时间' }}</span>
                     </a-date-picker><br />
                     <p style="margin-top:-20px;display:inline">
                     <a-icon type="calendar" style="fontSize:20px;color:gray;margin-left:4px;margin-top:20px;vertical-align:bottom;margin-bottom:-0.1px" />
                     
                     <a-date-picker style="color:gray;font-size:15px;margin-left:20px" placeholder="设置截止时间" @change="onChange2" @ok="onOk">
                        <span>{{ dateString2 ? dateString2 : '设置截止时间' }}</span>
                     </a-date-picker>
                     
                  <!-- 提醒   -->
                  <br />
                  
                     <a-icon type="clock-circle" style="fontSize:20px;color:gray;margin-left:4px;margin-top:22px;vertical-align:bottom;margin-bottom:0.2px" />                     
                     
                        <!--em class="em11" style="padding-left:20px;margin-bottom:60px" v-if="clocktype==0" @click="showModal">不提醒</em>
                        <em class="em11" style="padding-left:20px" v-if="clocktype==1" @click="showModal">任务开始时</em>
                        <em class="em11" style="padding-left:20px" v-if="clocktype==2" @click="showModal">任务截止时</em-->
                     
                  <p style="padding-left:20.5px;display:inline;color:gray;font-family:'Microsoft YaHei';font-size:15px" v-if="clocktype==0" @click="showModal">不提醒</p>
                  <p style="padding-left:20.5px;display:inline;color:gray;font-family:'Microsoft YaHei';font-size:15px" v-if="clocktype==1" @click="showModal">任务开始时</p>
                  <p style="padding-left:20.5px;display:inline;color:gray;font-family:'Microsoft YaHei';font-size:15px" v-if="clocktype==2" @click="showModal">任务截止时</p>

                  <a-modal
                     title="任务提醒设置"
                     :visible="visible"
                     :confirm-loading="confirmLoading"
                     @ok="handleOk"
                     @cancel="handleCancel"
                     cancelText="取消"
                     okText="保存"
                     width="600px"
                  >                           
                  <p style="font-size:16px">
                     提醒时间
                     <a @click="showclock=1">
                     <a-icon type="plus-circle" theme="filled" style="fontSize:18px;color:#003366;margin-left:370px;"/>                            
                     添加新提醒
                     </a>
                  </p>
                     <a-select v-if="showclock==1" style="width:160px;margin-top:-5px" @change="handleChange">
                        <a-select-option value="begin" @click="clocktype=1">
                           任务开始时
                        </a-select-option>
                        <a-select-option value="end" @click="clocktype=2">
                           任务截止时
                        </a-select-option>
                        <a-select-option value="no" @click="clocktype=0">
                           不提醒
                        </a-select-option>
                     </a-select>
                     <p><br /></p>
                  <p style="font-size:16px;margin-top:-15px">提醒对象</p>
                     <a-avatar :size="35" icon="user" style="margin-top:-20px" />              
                        <a-tooltip>
                           <template slot="title">添加提醒对象</template>                   
                           <a>
                              <a-icon type="plus-circle" theme="filled" style="margin-top:-8px;fontSize:30px;color:#003366;margin-left:10px;"/><br />
                           </a>
                        </a-tooltip>
                  </a-modal>         
               
                  <!-- 优先级   -->
                  <a-menu style="width: 340px;margin-left:10x;margin-right:-20px">                     
                     <a-sub-menu key="priority" style="margin-top:8px">
                     <span slot="title">
                        <a-icon type="fire" style="fontSize:20px;color:gray;margin-left:-12px;vertical-align:middle;margin-bottom:4px"/>
                        <a-tag v-if="taskpriority=='较低'" color="gray" :visible="true" style="font-size:15px;height:22px;margin-left:10px;margin-top:14px">
                           较低
                        </a-tag> 
                        <a-tag v-if="taskpriority=='普通'" color="green" :visible="true" style="font-size:15px;height:22px;margin-left:10px;margin-top:14px">
                           普通
                        </a-tag> 
                        <a-tag v-if="taskpriority=='紧急'" color="orange" :visible="true" style="font-size:15px;height:22px;margin-left:10px;margin-top:14px">
                           紧急
                        </a-tag> 
                        <a-tag v-if="taskpriority=='非常紧急'" color="red" :visible="true" style="font-size:15px;height:22px;margin-left:10px;margin-top:14px">
                           非常紧急
                        </a-tag>                  
                     </span>
                        <a-menu-item key="jd" @click="taskpriority='较低'">
                           <a-tag color="gray" style="font-size:15px;height:22px;margin-left:0px">
                              较低
                           </a-tag>
                        </a-menu-item>   
                        <a-menu-item key="pt" @click="pt">
                           <a-tag color="green" style="font-size:15px;height:22px;margin-left:0px">
                              普通
                           </a-tag>
                        </a-menu-item>   
                        <a-menu-item key=jj @click="jj">
                           <a-tag color="orange" style="font-size:15px;height:22px;margin-left:0px">
                              紧急
                           </a-tag>
                        </a-menu-item>
                        <a-menu-item key=fc @click="fc">
                           <a-tag color="red" style="font-size:14px;height:22px;margin-left:0px">
                              非常紧急
                           </a-tag>  
                        </a-menu-item>    
                     </a-sub-menu>
                  </a-menu>

                  <!--  标签   -->               
                  <a-icon type="tag" style="fontSize:20px;color:gray;margin-left:4px;margin-top:14px;vertical-align:bottom;margin-bottom:0.3px" />

                  <em class="em11" style="margin-left:11.5px;font-size:15px" @click="showlabel=1">标签</em>
                  <div id="tags" v-if="showlabel==1">
                     <div style="margin-left:4px;margin-top:3px">
                        <template v-for="(tag, index) in tags">
                           <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
                              <a-tag
                                 :key="tag"
                                 :closable="index !== 0"
                                 @close="() => handleClose(tag)"
                              >{{ `${tag.slice(0, 20)}...` }}</a-tag>
                           </a-tooltip>
                           <a-tag
                              v-else
                              :key="tag"
                              :closable="index !== 0"
                              color="#003366"
                              style="font-size:14px;text-align:center;height:22px"
                              @close="() => handleClose(tag)"
                           >{{ tag }}</a-tag>
                        </template>
                        <a-input
                           v-if="inputVisible"
                           ref="input"
                           type="text"
                           size="default"
                           :style="{ width: '78px' }"
                           :value="inputValue"
                           @change="handleInputChange"
                           @blur="handleInputConfirm"
                           @keyup.enter="handleInputConfirm"
                        />
                        <a-tag
                           v-else
                           @click="showInput"
                           style="background:#fff;height:22px; borderStyle: dashed;margin-top:8px"
                        >
                           <a-icon type="plus" />
                           <em style="font-size:14px;font-style:normal;font-family:'Microsoft YaHei'">添加标签</em>
                        </a-tag>
                     </div>
                  </div>
                  <a-divider style="margin-top:15px"/>
                  <p style="margin-top:-15px;font-size:16px;margin-left:5px">参与者 · 1</p>                
                     <a-avatar :size="35" icon="user" style="margin-top:-18px" />
                     <a-tooltip>
                        <template slot="title">
                           添加参与者
                        </template>                   
                        <a>
                           <a-icon type="plus-circle" theme="filled" style="fontSize:30px;color:#003366;margin-left:10px;"/><br />
                        </a>
                     </a-tooltip>
                  <a-button style="font-size:16px;float:right" @click="reset">创建</a-button>

                  <br />
                  <br />             
               </a-collapse-panel>
            </a-collapse>
         </div>
      </div>
   </div>
</template>
<script>

export default {
	name:"TaskPanel",
   
	mounted(){
		this.$http.post(`/api/user/register`,{
         }).then(res => {
				console.log(res.data)
            if(res.data.status==1)
               
            
               this.$alert(res.data.msg,'false')
         })
	},
   data() {
      return {
         startValue: null,
         endValue: null,
         endOpen: false,
         visible: false,
         tags: ["任务"],
         inputVisible: false,
         inputValue: "",
         text:"test",
         taskpriority:"较低",
         clocktype:0,
         showclock:0,
         showlabel:0,
         confirmLoading: false,
         dateString1:"",
         dateString2:""
      };
   },
   watch: {
      startValue(val) {
         console.log("startValue", val);
      },
      endValue(val) {
         console.log("endValue", val);
      }
   },

   methods: {
      reset(){
         ///在这先存储好数据再初始化 防止两次创建的时候数据联动
         /*this.clocktype=0;
         this.showclock=0;
         this.showlabel=0;
         this.dateString1="";
         this.dateString2="";
         this.taskpriority="较低";
         this.tags=["任务"];*/
      },
      onChange1(value, dateString) {
         console.log('Selected Time: ', value);
         console.log('Formatted Selected Time: ', dateString);
         this.dateString1=dateString;
      },
      onChange2(value, dateString) {
         console.log('Selected Time: ', value);
         console.log('Formatted Selected Time: ', dateString);
         this.dateString2=dateString;
      },
      onOk(value) {
         console.log('onOk: ', value);
      },
      clearTime() {
        this.time1 = undefined;
      },
      pt(){
        this.taskpriority="普通";       
      },

      jj() {
          this.taskpriority="紧急";
      },

      fc(){
        this.taskpriority="非常紧急";
      },

      close() {
         var p = document.getElementById("panel1");
         p.setAttribute("activeKey", " ");
      },

      handleClose(removedTag) {
         const tags = this.tags.filter(tag => tag !== removedTag);
         console.log(tags);
         this.tags = tags;
      },

      showInput() {
         this.inputVisible = true;
         this.$nextTick(function() {
            this.$refs.input.focus();
         });
      },

      handleInputChange(e) {
         this.inputValue = e.target.value;
      },

      handleInputConfirm() {
         const inputValue = this.inputValue;
         let tags = this.tags;
         if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
         }
         console.log(tags);
         Object.assign(this, {
            tags,
            inputVisible: false,
            inputValue: ""
         });
      },
      log(e) {
         console.log(e);
      },
      preventDefault(e) {
         e.preventDefault();
         console.log("Clicked! But prevent default.");
      },
      disabledStartDate(startValue) {
         const endValue = this.endValue;
         if (!startValue || !endValue) {
            return false;
         }
         return startValue.valueOf() > endValue.valueOf();
      },
      disabledEndDate(endValue) {
         const startValue = this.startValue;
         if (!endValue || !startValue) {
            return false;
         }
         return startValue.valueOf() >= endValue.valueOf();
      },
      handleStartOpenChange(open) {
         if (!open) {
            this.endOpen = true;
         }
      },
      handleEndOpenChange(open) {
         this.endOpen = open;
      },
      afterVisibleChange(val) {
         console.log("visible", val);
      },
      showDrawer() {
         this.visible = true;
      },
      onClose() {
         this.visible = false;
      },
      handleChange(value) {
         console.log(`selected ${value}`);
      },
      showModal() {
         this.visible = true;
      },
      handleOk(e) {
         this.ModalText = 'The modal will be closed after two seconds';
         this.confirmLoading = true;
         setTimeout(() => {
            this.visible = false;
            this.confirmLoading = false;
         }, 0);        
         this.showclock=0;
      },
      handleCancel(e) {
         console.log('Clicked cancel button');
         this.visible = false;
         this.showclock=0;
         this.clocktype=0;
      },
   }
};
</script>

<style scoped>
#pending {
   width: 350px;
   margin-left: 50px;
}
#wrapper {
   display: flex;
   margin: 0 auto;
}
#process {
   width: 350px;
   margin-left: 50px;
}
#finish {
   width: 350px;
   margin-left: 50px;
}
#setclock{
   width:300px;
   height: 100px;
   margin-left:5px;
   margin-top:340px;
  
}
.em1 {
   font-style: normal;
   font-size: 16px;
   padding-left: 0px;
}
.em11 {
   font-style: normal;
   font-size: 15px;
   padding-left: 11px;
   color: gray;
   font-family: "Microsoft YaHei";
}
#components-button-demo-button-group > h4 {
   margin: 16px 0;
   font-size: 14px;
   line-height: 1;
   font-weight: normal;
}
#components-button-demo-button-group > h4:first-child {
   margin-top: 0;
}
#components-button-demo-button-group .ant-btn-group {
   margin-right: 8px;
}
</style>