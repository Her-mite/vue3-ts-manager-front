<template>
  <div class="siderbar">
    <el-menu
      class="el-menu-sider"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      default-active="1"
      :collapse="siderCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <template v-for="item in siderItems">
        <!-- 标题的菜单 -->
        <template v-if="item.subs">
          <el-sub-menu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>

            <!-- 二级标题菜单 -->
            <template v-for="subItem in item.subs">
              <el-sub-menu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template #title>
                  <i :class="subItem.icon"></i>
                  <span>{{ subItem.title }} </span>
                </template>
                <!-- 三级标题菜单 -->
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >
                  <i :class="subItem.icon"></i>
                  {{ threeItem.title }}</el-menu-item
                >
              </el-sub-menu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                <i :class="subItem.icon"></i>
                <span>{{ subItem.title }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import $store from '@/store/index';

export default defineComponent({
  setup() {
    const siderItems = reactive([
      { icon: 'icon-dayinji-1', index: 'systemIndex', title: '系统首页' },
      {
        icon: 'icon-a-gongzuodiannao',
        index: 'commonWebsite',
        title: '常用网址',
        subs: [
          {
            icon: 'icon-a-gongzuodiannao',
            index: 'commonWebsite3',
            title: '开发常用',
          },
          {
            icon: 'el-icon-user',
            index: 'testEnv',
            title: '测试环境',
          },
          {
            icon: 'el-icon-s-help',
            index: 'Maintenance',
            title: '运维相关',
          },
        ],
      },
    ]);
    
    const siderCollapse = computed(() => {      
      return $store.state.siderCollapse;
    });

    const handleOpen = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };

    const handleClose = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };

    return { siderItems,siderCollapse, handleOpen, handleClose };
  },
});
</script>

<style>
.siderbar {
  display: block;
  position: absolute;
  left: 0;
  top: 55px;
  bottom: 0;
  overflow-y: scroll;
  height: 100%;
  background: #324157;
}
.el-menu-sider {
  border-right: solid 0px !important;
}
.el-menu-sider:not(.el-menu--collapse) {
  width: 220px;
  border-right: solid 0px;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}
</style>
