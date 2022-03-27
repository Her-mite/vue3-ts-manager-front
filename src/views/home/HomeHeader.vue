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

      <div class="collapse-btn" @click="collapseChange">
        <i v-if="siderCollapse" class="iconfont icon-a-AlignFromLeft"></i>
        <i v-else class="iconfont icon-a-AlignFromRight"></i>
      </div>
    </div>

    <!-- 用户信息 -->
    <div class="user-info">
      <div class="user-avator">
        <img src="@/assets/img/user-avatar.jpg" />
      </div>
      <!-- 用户下拉菜单 -->
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ user_name }}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            <el-dropdown-item command="aboutMe">我的</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { deleteCookie, getCookie } from '@/utils/cookie';
import { defineComponent, computed } from 'vue';
import $store from '@/store/index';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();

    const user_name = getCookie('user_name');

    const siderCollapse = computed(() => {
      return $store.state.siderCollapse;
    });

    // 用户操作栏调用
    const handleCommand = (command: string) => {
      if (command === 'logout') {
        // 删除cookie， 返回首页
        deleteCookie('user_name');
        router.push('/login');
      } else {
        // TODO 关于我的页面
      }
    };

    // 设置侧边栏是否收起
    const collapseChange = () => {
      $store.dispatch('setSiderCollapse', !$store.state.siderCollapse);
    };

    return { siderCollapse, user_name, handleCommand, collapseChange };
  },

  components: {},
});
</script>
<style scoped>
.header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #232f41;
  padding-top: 5px;
  display: flex;
  justify-content: space-between;
  color: #fff;
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
  cursor: pointer;
}

.user-info {
  line-height: 40px;
  margin-right: 40px;
  width: 140px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  font-size: 18px;
  color: #fff;
}
</style>
