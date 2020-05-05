<template>
   <div id="wrapper">
      <!-- <a-button @click="showConfirm">Confirm</a-button> -->
   </div>
</template>

<script>
import {Modal} from 'ant-design-vue'
export default {
   name: "Tasks",
   components: {},
   data() {
      return {
         loading: false,
         iconLoading: false,
         value: "",
         dataSource: []
      };
   },
   methods: {
      enterLoading() {
         this.loading = true;
      },
      enterIconLoading() {
         this.iconLoading = { delay: 1000 };
      },
      showConfirm() {
         Modal.confirm({
            title: "Do you want to delete these items?",
            content:
               "When clicked the OK button, this dialog will be closed after 1 second",
            onOk() {
               return new Promise((resolve, reject) => {
                  setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
               }).catch(() => console.log("Oops errors!"));
            },
            onCancel() {}
         })
      }
   }
};
</script>

<style scoped>
#wrapper {
   display: flex;
}
section > div:nth-child(1) {
   font-size: 17px;
   font-weight: bold;
   margin-bottom: 10px;
}
</style>


