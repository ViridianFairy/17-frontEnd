<template>
   <div id="wrapper">
      <div id="pending">
         <h2>待处理</h2>
         <div>
            <div>
               <a-button block @click="$router.push('/taskDetails')">软件工程实践</a-button>
            </div>
            <br />
         </div>
         <div>
            <a-collapse accordion id="panel1">
               <a-collapse-panel header="✚" key="1" :showArrow="false">
                  <a-input placeholder="输入任务标题" />

                  <!-- 菜单  -->
                  

                <p style="margin-top:20px">
                     <a-avatar :size="35" icon="user" />
                     <em class="em11">用户</em>
                  </p>


                  <!--<a-menu style="width: 350px;margin-left:-15px;margin-top:10px">
                  
                     <a-sub-menu key="sub1" subMenuCloseDelay="2">
                        <span slot="title">
                            <a-avatar :size="35" icon="user" />
                           <em class="em1" style="margin-left:10px;" >XXX</em>
                        </span>
								<!-- style="width:300px;height:300px;" 
                        <a-menu-item key="4" >
									<a @click.stop="log('1')" >啊啊啊啊1</a>
								</a-menu-item>
                        <a-menu-item key="6" >
									<a @click.stop="log('2')" >啊啊啊啊2</a>
								</a-menu-item>
                        <a-menu-item key="5">
									<a-input-search placeholder="搜索成员" @click.stop="log('3')"
									style="width: 200px" @search="" />
								</a-menu-item>
                     </a-sub-menu>
                  </a-menu>
                  -->

                  <!-- 起止日期 -->
                  <!--a-sub-menu key="subw">
                  <span slot="title"-->
                 
                     <a-icon type="calendar" style="fontSize:26px;color:#003366;margin-left:4px" />
                     <a-date-picker
                        style="margin-top:-10px;margin-bottom:5px;margin-left:10px;"
                        :disabledDate="disabledStartDate"
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        v-model="startValue"
                        placeholder="开始时间"
                        @openChange="handleStartOpenChange"
                     /><br />
                     <a-icon type="calendar" style="fontSize:26px;color:#003366;margin-left:4px" />
                     <a-date-picker
                        style="margin-top:-10px;margin-bottom:5px;margin-left:10px;"
                        :disabledDate="disabledEndDate"
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="结束时间"
                        v-model="endValue"
                        :open="endOpen"
                        @openChange="handleEndOpenChange"
                     />
                

                  <!-- 提醒   -->
                  <!--<a-sub-menu key="sub3"  subMenuCloseDelay="20"></span> 
                  <span slot="title"--><br />
                  <a-menu style="width: 340px;margin-left:10x;margin-top:-5px;margin-right:-20px" subMenuCloseDelay="2">
                       <a-sub-menu key="sub1">
                            <span slot="title"><a-icon type="clock-circle" style="fontSize:26px;color:#003366;margin-left:-12px" />
                            <em class="em11" style="padding-left:0">不提醒</em></span>
                               <a-menu-item key="1" @click.stop="log('1')" style="width:200px;height:50px">
                                 <p>提醒时间
                                 <a-select style="width: 120px" @change="handleChange"  @click.stop="log('3')">
                                  <a-select-option value="begin" >
                                    任务开始时
                                  </a-select-option>
                                  <a-select-option value="end">
                                    任务截止时
                                  </a-select-option>
                                </a-select><a-divider />
					                      </p>
								                </a-menu-item>                               
                                  <a-menu-item key="5" @click.stop="log('2')">
                                      <p>提醒对象</p>    
                                  </a-menu-item>
       
                                </a-sub-menu>     
               
                  <!--    
        <a-sub-menu key="sub3-1" title="提醒时间">
          <a-menu-item key="3-1-1">任务开始时</a-menu-item>
          <a-menu-item key="3-1-2">任务截止时</a-menu-item>
          <a-menu-item key="3-1-3">不提醒</a-menu-item>
              
                  <a-sub-menu key="sub3-2" title="提醒对象"-->
                  

                  <!-- 优先级   -->
                  <a-sub-menu key="sub4"  subMenuCloseDelay="2" style="margin-top:-10px">
                  <span slot="title"><a-icon type="fire" style="fontSize:26px;color:#003366;margin-left:-12px"/>
                  <a-tag v-if="taskpriority=='普通'" color="green" :visible="true" style="font-size:16px;height:25px;margin-left:0px;">
                      普通
                  </a-tag> 
                  <a-tag v-if="taskpriority=='紧急'" color="orange" :visible="true" style="font-size:16px;height:25px;margin-left:0px;">
                      紧急
                  </a-tag> 
                  <a-tag v-if="taskpriority=='非常紧急'" color="red" :visible="true" style="font-size:16px;height:25px;margin-left:0px;">
                      非常紧急
                  </a-tag>                  
                  </span>
                  <a-menu-item key="5" @click="pt">
                    <a-tag color="green" style="font-size:16px;height:25px;margin-left:0px">
                      普通
                    </a-tag>
                    </a-menu-item>   
                  <a-menu-item key="6" @click="jj">
                    <a-tag color="orange" style="font-size:16px;height:25px;margin-left:0px">
                      紧急
                    </a-tag>
                  </a-menu-item>
                  <a-menu-item key="7" @click="fc">
                    <a-tag color="red" style="font-size:16px;height:25px;margin-left:0px">
                      非常紧急
                    </a-tag>  
                  </a-menu-item>    
                  </a-sub-menu>
                  </a-menu>

                  <!--  标签   -->

                
                  <a-icon type="tag" style="fontSize:26px;color:#003366;margin-left:4px" />
                  <em class="em11" >标签</em>
                  <div id="tags">
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
                              style="font-size:16px;text-align:center;height:25px"
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
                           style="background:#fff;height:25px; borderStyle: dashed;margin-top:8px"
                        >
                           <a-icon type="plus" />
                           <em style="font-size:15px;font-style:normal">添加标签</em>
                        </a-tag>
                     </div>
                  </div>
                  <a-divider style="margin-top:15px"/>
                  <p style="margin-top:-15px;font-size:16px;margin-left:5px">参与者 · 1</p>
                  
                     <a-avatar :size="35" icon="user" style="margin-top:-18px" />
                     <!--a-popover title="添加参与者">
                        
                    
                     </a-popover-->
                     <a><a-icon type="plus-circle" theme="filled" style="fontSize:35px;color:#003366;margin-left:10px;"/><br />
                     </a>
                  <a-button style="font-size:16px;float:right;margin-left:20px" @click="onClose">取消</a-button>
                  <a-button style="font-size:16px;float:right">创建</a-button>
                  <br />
                  <br />
                
               </a-collapse-panel>
            </a-collapse>
         </div>
      </div>
      <div id="process">
         <h2>进行中</h2>
         <div>
            <a-collapse accordion>
               <a-collapse-panel header="✚" key="2" :showArrow="false">
                  <p>{{ text }}</p>
               </a-collapse-panel>
            </a-collapse>
         </div>
      </div>
      <div id="finish">
         <h2>已完成</h2>
         <div>
            <a-collapse accordion>
               <a-collapse-panel header="✚" key="3" :showArrow="false">
                  <p>{{ text }}</p>
               </a-collapse-panel>
            </a-collapse>
         </div>
      </div>
   </div>
</template>
<script>

export default {
	name:"TaskPanel",
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
        taskpriority:"普通",
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
      }
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
.em1 {
   font-style: normal;
   font-size: 16px;
   padding-left: 0px;
}
.em11 {
   font-style: normal;
   font-size: 16px;
   padding-left: 11px;
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