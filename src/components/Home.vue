<template>
   <div>
        <div id="add-button">
            <a-button>新建项目</a-button>
        </div>
        <div id="join-text">已加入项目</div>
   </div>
</template>

<script>
export default {
   name: "Home",
   components: {},
   data() {
      return {

      };
	},
   mounted(){
   },
   methods: {
		
   },
};
</script>



<style scoped>
#join-text{
    font-size: 20px;
    margin-top: 5%;
}
#add-button{
    margin-right: 170px;
    float: right;
}
</style>