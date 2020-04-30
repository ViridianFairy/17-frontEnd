<template>
<div id="wrapper">
<div id="more">
   <p style="margin-left:35px;margin-top:30px;font-size:25px" >创建日程</p>
   <div id="iconleft">
   <a-icon type="edit" style="fontSize:28px;color:#003366;margin:15px;"/>
   <a-icon type="calendar" style="fontSize:28px;color:#003366;margin:15px;"/>
   <a-icon type="clock-circle" style="fontSize:28px;color:#003366;margin:15px;"/>
   <a-icon type="pushpin" style="fontSize:28px;color:#003366;margin:15px;"/>
   <a-icon type="tag" style="fontSize:28px;color:#003366;margin:15px;"/>
   </div>

   
   
   <!---a-input placeholder="填写日程内容" autoSize allowClear /
   <a-date-picker @change="onChange" />
   
   --->
   
   
</div>
</div>
</template>

        
    
<script>
export default {
   name: "ScheduleDetails",
   components: {},
   data() {
      return {
      };
   },   
};
</script>


<style scoped>
#more{   
    margin: 40px 40px;
    background-color:	white;
    height: 600px;
} 
#iconleft{
   margin-left: 20px;
   margin-right: 10px;
   width: 70px;
}
</style>