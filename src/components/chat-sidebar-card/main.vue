<template>
  <transition name="chat" @after-leave="destroy">
  <div class="zc-chat-sidebar-card" v-show="startChat">
    <div class="chat-container">
<!--      顶部-->
      <div class="chat-header">
<!--        <a class="expand" v-zc-tip.left="'聊天系统'">-->
<!--          <i class="fi-br-browser"></i>-->
<!--        </a>-->
        <div class="chat-title" v-if="chatForm === 'private'">
          <h3>{{targetUsers.targetName}}{{targetUserCode}}</h3>
          <span class="point"></span>
<!--          <div class="chat-status">-->
<!--            <span class="point"></span>-->
<!--            <span class="text">Active</span>-->
<!--          </div>-->
        </div>
        <div class="chat-title" v-if="chatForm === 'public'">
        <h3>第六小组群聊</h3>
      </div>
        <a @click="hiddenTip" class="close" v-zc-tip.right="'关闭聊天'">
          <i class="fi-br-cross-small"></i>
        </a>
      </div>
<!--      身体-->
      <div class="chat-body">
        <vuescroll :ops="ops" ref="scroll">
          <div class="chat-panel">
            <template v-for="(chat,index) in chatRecord">
              <div class="chat-item" :key="index">
<!--                <template>-->
                  <transition-group @appear="scrollBottom" tag="div" name="our">
                    <div :key="'out'+index" class="our-side" v-if="chat.userCode === currentUser.userCode">
                      <div class="chat-content">
                        <div v-for="(item,chartIndex) in chat.content" :key="chartIndex" v-html="item"></div>
                        <span class="chat-time">{{chat.timestamp | timeShiftDate}}</span>
                      </div>
                      <div class="chat-portrait">
                        <img :src="chat.portrait">
                      </div>
                    </div>
                  </transition-group>
                  <transition-group @appear="scrollBottom" tag="div" name="other">
                    <div :key="'other'+index" class="other-side" v-if="chat.userCode !== currentUser.userCode">
                      <div class="chat-portrait">
                        <img :src="chat.portrait">
                      </div>
                      <div class="chat-content">
                        <div v-for="(item,chartIndex) in chat.content" :key="chartIndex" v-html="item"></div>
                        <span class="chat-time">来自{{chat.userName}}&nbsp;&nbsp;·&nbsp;&nbsp;{{chat.timestamp | timeShiftDate}}</span>
                      </div>
                    </div>
                  </transition-group>
<!--                </template>-->
              </div>
            </template>
          </div>
        </vuescroll>
      </div>
<!--      尾部-->
      <div class="chat-footer">
        <div class="chat-input-group">
          <input v-model="message" placeholder="输入消息 ..." />
          <a>
            <i class="fi-br-clip"></i>
          </a>
          <a class="clip">
            <i class="fi-br-mode-landscape"></i>
          </a>
          <a class="send" @click="sendMessage">
            <i class="fi-br-paper-plane"></i>
          </a>
        </div>
      </div>
<!--      加载-->
      <transition name="loading">
        <div class="loading" v-if="loading">
          <video preload="auto" src="./loading.mp4" autoplay muted loop></video>
          <h3>正在连接服务器</h3>
        </div>
      </transition>
    </div>
  </div>
  </transition>
</template>

<script>
import vuescroll from 'vuescroll';
export default {
  name: "zc-chat-sidebar-card",
  components: {vuescroll},
  props: {
    targetUserCode: String,
    chatForm: String
  },
  data() {
    return {
      // 当前登录用户
      currentUser: {
        userName: 'Rabbit Doomsday',
        userCode: 'U001',
        portrait: require('@/assets/images/avatars/1.svg')
      },
      // Target Users
      targetUsers: {
        type: 1,
        targetName: 'Rabbit Volcano',
        targetCode: 'U002',
      },
      // 聊天记录
      chatRecord: [
        {
          userName: 'Rabbit Volcano',
          userCode: 'U002',
          portrait: require('@/assets/images/avatars/1.svg'),
          content: [
              'How likely are you to recommend our company to your friends and family?',
              'Ok, Understood!',
              'Most purchased Business courses during this sale!'
          ],
          timestamp: '1623898628',
          targetUsers: 'U001',
          targetName: 'Rabbit Doomsday',
          type: 1,
        },
        {
          userName: 'Rabbit Doomsday',
          userCode: 'U001',
          portrait: require('@/assets/images/avatars/2.svg'),
          content: [
            'Discover what students who viewed Learn Figma - UI/UX Design. Essential Training also viewed.'
          ],
          timestamp: '1623985028',
          targetUsers: 'U002',
          targetName: 'Rabbit Doomsday',
          type: 1,
        },
        {
          userName: 'Rabbit Volcano',
          userCode: 'U002',
          portrait: require('@/assets/images/avatars/1.svg'),
          content: [
            'Most purchased Business courses during this sale!'
          ],
          timestamp: '1623992228',
          targetUsers: 'U001',
          targetName: 'Rabbit Doomsday',
          type: 1,
        },
        {
          userName: 'Rabbit Doomsday',
          userCode: 'U001',
          portrait: require('@/assets/images/avatars/2.svg'),
          content: [
            'Company BBQ to celebrate the last quater achievements and goals. Food and drinks provided',
            'You’ll receive notifications for all issues, pull requests!'
          ],
          timestamp: '1624036800',
          targetUsers: 'U002',
          targetName: 'Rabbit Doomsday',
          type: 1,
        },
        {
          userName: 'Rabbit Volcano',
          userCode: 'U002',
          portrait: require('@/assets/images/avatars/1.svg'),
          content: [
            'How likely are you to recommend our company to your friends and family?',
            'Ok, Understood!',
            'Most purchased Business courses during this sale!'
          ],
          timestamp: '1623898628',
          targetUsers: 'U001',
          targetName: 'Rabbit Doomsday',
          type: 1,
        },
        {
          userName: 'Rabbit Doomsday',
          userCode: 'U001',
          portrait: require('@/assets/images/avatars/2.svg'),
          content: [
            'Company BBQ to celebrate the last quater achievements and goals. Food and drinks provided',
            'You’ll receive notifications for all issues, pull requests!'
          ],
          timestamp: '1624036800',
          targetUsers: 'U002',
          targetName: 'Rabbit Doomsday',
          type: 1,
        },
        {
          userName: 'Rabbit Volcano',
          userCode: 'U002',
          portrait: require('@/assets/images/avatars/1.svg'),
          content: [
            'Most purchased Business courses during this sale!'
          ],
          timestamp: '1623992228',
          targetUsers: 'U001',
          targetName: 'Rabbit Doomsday',
          type: 1,
        },
      ],
      // 信息
      message: '',
      ops: {
        bar: {
          background: '#E4E6EF',
          size: '3px',
        },
        scrollPanel: {
          initialScrollY: '100%',
          speed: 0,
        }
      },
      loading: true,
      startChat: false
    }
  },
  methods: {
    // 发送信息
    sendMessage() {
      this.chatRecord.push(
          {
            userName: 'Rabbit Doomsday',
            userCode: 'U001',
            portrait: require('@/assets/images/avatars/2.svg'),
            content: [
              'You’ll receive notifications for all issues, pull requests!'
            ],
            timestamp: '1624036800',
            targetUsers: 'U002',
            targetName: 'Rabbit Doomsday',
            type: 1,
          },
      )
      setTimeout(() => {
        this.chatRecord.push(
            {
              userName: 'Rabbit Volcano',
              userCode: 'U002',
              portrait: require('@/assets/images/avatars/1.svg'),
              content: [
                'Ok, Understood!',
              ],
              timestamp: '1623898628',
              targetUsers: 'U001',
              targetName: 'Rabbit Doomsday',
              type: 1,
            },
        )
      },3000)
    },
    scrollBottom() {
      !this.loading && this.$refs['scroll'].scrollTo(
          {
            y: "100%"
          },
          300,
          "easeInCubic"
      );
    },
    // 显示 tip
    showTip () {
      this.startChat = true
    },
    updateTip() {
      this.loading = true
      window.console.log(this.targetUserCode)
      setTimeout(() => {
        this.loading = false
      },3000)
    },
    // 隐藏 tip
    hiddenTip () {
      this.startChat = false
    },
    destroy () {
      this.removeParentNode()
      this.$destroy()
    },
    removeParentNode () {
      if (this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
    },
  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
  .zc-chat-sidebar-card{
    position: fixed;
    z-index: 20;
    right: 20px;
    bottom: 20px;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 0 50px 0 rgba(82,63,105,0.3);
  }
  .chat-container {
    width: 400px;
    height: 540px;
    //background: #fff;
    background: #f3f6f9;
    position: relative;
  }
  .loading{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff;
  }
  .loading video{
    width: 300px;
  }
  .chat-header{
    width: 100%;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(243, 246, 249,.1);
    backdrop-filter: blur(6px);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
  }
  // 放大
  .expand,.close{
    width: 30px;
    height: 30px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .3s;
  }
  .close{
    font-size: 16px;
  }
  .expand:hover{
    color: #fff;
    background: #20d489;
  }
  .close:hover{
    color: #fff;
    background: #f1416c;
  }
  // 标题
  .chat-title{
    display: inline-flex;
    //flex-direction: column;
    //align-items: flex-start;
    align-items: center;
    z-index: 3;
  }
  .chat-title h3{
    font-size: 18px;
    line-height: 1;
    font-weight: 800;
  }
  // 登入状态
  .chat-status{
    display: inline-flex;
    align-items: center;
    line-height: 1;
    margin-top: 3px;
  }
  .point{
    margin-left: 8px;
    width: 6px;
    height: 6px;
    display: inline-block;
    border-radius: 50%;
    background: #20d489;
  }
  .chat-status .text{
    //color: #B5B5C3;
    font-size: 12px;
    margin-left: 3px;
  }
  .chat-body{
    width: 400px;
    height: 540px;
  }
  .chat-panel{
    padding: 15px;
    padding-top: 62px;
    padding-bottom: 78px;
  }
  // 尾部
  .chat-footer{
    padding: 15px;
    overflow: hidden;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 3;
    background: rgba(243, 246, 249,.1);
    backdrop-filter: blur(6px);
  }
  .chat-input-group{
    background: #fff;
    display: flex;
    align-items: center;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 15px 0 rgba(82,63,105,0.1);
    padding-right: 5px;
  }
  .chat-input-group input{
    flex: 1;
    border: none;
    padding: 12px 18px;
    height: 48px;
    font-weight: 500;
  }
  .chat-input-group input::placeholder{
    color: #a1a5b7;
    font-weight: 500;
  }
  .chat-input-group a{
    width: 35px;
    height: 35px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .3s;
  }
  //.chat-input-group a:hover{
  //  background: #f3f6f9;
  //}
  .send{
    color: #fff;
    font-weight: 600;
    background: #0080FF;
  }
  .clip{
    //color: #20d489;
    //background: #e4fff4;
    margin-right: 8px;
  }
  .chat-item{
    //margin-bottom: 15px;
  }
  .other-side{
    display: flex;
    align-items: flex-start;
    margin-left: -15px;
    margin-right: -15px;
    padding: 15px;
  }
  .chat-portrait{
    width: 30px;
    height: 30px;
    overflow: hidden;
    border-radius: 50%;
    //background-color: #fff;
    display: inline-flex;
    align-items: flex-end;
    justify-content: center;
  }
  .chat-portrait img{
    width: 20px;
  }
  .other-side .chat-portrait{
    margin-right: 10px;
    background: #e4fff4;
  }
  .other-side .chat-content{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
    filter: drop-shadow( 0 0 15px rgba(82,63,105,0.1));
    will-change: transform;
  }
  .other-side .chat-content div{
    width: auto;
    display: inline-block;
    padding: 10px;
    background: #fff;
    margin-bottom: 7px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    position: relative;
    z-index: 2;
    line-height: 1.5;
  }
  .other-side .chat-content div:first-child{
    border-top-left-radius: 10px;
  }
  .other-side .chat-content div:nth-last-child(2){
    border-bottom-left-radius: 10px;
  }
  .other-side .chat-content .chat-time{
    font-size: 12px;
    color: #7e8299;
    margin-left: 8px;
  }
  .our-side{
    display: flex;
    align-items: flex-start;
    margin-left: -15px;
    margin-right: -15px;
    padding: 15px;
  }
  .our-side .chat-content{
    margin-left: 10px;
  }
  .our-side .chat-content{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    flex: 1;
    filter: drop-shadow( 0 0 15px rgba(212, 243, 254, .3));
    will-change: transform;
  }
  .our-side .chat-content div{
    width: auto;
    display: inline-block;
    padding: 10px;
    background: #d4f3fe;
    margin-bottom: 7px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    position: relative;
    z-index: 2;
    line-height: 1.5;
  }
  .our-side .chat-content div:first-child{
    border-top-right-radius: 10px;
  }
  .our-side .chat-content div:nth-last-child(2){
    border-bottom-right-radius: 10px;
  }
  .our-side .chat-content .chat-time{
    font-size: 12px;
    color: #7e8299;
    margin-right: 8px;
  }
  .our-side .chat-portrait{
    margin-left: 10px;
    background: #d4f3fe;
  }

</style>

<style>
.our-enter-active, .our-leave-active,.our-move {
  transition: opacity .7s,transform .5s ease;
}
.our-enter, .our-leave-active {
  transform: translate3d(100%,0,0);
  opacity: 0;
}
.chat-enter-active, .chat-leave-active{
  transition: opacity .3s,transform .3s ease;
}
.chat-enter, .chat-leave-active {
  transform: translate3d(100%,0,0);
  opacity: 0;
}
.other-enter-active, .other-leave-active,.other-move {
  transition: opacity .7s,transform .5s ease,background-color 1s;
}
.other-enter, .other-leave-active {
  transform: translate3d(-100%,0,0);
  opacity: 0;
  background-color: #20d489;
}
.loading-enter-active{
  transition: none;
}
.loading-leave-active {
  transition: opacity 1s;
}
.loading-enter, .loading-leave-active {
  opacity: 0;
}
</style>
