<template>
  <div class="tags">
    <ul>
      <li
        class="tags-li"
        v-for="(item, index) in tagList"
        :class="{'active': isActive(item.path)}"
        :key="index"
      >
        <router-link :to="item.path" class="tags-li-title">{{
          item.title
        }}</router-link>
        <span class="tags-li-icon" @click="closeTag(index)">
          <i class="icon-guanbi-1 tags-li-icon"></i>
          
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { onBeforeRouteUpdate,  useRoute, useRouter } from 'vue-router';
import { tagItem } from '@/utils/interface';

export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const tagList = computed(()=>{
      return store.state.tagList;
    });
    const isActive = (path: string) => {
      return path === route.fullPath;
    };
    

    // 新增标签
    const addTagItem = (tagItem: tagItem) => {
      // 判断当前需要新增标签是否已有
      const isExist = tagList.value.some((item: tagItem) =>{
        return item.path === tagItem.path;
      });
      if(!isExist && tagItem.title){
        if(tagList.value.length >= 8){
          store.commit('removeTagItem', 0);
        }        
        store.commit('addTagItem', tagItem);
      }
    };

    // 关闭标签 
    const closeTag = (index: number) => {
      const removeItem = tagList.value[index];
      store.commit('removeTagItem', index);

      // 获取元素删除后的最后一个标签
      const item = tagList.value[index]
        ? tagList.value[index]
        : tagList.value[index - 1];
      if (item) {
        // 当前标签删除时，路由转发到上一个标签
        removeItem.path === route.fullPath && router.push(item.path);
      } else {
        // 最后一个标签被删除， 返回首页
        router.push('/home');
      }
    };


    // 页面首次加载渲染
    const tagItem = {
      name: route.name ,
      title: route.meta.title,
      path: route.fullPath
    };
    addTagItem(tagItem);

    // 路由跳转前执行
    onBeforeRouteUpdate((to) => {
      const routeTagItem = {
        name: to.name ,
        title: to.meta.title,
        path: to.fullPath
      };      
      addTagItem(routeTagItem);
    });

    return {tagList, isActive, closeTag};
  },
});
</script>

<style scoped>
.tags {
    position: relative;
    height: 30px;
    overflow: hidden;
    background: #f0f0f0;
    padding-right: 120px;
    box-shadow: 0 5px 10px #ddd;
}

.tags ul {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}

.tags-li {
    float: left;
    margin: 3px 5px 2px 3px;
    border-radius: 3px;
    font-size: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 23px;
    line-height: 23px;
    border: 1px solid #e9eaec;
    background: #fff;
    padding: 0 0 0 12px;
    vertical-align: middle;
    color: #666;
    -webkit-transition: all 0.3s ease-in;
    -moz-transition: all 0.3s ease-in;
    transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
    background: #f8f8f8;
}

.tags-li.active {
    color: #fff;
    border: 1px solid #409EFF;
    background-color: #409EFF;
}

.tags-li-title {
    float: left;
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    color: #666;
}

.tags-li.active .tags-li-title {
    color: #fff;
}

.tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    width: 110px;
    height: 30px;
    background: #fff;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
    z-index: 10;
}
.tags-li-icon {
  font-size: 18px;
}
</style>
