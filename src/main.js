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

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
