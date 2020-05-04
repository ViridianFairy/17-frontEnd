import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const mutations = {
   bannerReload(state, obj){
		state.banner.name = obj.name
	},
   loginReload(state, bool){
		state.login = bool
	}
}
const state = {
		banner:{
			name:"未登录",
			avatar:""
		},
		login:false
   }
const vuex = new Vuex.Store({
   state,
	mutations,
	
});
export default vuex;
