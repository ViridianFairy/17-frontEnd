<template>
<div id="wrapper">
   <p style="margin-left:78px;margin-top:30px;font-size:25px" >创建日程</p>
<div id="all">
<div id="more">  
<div id="iconleft">
   <a-icon type="edit" style="fontSize:28px;color:#003366;margin:15px;"/>
   <a-icon type="calendar" style="fontSize:28px;color:#003366;margin:15px;"/>
   <a-icon type="clock-circle" style="fontSize:28px;color:#003366;margin:15px;"/>
   <a-icon type="pushpin" style="fontSize:28px;color:#003366;margin:15px;"/>
   <a-icon type="tag" style="fontSize:28px;color:#003366;margin:15px;"/>
</div>
<div id="contentright">
   <a-input placeholder="填写日程内容" autoSize allowClear size="large"/>
   <a-date-picker @change="onChange" style="margin-top:20px;" size="large" placeholder="请选择日期"/>
   <p></p>
   <a-date-picker
      :mode="mode1"
      showTime
      @openChange="handleOpenChange1"
      @panelChange="handlePanelChange1"
      placeholder="请选择提醒时间"
      size="large"
      style="margin-top:5px"
    />
    <p></p>
   <a-input placeholder="填写备注" autoSize allowClear size="large" style="margin-top:5px"/>
   <p></p>
   <div id="tags">
        <div>
           <template v-for="(tag, index) in tags">
          <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
        <a-tag :key="tag" :closable="index !== 0" @close="() => handleClose(tag)">
          {{ `${tag.slice(0, 20)}...` }}
        </a-tag>
      </a-tooltip>
      <a-tag v-else :key="tag" :closable="index !== 0" color="#003366" style="font-size:18px;text-align:center;height:25px;margin-top:10px" @close="() => handleClose(tag)">
        {{ tag }}
      </a-tag>
    </template>
    <a-input
      v-if="inputVisible"
      ref="input"
      type="text"
      size="large"
      :style="{ width: '78px' }"
      :value="inputValue"
      @change="handleInputChange"
      @blur="handleInputConfirm"
      @keyup.enter="handleInputConfirm"
    />    
    <a-tag v-else @click="showInput" style="background:#fff; height:25px;borderStyle: dashed">
      <a-icon type="plus" /> <em style="font-size:18px;font-style:normal">添加标签</em>
    </a-tag>
  </div>      
</div>    
</div>   
</div>
<a-button @click="$router.push('/schedule')" style="float:right;margin-left:30px">取消</a-button>
<a-button style="float:right">添加</a-button>
</div>
</div>
</template>

        
    
<script>
export default {
   name: "ScheduleDetails",
   components: {},
   data() {
      return {
         mode1: 'time',
         tags: ['标签'],
         inputVisible: false,
         inputValue: '',
      };
   },   
   methods: {
    onChange(date, dateString) {
      console.log(date, dateString);
    },
    handleOpenChange1(open) {
      if (open) {
        this.mode1 = 'time';
      }
    },
    handlePanelChange1(value, mode) {
      this.mode1 = mode;
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
  },
};
</script>


<style scoped>
#all{   
    margin: 40px 40px;
    background-color:	white;
    height: 500px;  
    width:500px;
} 
#more{
   display: flex;
}
#iconleft{
   margin-left: 20px;
   width: 70px;
}
#contentright{
   width: 500px;
   height: 300px;
   margin-top:10px;
}
</style>