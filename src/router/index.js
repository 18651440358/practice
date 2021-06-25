import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 系统框架
import system from '../pages/system/index.vue';

// 学生系统
import student from '../pages/student/index.vue';
// 房价预测
import housePrice from '../pages/house-price/index.vue';
// 癌症诊断预测
import cancer from '../pages/cancer/index.vue';

// 登录
import login from '../pages/login/login.vue'

const routes = [
  {path: '/', redirect: '/index/student'},
  {
    path: '/index',
    children: [
      {
        path: 'student',
        component: student
      },
      {
        path: 'house-price',
        component: housePrice
      },
      {
        path: 'cancer',
        component: cancer
      }
    ],
    component: system
  },
  {
    path: '/login',
    component: login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
