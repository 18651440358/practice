<template>
  <div class="zc-table" ref="table" :style="tableStyle">
    <vuescroll :ops="ops" @handle-scroll="tableScroll">
      <div class="table-container">
<!--      左侧固定表格-->
      <table class="left" :style="leftStyle" v-if="$slots.leftThead" ref="left" :class="{'leftSide':this.scrollLeft > 0}">
        <colgroup>
          <col :width="$slots.leftThead[0].children[0].data.attrs.width" />
        </colgroup>
        <thead :style="fixedThead">
          <slot name="leftThead" />
        </thead>
        <tbody>
          <slot name="leftTbody" />
        </tbody>
      </table>
<!--      主表格-->
      <table class="main" v-if="commence" ref="main">
        <colgroup>
          <col :width="item.data.attrs.width" v-for="(item,index) in $slots.mainThead[0].children" :key="'col-'+index" />
        </colgroup>
        <thead :style="fixedThead">
          <slot name="mainThead" />
        </thead>
        <tbody>
          <slot name="mainTbody" />
        </tbody>
      </table>
<!--      右侧固定表格-->
      <table class="right" :style="rightStyle" ref="right" v-if="$slots.rightThead" :class="{'rightSide':this.mainWidth * -1 + this.tableWidth - this.leftWidth - this.rightWidth + this.scrollLeft < 0}">
        <colgroup>
          <col :width="$slots.rightThead[0].children[0].data.attrs.width" />
        </colgroup>
        <thead :style="fixedThead">
          <slot name="rightThead" />
        </thead>
        <tbody>
          <slot name="rightTbody" />
        </tbody>
      </table>

      </div>
    </vuescroll>
  </div>
</template>

<script>
import vuescroll from 'vuescroll';
export default {
name: "zc-table",
  components: {vuescroll},
  data () {
    return {
      // 滚动条设置
      ops: {
        bar: {
          opacity: 0,
        }
      },
      // 表格滚动距离
      scrollTop: 0,
      scrollLeft: 0,
      // 表格宽度
      tableWidth: 0,
      // 可以固定
      commence: false,
      // 左侧表格宽度
      leftWidth: 0,
      // 右侧表格宽度
      rightWidth: 0,
      // 主表格宽度
      mainWidth: 0
    }
  },
  props: {
    tableHeight: {
      type: Number,
      default: 0
    }
  },
  created() {

  },
  computed: {
    rightStyle() {
      return {
        width: `${this.$slots.rightThead[0].children[0].data.attrs.width}px`,
        transform: `translate3d(${this.mainWidth * -1 + this.tableWidth - this.leftWidth - this.rightWidth + this.scrollLeft}px,0,0)`
      }
    },
    leftStyle(){
      return {
        width: `${this.$slots.leftThead[0].children[0].data.attrs.width}px`,
        transform: `translate3d(${this.scrollLeft}px,0,0)`,
      }
    },
    mainStyle(){

      return {
        width: this.commence?`${this.mainWidth}px`:'100%'
      }
    },
    fixedThead(){
      return {
        transform: `translate3d(0,${this.scrollTop}px,1px)`
      }
    },
    tableStyle(){
      return {
        width: this.commence?`${this.tableWidth}px`:'100%',
        height: this.tableHeight==-1?'100%':`${this.tableHeight}px`
      }
    }
  },
  watch: {

  },
  mounted () {
    this.$nextTick(function (){
      this.init();
    })
  },
  methods: {
    // 初始化
    init(){
      var that = this;
      // 初始化表格宽度
      this.tableWidth = this.$refs.table.offsetWidth;
      this.commence = true;

      // 左侧表格宽度
      if(this.$refs.left)
        this.leftWidth = this.$slots.leftThead[0].children[0].data.attrs.width
      // 右侧表格宽度
      if(this.$refs.right)
        this.rightWidth = this.$slots.rightThead[0].children[0].data.attrs.width
      if(this.commence)
        this.$slots.mainThead[0].children.forEach(function (item){
          that.mainWidth += item.data.attrs.width
        })
    },
    // 表格开始滚动
    tableScroll(vertical, horizontal){
      this.scrollTop = vertical.scrollTop
      this.scrollLeft = horizontal.scrollLeft
    }
  }
}
</script>

<style scoped lang="scss">
  .zc-table{

  }
  .zc-table table{
    width: 100%;
    table-layout: fixed;
    transform-style: preserve-3d;
    will-change: transform;
    border-collapse: collapse;
    background: #fff;
  }
  .table-container{
    display: flex;
  }
  .left,.right{
    z-index: 2;
  }
  .main{
    overflow-x: auto;
  }
  .covering{
    visibility: hidden;
  }
  .left.leftSide{
    box-shadow: 0 0 10px rgba(0,0,0,.12);
  }
  .right.rightSide{
    box-shadow: 0 0 10px rgba(0,0,0,.12);
  }
</style>
