<template>
   <div>
        <div id="add-button">
            <a-button @click="showCreateModal">新建项目</a-button>
            <a-modal v-model="createVisible" title="创建新项目" on-ok="handleOk">
                <template slot="footer">
                    <a-button key="back" @click="createHandleCancel">取消</a-button>
                    <a-button
                        key="submit"
                        type="primary"
                        :loading="createLoading"
                        @click="createHandleOk"
                    >创建</a-button>
                </template>
                    请输入项目名：
                <a-input style="width: 300px" placeholder v-model="newName" />
            </a-modal>
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
        createVisible: false,
        createLoading: false,
        newName: "",
      };
	},
   mounted(){
   },
   methods: {
    showCreateModal() {
        this.createVisible = true;
    },
    createHandleOk(e) {
        this.createLoading = true;
        this.$http.post(`/api/project`, { name: this.newName }).then(doc => {
            var code = doc.data.status;
            var msg = doc.data.msg;
            if (code != 0) {
               this.$alert(msg, "false");
               this.createLoading = false;
            } else {
               this.createVisible = false;
               this.createLoading = false;
            }
        });
    },
    createHandleCancel(e) {
        this.createVisible = false;
    },
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