<template>
<!-- 系统主页 -->
  <div class="zc-page-system-index">
<!--    导航-->
    <div class="aside">
      <zc-aside></zc-aside>
    </div>
<!--      主体内容-->
    <div class="content">
      <router-view/>
    </div>
<!--    右侧内容-->
    <div class="sidebar">
      <zc-sidebar></zc-sidebar>
    </div>
  </div>
</template>

<script>
import ZcAside from "@/components/aside/aside";
import ZcSidebar from "@/components/sidebar/sidebar";
export default {
  name: "zc-page-system-index",
  components: {ZcSidebar, ZcAside},
}
</script>

<style scoped lang="scss">
  // 容器
  .zc-page-system-index{
    width: 100vw;
    background-color: #f3f6f9;
    display: flex;
    flex-direction: row;
  }
  .content{
    width: 100vw;
    margin: 40px 0;
    margin-left: 140px;
    margin-right: 400px!important;
  }
</style>
