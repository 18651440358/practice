<template>
  <div class="zc-card-sidebar-timeline">
    <div class="card-title">
      <div class="title">
        <h3>我们的团队</h3>
        <span>实训第六小组</span>
      </div>
      <a v-zc-tip.right="'管理时间轴'">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
          <g stroke="none" stroke-width="1">
            <rect x="14" y="9" width="6" height="6" rx="3" fill="black"/>
            <rect x="3" y="9" width="6" height="6" rx="3" fill="black" fill-opacity="0.7"/>
          </g>
        </svg>
      </a>
    </div>
    <div class="card-body">
      <div class="time-item" v-for="(item,index) in milestone" :key="index">
        <div class="timeline-date">{{item.date}}</div>
        <div class="timeline-badge" :class="[{'danger':item.genre===1},{'info':item.genre===2},{'success':item.genre===3},{'warning':item.genre===4},{'primary':item.genre===5}]">
          <i class="fi-br-circle-small"></i>
        </div>
        <div class="timeline-content" :class="{'participant':item.participant.length > 0}">
          <span v-html="item.content"></span>
          <div class="user-info" v-if="item.participant.length > 0">
            <template v-for="(user,userId) in item.participant">
              <div class="portrait" :key="'userId'+userId" v-if="userId <= 1">
                <img :src="user.portrait">
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "zc-card-sidebar-timeline",
  data() {
    return {
      milestone: [
        {
          date: '6月17日',
          genre: 5,
          content: '周灿同学完成了第一部分学生系统的可视化页面的全部内容',
          participant: [
            {
              portrait: require('@/assets/images/avatars/3.svg')
            }
          ]
        },
        {
          date: '6月16日',
          genre: 2,
          content: '小组经过会议确定了所以成员的岗位，项目经理对整个项目进行了设计与规划并分配了每一为成员的任务。',
          participant: []
        },
        {
          date: '6月16日',
          genre: 4,
          content: '周耀、陈思文两名同学完成了系统数据的设计与搭建',
          participant: [
            {
              portrait: require('@/assets/images/avatars/1.svg')
            },
            {
              portrait: require('@/assets/images/avatars/2.svg')
            }
          ]
        },
        {
          date: '6月15日',
          genre: 3,
          content: '小组经过会议决定使用Web作为实训项目可视化页面。',
          participant: []
        },
        {
          date: '6月15日',
          genre: 1,
          content: '小组组建完成, 成为实训小组第六小组. 小组共有8名同学组成。',
          participant: []
        },
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  .zc-card-sidebar-timeline{
    padding: 30px;
    padding-top: 0;
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
  }
  .card-title a svg g [fill]{
    fill: #8950fc;
  }
  .card-title a:hover{
    background: #eee5ff;
  }
  .card-body{
    position: relative;
  }
  .card-body::before{
    content: "";
    position: absolute;
    left: 60px;
    width: 3px;
    top: 3px;
    bottom: 0;
    background-color: #ebedf3;
  }
  .time-item{
    margin-bottom: 20px;
    display: flex;
    position: relative;
    align-items: flex-start;
  }
  .timeline-date{
    width: 70px;
    padding-right: 12px;
    font-size: 12px;
    font-weight: 600;
    flex-shrink: 0;
  }
  .timeline-badge{
    background: #fff;
    width: 13px;
    height: 13px;
    border-radius: 100%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
    margin-left: -17.5px;
    padding: 3px!important;
    border: 6px solid #fff!important;
  }
  .timeline-badge.danger i{
    color: #f64e60;
    font-size: 20px;
  }
  .timeline-badge.info i{
    color: #3699FF;
    font-size: 20px;
  }
  .timeline-badge.success i{
    color: #1BC5BD;
    font-size: 20px;
  }
  .timeline-badge.warning i{
    color: #FFA800;
    font-size: 20px;
  }
  .timeline-badge.primary i{
    color: #8950FC;
    font-size: 20px;
  }
  .timeline-content{
    padding-left: 6px;
    display: flex;
  }
  .timeline-content span{
    color: #7e8299;
  }
  .timeline-content.participant{
    display: flex;
    align-items: center;
  }
  .timeline-content.participant span{
    color: #3f4254;
    font-weight: 600;
  }
  .user-info{
    margin-left: 5px;
    display: inline-flex;
    max-width: 80px;
  }
  .portrait{
    width: 30px;
    height: 30px;
    margin-right: 5px;
    border-radius: 6px;
    background: #c9f7f5;
    display: inline-flex;
    align-items: flex-end;
    justify-content: center;
  }
  .portrait img{
    width: 20px;
  }
</style>
