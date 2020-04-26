<template>
   <div id="app">
      <header>口罩预约系统</header>
      <template>
         <div>
            <a-button type="primary">Primary</a-button>
            <a-button>Default</a-button>
            <a-button type="dashed">Dashed</a-button>
            <a-button type="danger">Danger</a-button>
            <a-config-provider :autoInsertSpaceInButton="false">
               <a-button type="primary">按钮</a-button>
            </a-config-provider>
            <a-button type="primary">按钮</a-button>
            <a-button type="link">Link</a-button>
         </div>
      </template>
   </div>
</template>

<script>

export default {
   name: "App",
   components: {},
   data() {
      return {
         router: 0
      };
   }
};
</script>

<style>

</style>
