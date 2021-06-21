<template>
  <transition :name="transitionName" @after-leave="destroy">
<!--    弹窗容器-->
    <div class="rb-tooltip-container" v-show="content != '' && visible" :style="boxStyle"
         @mouseenter="showTip"
         @mouseleave="hiddenTip()">
<!--      内容区-->
      <p v-html="content"></p>
<!--      小箭头-->
      <div class="rb-tooltip-arrow" :style="arrowBox"></div>
    </div>
  </transition>
</template>

<script>

export default {
  name: "RbTooltip",
  props: {
    // 需要显示的提示文字
    content: String,
  },
  data() {
    this.visibleTimer = null
    return {
      // 动画名
      transitionName: 'left',
      // 是否显示
      visible: false,
      arrowsPos: {},
      boxX: 0,
      boxY: 0,
      duration: 150
    }
  },
  methods: {
    // 显示 tip
    showTip () {
      clearTimeout(this.visibleTimer)
      this.visible = true
    },
    // 隐藏 tip
    hiddenTip () {
      this.setVisible(false)
    },
    // 更新 tip 位置
    updateTip () {

    },
    setVisible(v){
      clearTimeout(this.visibleTimer)
      this.visibleTimer = setTimeout(() => {
        this.visible = v
        this.visibleTimer = null
      }, this.duration)
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
  computed: {
    arrowBox () {
      return Object.assign({
        borderWidth: '5px',
        borderStyle: 'solid',
        position: 'absolute'
      }, this.arrowsPos)
    },
    boxStyle () {
      const width = this.width
      return {
        width: typeof width === 'string' ? width : `${width}px`,
        zIndex: this.zIndex,
        left: `${this.boxX}px`,
        top: `${this.boxY}px`,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  // 弹窗容器
  .rb-tooltip-container{
    position: fixed;
    max-width: 200px;
    padding: .6rem .75rem;
    background: #fff;
    border-radius: 5px;
    z-index: 100;
    display: flex;
    align-items: center;
    will-change: transform;
    filter: drop-shadow(0 0 40px rgba(82,63,105,0.3));
  }
  // 内容区域
  .rb-tooltip-container p{
    display: inline-block;
    line-height: 16px;
    font-weight: 500;
    font-size: 13px;
  }

  // 小箭头
  .rb-tooltip-arrow{
    width: 0;
    height: 0;
    z-index: 200;
  }

  // 动画部分
  // ---------------------------------------------------
  .left-enter,.left-leave-to{
    transform: translate3d(10%,0,0);
    opacity: 0;
  }
  .left-enter-active{
    transition: transform 200ms linear,opacity .3s ease;
  }
  .left-leave-active{
    transition: transform 200ms linear, opacity .3s ease;
  }
  .left-enter-to,.left-leave{
    transform: translate3d(00%,0,0);
    opacity: 1;
  }

  // ---------------------------------------------------
  .bottom-enter,.bottom-leave-to{
    transform: translate3d(0,30%,0);
    opacity: 0;
  }
  .bottom-enter-active{
    transition: transform 200ms linear,opacity .3ms ease;
  }
  .bottom-leave-active{
    transition: transform 200ms linear, opacity .3s ease;
  }
  .bottom-enter-to,.bottom-leave{
    transform: translate3d(0,0,0);
    opacity: 1;
  }

  // ---------------------------------------------------
  .right-enter,.right-leave-to{
    transform: translate3d(-10%,0,0);
    opacity: 0;
  }
  .right-enter-active{
    transition: transform 200ms linear,opacity .3ms ease;
  }
  .right-leave-active{
    transition: transform 200ms linear, opacity .3s ease;
  }
  .right-enter-to,.right-leave{
    transform: translate3d(0,0,0);
    opacity: 1;
  }

  // ---------------------------------------------------
  .top-enter,.top-leave-to{
    transform: translate3d(0,-30%,0);
    opacity: 0;
  }
  .top-enter-active{
    transition: transform 200ms linear,opacity .3ms ease;
  }
  .top-leave-active{
    transition: transform 200ms linear, opacity .3s ease;
  }
  .top-enter-to,.right-leave{
    transform: translate3d(0,0,0);
    opacity: 1;
  }

</style>
