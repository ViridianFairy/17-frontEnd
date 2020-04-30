<template>
   <div id="wrapper">
      <section>
         <div>待处理</div>
         <a-button type="primary">Primary</a-button>
         <a-button>Default</a-button>
         <a-button type="dashed">Dashed</a-button>
         <a-button type="danger">Danger</a-button>
         <a-config-provider :autoInsertSpaceInButton="false">
            <a-button type="primary">按钮</a-button>
         </a-config-provider>
         <a-button type="primary">按钮</a-button>
         <a-button type="link">Link</a-button>
      </section>
      <section>
         <div>进行中</div>
         <a-button type="primary" loading>Loading</a-button>
         <a-button type="primary" size="small" loading>Loading</a-button>
         <br />
         <a-button type="primary" :loading="loading" @mouseenter="enterLoading">mouseenter me!</a-button>
         <a-button
            type="primary"
            icon="poweroff"
            :loading="iconLoading"
            @click="enterIconLoading"
         >延迟1s</a-button>
         <br />
         <a-button type="primary" loading />
         <a-button type="primary" shape="circle" loading />
         <a-button type="danger" shape="round" loading />
      </section>
      <section>
         <div>已完成</div>
         <a-button type="primary" loading>Loading</a-button>
         <a-button type="primary" size="small" loading>Loading</a-button>
         <br />
         <a-button type="primary" :loading="loading" @mouseenter="enterLoading">mouseenter me!</a-button>
         <a-button
            type="primary"
            icon="poweroff"
            :loading="iconLoading"
            @click="enterIconLoading"
         >延迟1s</a-button>
         <br />
         <a-button type="primary" loading />
         <a-button type="primary" shape="circle" loading />
         <a-button type="danger" shape="round" loading />
      </section>
   </div>
</template>

<script>
export default {
   name: "Tasks",
   components: {},
   data() {
      return {
         loading: false,
			iconLoading: false,
			value: '',
      	dataSource: []
      };
   },
   methods: {
      enterLoading() {
         this.loading = true;
      },
      enterIconLoading() {
         this.iconLoading = { delay: 1000 };
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


