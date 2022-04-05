<template>
  <div class="home">
    <!-- 头部 -->
    <HomeHeader />

    <!-- 侧边菜单栏 -->
    <HomeSider />

    <div class="content-box">
      <home-tag></home-tag>
      <div class="content">
      <router-view />

      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomeHeader from './HomeHeader.vue';
import HomeSider from './HomeSider.vue';
import HomeTag from './HomeTag.vue';

export default defineComponent({
  setup() {
    return {};
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
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
}

.content {
    width: auto;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
}
</style>
