import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import * as ELIcons from '@element-plus/icons-vue';
import '@/assets/css/base.css';
import 'default-passive-events';
import 'element-plus/dist/index.css';

// markdow预览组件以及样式
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
VMdPreview.use(vuepressTheme, {
  Prism,
});


const app = createApp(App);

app.use(store).use(router).use(ElementPlus).use(VMdPreview);
// 引入elementIcon
Object.keys(ELIcons).forEach((key) => {
  app.component(key, ELIcons[key as keyof typeof ELIcons]);
});
app.mount('#app');
