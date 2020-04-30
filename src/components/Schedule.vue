<template>
<div id="wrapper">
<div id="more">
    <a-button block size="large" @click="$router.push('/scheduleAdd')">添加日程</a-button>
    <p><br /><br /></p>
    <a-divider>过去的日程</a-divider>
    <p><br /><br /></p>
    <a-collapse v-model="activeKey">
    <!--   数据需要部分 以下为模拟  ---->
      <a-collapse-panel header="2020年4月" key="1">
          <div class="content">
              <p>4月26日<em>团队alpha冲刺</em></p>
              <a-divider/>
              <p>4月18日<em>数据库设计</em></p>
              <a-divider />
              <p>4月2日<em>类图分析</em></p>
          </div>
      </a-collapse-panel>
      <a-collapse-panel header="2020年3月" key="2">
        <div class="content">
              <p>3月29日<em>构件设计</em></p>
              <a-divider/>
              <p>3月18日<em>原型制作</em></p>
          </div>
      </a-collapse-panel>
      <a-collapse-panel header="2020年2月" key="3">
        <div class="content">
              <p>2月20日<em>需求分析</em></p>
          </div>
      </a-collapse-panel>
    </a-collapse>
</div>

</div>
    
    
    



</template>

        
    
<script>
export default {
   name: "Schedule",
   components: {},
   data() {
      return {
        customStyle:
        'background: gray;border-radius: 8px;margin-bottom: 50px;border:10;',
      };
   },   
};
</script>


<style scoped>
#more{   
    margin: 25px 40px;
    background-color:	white;
    height: 500px;
} 
em{
    padding-left:40px;
    font-style: normal;
}
.content{
    margin:0 auto;
    margin-left: 24px;
}
p{
    font-size: 15px;
    margin:-8px 0;
}
</style>