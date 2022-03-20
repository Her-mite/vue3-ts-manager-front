import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
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
    component: HomeView,
    children: [
      {
        path: '/about',
        name: 'about',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
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
  document.title = `${to.meta.title} | ts-vue3-front`;
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
