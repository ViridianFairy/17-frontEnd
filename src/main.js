const baseURL = 'http://funx.pro:3001/api'
import Vue from 'vue'
import App from './App.vue'
import Alert from './components/attach/alert'
import 'ant-design-vue/dist/antd.css'
import {Button, Divider, Radio, Switch} from 'ant-design-vue'
import {Input} from 'ant-design-vue'
import {Collapse} from 'ant-design-vue'
import {Checkbox} from 'ant-design-vue'
import {Menu} from 'ant-design-vue'
import {Avatar} from 'ant-design-vue'
import {Icon} from 'ant-design-vue'
import {DatePicker,PageHeader} from 'ant-design-vue'
import {Dropdown,Select,Drawer,Tag} from 'ant-design-vue'
import router from './js/router'
import axios from 'axios'
import Cookies from 'js-cookie'
import store from './js/store'
Vue.config.productionTip = false
// ant-design
Vue.component(Button.name, Button)
Vue.component(Icon.name, Icon)
Vue.component(Input.name, Input)
Vue.component(Collapse.name, Collapse)
Vue.component(Checkbox.name, Checkbox)
Vue.component(Menu.name, Menu)
Vue.component(Avatar.name, Avatar)
Vue.component(DatePicker.name, DatePicker)
Vue.component(Dropdown.name,Dropdown)
Vue.component(Divider.name,Divider)
Vue.component(Select.name,Select)
Vue.component(Drawer.name,Drawer)
Vue.component(Radio.name,Radio)
Vue.component(Tag.name,Radio)
Vue.component(PageHeader.name,PageHeader)
Vue.component(Switch.name,Switch)
Vue.use(Button)
Vue.use(Input)
Vue.use(Collapse)
Vue.use(Avatar)
Vue.use(Icon)
Vue.use(Menu)
Vue.use(DatePicker)
Vue.use(Dropdown)
Vue.use(Divider)
Vue.use(Select)
Vue.use(Drawer)
Vue.use(Radio)
Vue.use(Tag)
Vue.use(PageHeader)
Vue.use(Switch)



// plugins mounted
Vue.prototype.$cookies = Cookies;
Vue.prototype.$http = axios.create({baseURL})
//Vue.prototype.$httpTest = axios.create({'baseURL'})
// init
new Vue({
	render: h => h(App),
	router,
	store
}).$mount('#app')
// tips
//Vue.prototype.$alertNum = 0;
const alertBox = Vue.extend(Alert)
Vue.prototype.$alert = function(msg, type, Obj) {
	if (document.getElementsByClassName('alert').length >= 2 && !type.match('overload')) return
	if (type == '') type = 'true'
	var a = new alertBox({
		data: {
			msg: msg,
			type: type,
			visible: false,
			mouse: Obj ? Obj : {x: 0, y: 0}
		}
	}).$mount()
	document.body.appendChild(a.$el)
	setTimeout(() => {
		document.body.removeChild(a.$el)
	}, 1700)
}
