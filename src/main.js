import Vue from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import { Button } from 'ant-design-vue';

Vue.config.productionTip = false
Vue.component(Button.name, Button);
Vue.use(Button)

new Vue({
  render: h => h(App),
}).$mount('#app')

import Alert from "./components/alert";
const alertBox = Vue.extend(Alert);
//Vue.prototype.$alertNum = 0;
Vue.prototype.$alert = function(msg, type, Obj) {
   if (document.getElementsByClassName('alert').length >= 2 && !type.match('overload')) return;
   if (type == "") type = "true";
   var a = new alertBox({
      data: {
         msg: msg,
         type: type,
         visible: false,
         mouse:Obj?Obj:{x:0,y:0},
      }
   }).$mount();
   document.body.appendChild(a.$el);
   setTimeout(()=>{
      document.body.removeChild(a.$el);
   },1700)
};
