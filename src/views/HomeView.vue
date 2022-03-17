<template>
  <div class="home">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    let ext = 'anythin';
    console.log('anything, setup', ext);
    return { ext };
  },
  components: {
    HelloWorld,
  },
});
</script>
