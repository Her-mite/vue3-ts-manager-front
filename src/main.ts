import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import * as ELIcons from '@element-plus/icons-vue';
import '@/assets/css/base.css';

import 'element-plus/dist/index.css';

const app = createApp(App);

app.use(store).use(router).use(ElementPlus);
// 引入elementIcon
Object.keys(ELIcons).forEach((key) => {
  app.component(key, ELIcons[key as keyof typeof ELIcons]);
});
app.mount('#app');
