<template>
  <div class="home">
    <!-- 头部 -->
    <HomeHeader />

    <!-- 侧边菜单栏 -->
    <HomeSider />

    <div class="content-box" :class="{ 'content-collapse': siderCollapse }">
      <home-tag></home-tag>
      <div class="content">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import HomeHeader from './HomeHeader.vue';
import HomeSider from './HomeSider.vue';
import HomeTag from './HomeTag.vue';
import $store from '@/store/index';

export default defineComponent({
  setup() {
    const siderCollapse = computed(() => {
      return $store.state.siderCollapse;
    });

    return { siderCollapse };
  },
  components: {
    HomeHeader,
    HomeSider,
    HomeTag,
  },
});
</script>

<style>
.content-box {
  position: absolute;
  left: 220px;
  right: 0;
  top: 55px;
  bottom: 0;
  padding-bottom: 30px;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
}
.content-collapse {
  left: 65px;
}

.content {
  width: auto;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 10px;
}
</style>
