<template>
<!--  侧边栏导航-->
  <div class="zc-aside" ref="aside">
<!--    logo-->
    <div class="logo">
      <img :src="require('@/assets/images/logo.png')">
    </div>
<!--    导航-->
    <nav>
      <ul class="menu">
        <li>
          <router-link v-zc-tip.left="'学生群组挖掘系统'" to="/index/student" class="menu-item" :class="{'active': $route.path === '/index/student'}">
            <i class="fi-rr-user"></i>
          </router-link>
        </li>
        <li>
          <router-link v-zc-tip.left="'房屋价格预测系统'" to="/index/house-price" class="menu-item" :class="{'active': $route.path === '/index/house-price'}">
            <i class="fi-rr-building"></i>
          </router-link>
        </li>
        <li>
          <router-link v-zc-tip.left="'癌症病情诊断系统'" to="/index/cancer" class="menu-item" :class="{'active': $route.path === '/index/cancer'}">
            <i class="fi-rr-pulse"></i>
          </router-link>
        </li>
        <li>
          <router-link v-zc-tip.left="'详细了解项目'" to="/" class="menu-item" :class="{'active': $route.path === '/'}">
            <i class="fi-rr-incognito"></i>
          </router-link>
        </li>
        <li>
          <a v-zc-chat.public="'T001'" class="menu-item">
            <i class="fi-rr-comment"></i>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import {EventBus} from "@/util/event-bus";

export default {
  name: "zc-aside",
  mounted() {
    this.$refs.aside.addEventListener('scroll',()=>{
      EventBus.$emit('majorScroll');
    })
  }
}
</script>

<style scoped lang="scss">
  // 容器
  .zc-aside{
    overflow: auto;
    position: fixed;
    top: 40px;
    bottom: 40px;
    left: 40px;
    width: 100px;
    z-index: 10;
    -webkit-box-shadow: none;
    box-shadow: none;
    background-color: #181c32;
    border-radius: .55rem;
    display: flex;
    flex-direction: column;
  }
  // logo
  .logo{
    font-family: 'Monoton-Regular';
    padding-top: 32px;
    padding-bottom: 16px;
    font-size: 30px;
    display: flex;
    justify-content: center;
    flex: none;
  }
  .logo img {
    width: 40px;
  }
  // 导航
  nav{
    flex: 1 0 auto;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 60px;
    justify-content: center;
  }
  .menu{
    display: flex;
    flex-direction: column;
  }
  .menu-item{
    width: 43px;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    color: #fff;
    border-radius: 8px;
    transition: all .3s;
    margin-bottom: 15px;
  }
  .menu-item:hover{
    color: #8950fc;
  }
  .menu-item.active{
    background: #8950fc;
    color: #fff;
  }
  .menu-item i{
    font-size: 18px;
  }
  .menu-item span{
    font-size: 15px;
    font-weight: 500;
  }
</style>
