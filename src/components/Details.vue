<template>
   <div id="wrapper">
    
       <div id="more">
      <a-page-header
    style="border-bottom: 2px solid white"
    @back="$router.push('/taskPanel')"
    title="任务详情"
  />
  <p style="margin-left:35px;margin-top:30px;font-size:25px" >任务：软件工程实践</p>
  <div id="contextleft">
  <p>
    <a-icon type="file-done" style="fontSize:30px;color:#003366;margin-top:10px;vertical-align:bottom"/>
    <em class="em11">状态</em><br />

    <a-icon type="user" style="fontSize:30px;color:#003366;margin-top:30px;vertical-align:bottom"/>
    <em class="em11">执行者</em><br />
    
    <a-icon type="calendar" style="fontSize:30px;color:#003366;margin-top:30px;vertical-align:bottom"/>
    <em class="em11">执行时间</em><br />

    <a-icon type="pushpin" style="fontSize:30px;color:#003366;margin-top:30px;vertical-align:bottom"/>
    <em class="em11">备注</em><br />

    <a-icon type="fire" style="fontSize:30px;color:#003366;margin-top:30px;vertical-align:bottom"/>
    <em class="em11">优先级</em><br />

    <a-icon type="tag" style="fontSize:30px;color:#003366;margin-top:30px;vertical-align:bottom"/>
    <em class="em11">标签</em><br />
    
    
    
    
  </p>       </div>
       </div> 
   </div>
</template>
<script>
export default {
   name: "Details",
   components: {},
   data() {
      return {};
   },   
};
</script>
<style scoped>
#more{   
    margin: 25px 40px;
    background-color: 	rgba(243, 243, 243, 0.753);
    height: 600px;
}
#contextleft{
    margin: 30px 35px;
    width:400px;
}
.em11{
    font-style: normal;
    font-size: 18px;
    padding-left: 11px; 
    
}
</style>