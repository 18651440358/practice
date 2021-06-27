<template>
<!--  侧边栏团队介绍-->
  <div class="zc-card-sidebar-team">
    <div class="card-title">
      <div class="title">
        <h3>我们的团队</h3>
        <span>实训第六小组</span>
      </div>
      <a v-zc-chat.public="'T001'">
<!--        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 24 24" version="1.1">-->
<!--          <g stroke="none" stroke-width="1">-->
<!--            <rect x="14" y="9" width="6" height="6" rx="3" fill="black"/>-->
<!--            <rect x="3" y="9" width="6" height="6" rx="3" fill="black" fill-opacity="0.7"/>-->
<!--          </g>-->
<!--        </svg>-->
        <i class="fi-sr-users"></i>
      </a>
    </div>
    <ul class="card-body">
      <li v-for="(user,index) in teamMember" :key="index">
        <div class="user-group">
          <div class="user-portrait">
            <img :src="require('@/assets/images/avatars/'+ user[5] + '.svg' )">
          </div>
          <div class="user-info">
            <h3>{{user[3]}}</h3>
            <span>{{user[9]}}</span>
          </div>
        </div>
        <a v-zc-chat.private="'U'+index">
          <i class="fi-br-angle-small-right"></i>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "zc-card-sidebar-team",
  data() {
    return {
      teamMember: []
    }
  },
  created() {
    this.$bus.on('team', team => {
      this.teamMember = team
      // 提示上传
      setTimeout(() => {
        this.$rbNote({
          title: '获取成功',
          messageType: 'success',
          message: '实训第四小组成员获取成功。'
        })
      },300)

    })
  }
}
</script>

<style scoped lang="scss">
  // 侧边栏团队介绍
  .zc-card-sidebar-team{
    padding: 30px 30px 20px 30px;
    background: #fff;
  }
  // 标题
  .card-title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 30px;
  }
  .title{
    display: inline-flex;
    flex-direction: column;
  }
  .title h3{
    font-size: 16px;
    font-weight: 600;
  }
  .title span{
    font-size: 12px;
    margin-top: 5px;
    color: #b5b5c3;
    font-weight: 500;
  }
  .card-title a{
    width: 30px;
    height: 30px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    color: #8950fc;
  }
  .card-title a svg g [fill]{
    fill: #8950fc;
  }
  .card-title a:hover{
    background: #eee5ff;
  }
  // 主体部分
  .card-body li{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .card-body li:last-child{
    margin-bottom: 0;
  }
  // 用户信息
  .user-portrait{
    width: 40px;
    height: 40px;
    border-radius: 6px;
    background: #f3f6f9;
    display: inline-flex;
    justify-content: center;
    align-items: flex-end;
    margin-right: 13px;
  }
  .user-portrait img{
    width: 30px;
  }
  .user-group{
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }
  .user-info{
    display: inline-flex;
    flex-direction: column;
  }
  .user-info h3{
    color: #3f4254;
    font-weight: 600;
    font-size: 14px;
  }
  .user-info span{
    margin-top: 3px;
    color: #b5b5c3;
    font-size: 13px;
  }
  .card-body li a{
    width: 30px;
    height: 30px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background: #f3f6f9;
    color: #1bc5bd;
    font-size: 16px;
  }
</style>
