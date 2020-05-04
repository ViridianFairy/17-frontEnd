import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const mutations = {
   bannerReload(state, obj){
		state.banner.name = obj.name
	}
}
const state = {
		banner:{
			name:"未命名",
			avatar:""
		}
   }
const vuex = new Vuex.Store({
   state,
   mutations
});
export default vuex;
