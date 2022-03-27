import { createStore } from 'vuex';

export default createStore({
  state: {
    siderCollapse: false, // 侧边栏是否收起， 默认展开
  },
  getters: {},
  mutations: {
    getSiderCollapse(state, newValue: boolean){
      state.siderCollapse = newValue;
    }
  },
  actions: {
    setSiderCollapse(context, newValue: boolean){
      context.commit('getSiderCollapse', newValue);
    }
  },
  modules: {},
});
