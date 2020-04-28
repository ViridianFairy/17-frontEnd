<template>
<div id="wrapper">

    
  <div id="pending">
      <h2>待处理</h2>
  <div>
    

<div>
     <a-button block @click="$router.push('/details')">软件工程实践</a-button>
  </div>
<br />

  </div>
  <div>
    <a-collapse accordion id="panel1">
      <a-collapse-panel header="✚" key="1" :showArrow="false" >
        
    <a-input placeholder="输入任务标题" />
     

<!-- 菜单  -->
        <a-menu style="width: 350px;margin-left:-15px;margin-top:10px">
<!-- 执行者  -->
        <a-sub-menu key="sub1"  subMenuCloseDelay="2">
        <span slot="title">
        <a-icon type="user" style="fontSize:26px;color:#003366"/>
        <em class="em1">待认领</em></span>
        <a-menu-item key="4" style="width:300px;height:300px;">  
            

               
        </a-menu-item>


</a-sub-menu>
        </a-menu>
<a-input-search placeholder="搜索成员" style="width: 200px" @search="onSearch" />

<!-- 起止日期 -->
        <!--a-sub-menu key="subw">
        <span slot="title"-->
        <p style="margin-top:10px;"><a-icon type="calendar" style="fontSize:26px;color:#003366"/>
        <em class="em11">设置起止日期</em>
    
            
                <a-date-picker style="margin-top:10px;margin-bottom:5px;"
                :disabledDate="disabledStartDate"
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                v-model="startValue"
                placeholder="开始时间"
                @openChange="handleStartOpenChange"
                />
                <a-date-picker
                :disabledDate="disabledEndDate"
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="结束时间"
                v-model="endValue"
                :open="endOpen"
                @openChange="handleEndOpenChange"
                />
            
        </p>
       
<!-- 提醒   -->
        <!--<a-sub-menu key="sub3"  subMenuCloseDelay="20"></span> 
        <span slot="title"-->
         <p> <a-icon type="clock-circle" style="fontSize:26px;color:#003366"/>
        <em class="em11">提醒</em>
        <a><a-icon theme="filled" type="plus-circle" style="fontSize:26px;color:#003366;margin-left:13px"/>
        </a></p>
         <!--    
        <a-sub-menu key="sub3-1" title="提醒时间">
          <a-menu-item key="3-1-1">任务开始时</a-menu-item>
          <a-menu-item key="3-1-2">任务截止时</a-menu-item>
          <a-menu-item key="3-1-3">不提醒</a-menu-item>
              
        <a-sub-menu key="sub3-2" title="提醒对象"-->
        <p></p>              
        <div>
        <a-radio-group defaultValue="a" buttonStyle="solid">
        <a-radio-button value="a">任务开始时</a-radio-button>
        <a-radio-button value="b">任务截止时</a-radio-button>
        <a-radio-button value="c">不提醒</a-radio-button>
        </a-radio-group>
         </div>
        
             
        
        

<!-- 优先级   -->
        <!-- a-sub-menu key="sub4"  subMenuCloseDelay="2">
        <span slot="title"><a-icon type="fire" style="fontSize:26px;color:#003366"/>
        <em class="em1">优先级</em></span>
        <a-menu-item key="5">普通</a-menu-item>   
        <a-menu-item key="6">紧急</a-menu-item>
        <a-menu-item key="7">非常紧急</a-menu-item>    
        </a-sub-menu-->
        <p></p>
       <a-icon type="fire" style="fontSize:26px;color:#003366"/>
        <em class="em11">优先级</em><p></p>
        <div>
        <a-radio-group defaultValue="a" buttonStyle="solid">
        <a-radio-button value="normal">普通</a-radio-button>
        <a-radio-button value="mid">紧急</a-radio-button>
        <a-radio-button value="hard">非常紧急</a-radio-button>
        </a-radio-group>
         </div>
         
<!--  标签   -->
   
       <p></p>
       <a-icon type="tag" style="fontSize:26px;color:#003366"/>
        <em class="em11">标签</em><p></p>
      

        <div id="tags">
        <div>
           <template v-for="(tag, index) in tags">
          <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
        <a-tag :key="tag" :closable="index !== 0" @close="() => handleClose(tag)">
          {{ `${tag.slice(0, 20)}...` }}
        </a-tag>
      </a-tooltip>
      <a-tag v-else :key="tag" :closable="index !== 0" color="#003366" style="font-size:16px;text-align:center;height:25px" @close="() => handleClose(tag)">
        {{ tag }}
      </a-tag>
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
    <a-tag v-else @click="showInput" style="background:#fff;height:25px; borderStyle: dashed;margin-top:8px">
      <a-icon type="plus" /> <em style="font-size:15px;font-style:normal">添加标签</em>
    </a-tag>
  </div>
        
      </div>
  


<p></p>
        <br />
         <a-button style="font-size:16px;float:right;margin-left:20px" @click="close">取消</a-button>
         <a-button style="font-size:16px;float:right">创建</a-button>
        <br /><br /> 
         <Divider />
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
  data() {
    return {
      startValue: null,
      endValue: null,
      endOpen: false,
      visible: false,
      tags: ['任务'],
      inputVisible: false,
      inputValue: '',
    };
  },
    watch: {
    startValue(val) {
      console.log('startValue', val);
    },
    endValue(val) {
      console.log('endValue', val);
    },
  },
  
        
  methods: {


    close(){
      var p=document.getElementById("panel1");
      p.setAttribute('activeKey',' ');
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
        inputValue: '',
      });
    },
    log(e) {
      console.log(e);
    },
    preventDefault(e) {
      e.preventDefault();
      console.log('Clicked! But prevent default.');
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
      console.log('visible', val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
  },
  
};

</script>

<style scoped>
#pending{
    width:350px;
    margin-left: 20px;
    float: left;
    
}
#process{
    width:350px;
    float: left;
    margin-left: 70px;
    
}
#finish{
    width:350px;
    float: right;
    margin-right:40px
}
.em1{
    font-style: normal;
    font-size: 16px;
    padding-left: 0px;
}
.em11{
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