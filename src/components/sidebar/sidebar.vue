<template>
  <div class="zc-sidebar">
<!--    用户-->
    <div class="user-container">
      <zc-dropdown>
        <div class="user-group">
          <div class="user-portrait">
            <img :src="currentUser.portrait">
          </div>
          <div class="user-info">
            <h3>{{currentUser.userName}}</h3>
            <span>{{currentUser.rote}}</span>
          </div>
        </div>
        <zc-dropdown-menu slot="zc-dropdown-menu">
          <div class="user-popup">
            <div class="popup-header">
              <div class="user-group">
                <div class="user-portrait">
                  <img :src="currentUser.portrait">
                </div>
                <div class="user-info">
                  <h3>{{currentUser.userName}}</h3>
                  <span>{{currentUser.rote}}</span>
                </div>
              </div>
              <span>3 个消息</span>
            </div>
            <div class="popup-body">
              <zc-dropdown-item>
                <a class="popup-item">
                  <div class="popup-icon">
                    <i class="fi-rr-id-badge susses"></i>
                  </div>
                  <div class="popup-info">
                    <h3>我的账户信息</h3>
                    <div class="popup-text">
                      <p>设置当前登录账户的信息</p>
                      <span class="update">update</span>
                    </div>
                  </div>
                </a>
              </zc-dropdown-item>
              <zc-dropdown-item>
                <a class="popup-item">
                  <div class="popup-icon">
                    <i class="fi-rr-bell warning"></i>
                  </div>
                  <div class="popup-info">
                    <h3>我的消息</h3>
                    <div class="popup-text">
                      <p>收件箱和系统消息</p>
                    </div>
                  </div>
                </a>
              </zc-dropdown-item>
              <zc-dropdown-item>
                <a class="popup-item">
                  <div class="popup-icon">
                    <i class="fi-rr-flag danger"></i>
                  </div>
                  <div class="popup-info">
                    <h3>我的活动</h3>
                    <div class="popup-text">
                      <p>系统日志和通知</p>
                    </div>
                  </div>
                </a>
              </zc-dropdown-item>
              <zc-dropdown-item>
                <a class="popup-item">
                  <div class="popup-icon">
                    <i class="fi-rr-golf info"></i>
                  </div>
                  <div class="popup-info">
                    <h3>我的任务</h3>
                    <div class="popup-text">
                      <p>最新的任务和项目</p>
                    </div>
                  </div>
                </a>
              </zc-dropdown-item>
            </div>
            <div class="popup-footer">
              <router-link to="/login" class="sign-out">登出</router-link>
              <a class="pro">升级计划</a>
            </div>
          </div>
        </zc-dropdown-menu>
      </zc-dropdown>
      <a v-zc-tip.right="'更多链接'">
        <i class="fi-sr-apps"></i>
      </a>
    </div>
<!--    团队介绍-->
    <div class="team">
      <zc-card-sidebar-team></zc-card-sidebar-team>
    </div>
<!--    时间轴-->
    <div class="timeline">
      <zc-card-sidebar-timeline v-if="$route.path !== '/index/house-price'"></zc-card-sidebar-timeline>
      <zc-card-forecast-house-price v-else></zc-card-forecast-house-price>
    </div>
  </div>
</template>

<script>
import ZcDropdown from "@/components/dropdown/dropdown";
import ZcDropdownMenu from "@/components/dropdown-menu/dropdown-menu";
import ZcDropdownItem from "@/components/dropdown-item/dropdown-item";
import ZcCardSidebarTeam from "@/components/card-sidebar-team/card";
import ZcCardSidebarTimeline from "@/components/card-sidebar-timeline/card";
import ZcCardForecastHousePrice from "@/components/card-forecast-housePrice/card";
export default {
  name: "zc-sidebar",
  components: {
    ZcCardForecastHousePrice,
    ZcCardSidebarTimeline, ZcCardSidebarTeam, ZcDropdownItem, ZcDropdownMenu, ZcDropdown},
  data() {
    return {
      currentUser: {
        userName: 'Rabbit Doomsday',
        rote: '项目经理',
        portrait: require('@/assets/images/avatars/5.svg')
      }
    }
  },
  created() {
    this.$bus.on('user', data => {
      this.currentUser.userName = data[3]
      this.currentUser.rote = data[9]
      this.currentUser.portrait = require('@/assets/images/avatars/' + data[5] + '.svg')
    })
  }
}
</script>

<style scoped lang="scss">
  .zc-sidebar{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 400px;
    background-color: #fff;
    overflow: scroll;
  }
  // 用户容器
  .user-container{
    width: 400px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 45px 48px 16px 48px;
    position: fixed;
    background: #fff;
  }
  .user-container > a{
    width: 40px;
    height: 40px;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #eee5ff;
    color: #8950fc;
    font-size: 15px;
  }
  .user-container i{
    width: 15px;
    height: 15px;
    display: inline-block;
  }
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
  // 用户信息
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
  // 弹出框
  .user-popup{
    width: 350px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 0 50px 0 rgba(82,63,105,0.15);
    margin: 3px 0;
  }
  .popup-header{
    padding: 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ebedf3;
  }
  .popup-header > span{
    display: inline-block;
    font-size: 12px;
    padding: 5px 12px;
    font-weight: 500;
    color: #1bc5bd;
    background-color: #c9f7f5;
    border-radius: 5px;
    cursor: pointer;
    transition: all .3s;
  }
  .popup-header > span:hover{
    color: #fff;
    background-color: #1bc5bd;
  }
  // 列表
  .popup-body{
    padding: 16px 0;
    border-bottom: 1px solid #ebedf3;
  }
  .popup-item{
    padding: 10px 26px;
    display: flex;
    align-items: center;
  }
  .popup-item:hover{
    background: #f3f6f9;
  }
  .popup-icon{
    width: 26px;
    margin-right: 6px;
    font-size: 16px;
  }
  .popup-icon .susses{
    color: #1bc5bd;
  }
  .popup-icon .warning{
    color: #ffa800;
  }
  .popup-icon .danger{
    color: #f64e60;
  }
  .popup-icon .info{
    color: #8950fc;
  }
  .popup-info{
    display: flex;
    flex-direction: column;
  }
  .popup-info h3{
    font-size: 14px;
    font-weight: 500;
  }
  .popup-text{
    display: flex;
    align-items: center;
  }
  .popup-text p{
    color: #b5b5c3;
  }
  .update{
    color: #f64e60;
    background-color: #ffe2e5;
    font-size: 12px;
    font-weight: 500;
    padding: 4px 8px;
    border-radius: 5px;
    margin-left: 5px;
  }
  // 弹窗框页尾
  .popup-footer{
    padding: 16px 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  // 登出
  .sign-out{
    color: #8950fc;
    background-color: #eee5ff;
    font-weight: 500;
    padding: 8px 13px;
    border-radius: 6px;
    transition: all .3s;
  }
  .sign-out:hover{
    color: #fff;
    background-color: #8950fc;
  }
  .pro{
    font-weight: 500;
    padding: 8px 13px;
    border-radius: 6px;
    transition: all .3s;
    color: #b5b5c3;
  }
  .pro:hover{
    color: #8950fc;
    background: #f3f6f9;
  }
  // 团队介绍
  .team{
    padding: 104px 15px 30px 15px;
  }
  .timeline{
    padding: 0 15px 30px 15px;
  }
</style>
