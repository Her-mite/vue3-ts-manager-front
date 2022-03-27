<template>
  <div class="home">
    <!-- 头部 -->
    <HomeHeader />

    <!-- menu -->
    <HomeSider/>

    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomeHeader from './HomeHeader.vue';
import HomeSider from './HomeSider.vue';

export default defineComponent({
  setup() {
    return {};
  },
  components: {
    HomeHeader,
    HomeSider
  },
});
</script>
