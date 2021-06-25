import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 字体注册
import "@/assets/fonts/UIcons/font.scss";
import "@/assets/fonts/Monoton/font.css";

// 安装tooltip
import tooltip from "@/components/Tooltip/index.js";
Vue.use(tooltip.directive)

// 安装chat-sidebar-card
import chatSidebarCard from '@/components/chat-sidebar-card/index.js'
Vue.use(chatSidebarCard.directive)

// 注册过滤器
import '@/util/filters.js';

// 定义域名
Vue.prototype.$domain = 'http://127.0.0.1:5000';

// 注册Bus
import VueBus from 'vue-bus';
Vue.use(VueBus);

// 弹窗提示
import Notification from '@/components/notification'
Vue.use(Notification)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
