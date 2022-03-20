<template>
  <!-- 头部最高导航栏 -->
  <div class="header">
    <!-- 系统相关信息展示 -->
    <div class="system-info">
      <img
        class="system-logo"
        src="@/assets/system-logo.png"
        alt="system-logo"
      />
      <div class="system-title">秘密花园</div>

      <div class="collapse-btn" @click="collapseChage">
        <i v-if="collapse" class="iconfont icon-a-AlignFromRight"></i>
        <i v-else class="iconfont icon-a-AlignFromLeft"></i>
      </div>
    </div>

    <!-- 用户信息 -->
    <div class="user-info">用户信息</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    let collapse = ref<boolean>(false);
    return { collapse };
  },

  components: {},
});
</script>
<style scoped>
.header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #f56c6c;
  padding-top: 5px;
  display: flex;
  justify-content: space-between;
}
.system-info {
  height: 40px;
  width: 250px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.system-logo {
  width: 40px;
}
.system-title {
  line-height: 40px;
  font-size: 22px;
  text-align: left;
  margin: 0 30px 0 20px;
}

.collapse-btn {
  line-height: 40px;
}

.user-info {
  line-height: 40px;
  margin-right: 40px;
}
</style>
