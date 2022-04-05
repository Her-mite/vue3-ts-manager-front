import { createStore } from 'vuex';

export default createStore({
  state: {
    siderCollapse: false, // 侧边栏是否收起， 默认展开
    tagList:[], // 导航标签数组
  },
  getters: {},

  // mutation不能有异步操作
  mutations: {
    getSiderCollapse(state, newValue: boolean){
      state.siderCollapse = newValue;
    },
    // 新增标签
    addTagItem(state, newValue){
      state.tagList.push(newValue);
    },
    // 删除标签
    removeTagItem(state, delIndex){
      state.tagList.splice(delIndex, 1);
    }
  },
  // 如果有异步操作那么就用action 来提交mutation
  actions: {
    setSiderCollapse(context, newValue: boolean){
      context.commit('getSiderCollapse', newValue);
    }
  },
  modules: {},
});
