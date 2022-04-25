import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/home/HomeView.vue';
import LoginView from '@/views/login/LoginView.vue';
import RegisterView from '@/views/login/RegisterView.vue';
import { getCookie } from '@/utils/cookie';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/overview',
    component: HomeView,
    children: [
      {
        path: '/overview',
        name: 'overview',
        meta: {
          title:'概览'
        },
        component: ()=>
          import( /* webpackChunkName: "OverviewIndex" */ '../views/overview/OverviewIndex.vue'),
      },
      {
        path: '/studyWebsite',
        name: 'studyWebsite',
        meta: {
          title:'学习网站'
        },
        component: () =>
          import(/* webpackChunkName: "StudyWebsite" */ '../views/commonWebsite/StudyWebsite.vue'),
      },
      {
        path: '/entertainmentWebsite',
        name: 'entertainmentWebsite',
        meta: {
          title:'休闲娱乐'
        },
        component: () =>
          import(/* webpackChunkName: "EntertainmentWebsite" */ '../views/commonWebsite/EntertainmentWebsite.vue'),
      },
      {
        path: '/utilsWebsite',
        name: 'utilsWebsite',
        meta: {
          title:'常用工具'
        },
        component: () =>
          import(/* webpackChunkName: "UtilsWebsite" */ '../views/commonWebsite/UtilsWebsite.vue'),
      },
      {
        path: '/markdownShow',
        name: 'markdownShow',
        meta: {
          title:'文档展示'
        },
        component: () =>
          import(/* webpackChunkName: "markdownShow" */ '../views/markdownShow/MarkdownShow.vue'),
      },
      {
        path: '/minioView',
        name: 'minioView',
        meta: {
          title:'对象存储'
        },
        component: () =>
          import(/* webpackChunkName: "minioView" */ '../views/storageView/MinioView.vue'),
      },
      {
        path: '/fileTransmit',
        name: 'fileTransmit',
        meta: {
          title:'文件传输'
        },
        component: () =>
          import(/* webpackChunkName: "minioView" */ '../views/storageView/FileTransmit.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 路由跳转前校验
router.beforeEach((to, from, next) => {
  document.title = '秘密花园';
  const user_name = getCookie('user_name');
  
  // 如果没有登录先去登录
  if (!user_name && to.path !== '/login') {
      next('/login');
  } else if (to.meta.permission) {
      // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
      user_name === 'admin'
          ? next()
          : next('/403');
  } else {
      next();
  }
});

export default router;
