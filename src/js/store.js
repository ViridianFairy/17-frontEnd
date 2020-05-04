import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const mutations = {
   bannerReload(state, obj){
		state.banner.name = obj.name
	},
   loginReload(state, bool){
		state.login = bool
	},
   projectReload(state, obj){
		state.project.id = obj.id
		state.project.name = obj.name
	},
	userUpdate(state){
		state.userUpdate++
	}
}
const state = {
		banner:{
			name:"未登录",
			avatar:""
		},
		login:false,
		userUpdate:0,
		project:{
			id:"",
			name:""
		}
   }
const vuex = new Vuex.Store({
   state,
	mutations,
	
});
export default vuex;
