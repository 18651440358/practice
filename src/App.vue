<template>
  <div id="app" v-cloak>
    <router-view/>
  </div>
</template>

<script>
import { EventBus } from "@/util/event-bus.js";
  export default {
    mounted() {
      this.initBus();
    },
    methods: {
      initBus() {
        document.addEventListener('scroll',()=>{
          EventBus.$emit('majorScroll');
        })
      }
    }
  }
</script>

<style lang="scss">
  [v-cloak]{
    display: none;
  }
  body{
    color: #181c32;
    margin: 0;
    padding: 0;
    font-size: 13px;
    -webkit-font-smoothing: antialiased;
    font-family: "Helvetica", "PingFang SC", "Lantinghei SC", "Microsoft YaHei", "HanHei SC", "Open Sans", Arial, "Hiragino Sans GB", 微软雅黑, STHeiti, "WenQuanYi Micro Hei", SimSun, sans-serif;
  }
  *{
    box-sizing: border-box;
    outline: none;
  }
  ul,ul li{
    padding: 0;
    list-style: none;
    margin: 0;
  }
  a{
    text-decoration: none;
    color: #181c32;
    cursor: pointer;
  }
  h1,h2,h3,h4,h5,h6,p{
    margin: 0;
  }
  ::selection{
    background: #f64e60;
    color: #fff;
    text-shadow: 1px 1px rgba(0,0,0,0.3);
  }
</style>
