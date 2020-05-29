<template>
    <div id="wrapper">
        <p style="margin-left:35px;margin-top:25px;font-size:25px" >项目成员</p>
        <a-divider style="margin-top:10px"/>
    
    <div id="post">
        <a-icon type="plus-circle"  size="large"/>邀请新成员
    </div>    
    </div>
</template>

<script>
export default {
   name: "Post",

   components: {},
   data() {
      return {
        
      };
   },

   methods:{
     
    },
     
    
   
};
</script>

<style scoped>

#post{
    margin-left:40px;
    height: 340px;
    overflow-y: scroll;
    margin-top:-25px;
}
#send{
    height:135px;

}
</style>