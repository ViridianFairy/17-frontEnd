<template>
<div id="wrapper">

    
  <div id="pending">
      <h2>待处理</h2>
  <div>
    <a-collapse accordion>
      <a-collapse-panel header="✚" key="1" :showArrow="false" >
        
    <a-input placeholder="输入任务标题" />
     

<!-- 菜单  -->
        <a-menu style="width: 350px;margin-left:-15px;margin-top:10px">
<!-- 执行者  -->
        <a-sub-menu key="sub1"  subMenuCloseDelay="2">
        <span slot="title">
        <a-icon type="user" style="fontSize:26px;color:#003366"/>
        <em class="em1">待认领</em></span>
        <a-menu-item key="4">  
            <a-input-search placeholder="搜索成员" style="width: 200px" @search="onSearch" />

        </a-menu-item>       
        </a-sub-menu>

<!-- 起止日期 -->
        <a-sub-menu key="subw">
        <span slot="title"><a-icon type="calendar" style="fontSize:26px;color:#003366"/>
        <em class="em1">设置起止日期</em></span>
        <a-menu-item key="3">
            <div>
                <a-date-picker
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
            </div>
        </a-menu-item>
        </a-sub-menu>

<!-- 提醒   -->
        <a-sub-menu key="sub3"  subMenuCloseDelay="20">
        <span slot="title"><a-icon type="clock-circle" style="fontSize:26px;color:#003366"/>
        <em class="em1">提醒</em></span>  
             
        <a-sub-menu key="sub3-1" title="提醒时间">
          <a-menu-item key="3-1-1">任务开始时</a-menu-item>
          <a-menu-item key="3-1-2">任务截止时</a-menu-item>
          <a-menu-item key="3-1-3">不提醒</a-menu-item>
        </a-sub-menu>       
        <a-sub-menu key="sub3-2" title="提醒对象">
        </a-sub-menu>               
        
             
        
        </a-sub-menu>

<!-- 优先级   -->
        <a-sub-menu key="sub4"  subMenuCloseDelay="2">
        <span slot="title"><a-icon type="fire" style="fontSize:26px;color:#003366"/>
        <em class="em1">优先级</em></span>
        <a-menu-item key="5">普通</a-menu-item>   
        <a-menu-item key="6">紧急</a-menu-item>
        <a-menu-item key="7">非常紧急</a-menu-item>    
        </a-sub-menu>
<!--  标签   -->
        <a-sub-menu key="sub5"  subMenuCloseDelay="2">
        <span slot="title"><a-icon type="tag" style="fontSize:26px;color:#003366"/>
        <em class="em1">标签</em></span>
        <a-menu-item key="6">  
        <a-input-search placeholder="搜索标签" style="width: 200px" @search="onSearch" />
        </a-menu-item>       
        </a-sub-menu>
        </a-menu>       
        <br />
         <a-button style="font-size:16px;float:right;margin-left:20px">取消</a-button>
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