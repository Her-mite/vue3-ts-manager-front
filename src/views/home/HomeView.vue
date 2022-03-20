<template>
  <div class="home">
    <!-- 头部 -->
    <HomeHeader />

    <!-- menu -->
    <div>siderbar</div>
    <router-view />

    <nav>
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <img alt="Vue logo" src="@/assets/logo.png" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomeHeader from './HomeHeader.vue';

export default defineComponent({
  setup() {
    let ext = 'anythin';
    console.log('anything, setup', ext);
    return { ext };
  },
  components: {
    HomeHeader,
  },
});
</script>
