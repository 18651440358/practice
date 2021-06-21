<!-- 行容器 -->
<script>
export default {
  name: "zc-row",
  props: {
    // 间隔
    spacing: Number,
    // 是否开启flex
    flex: Boolean,
    justify: {
      type: String,
      default: 'start',
      validator: function (val){
        return ['start','center','end','between','around'].includes(val);
      }
    },
    align: {
      type: String,
      default: 'top',
      validator: function (val){
        return ['top','center','bottom','stretch'].includes(val);
      }
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  watch: {
    flex: function (val) {
      this.flex = val
    }
  },
  computed: {
    style(){
      const value = {};
      // 查看是否需要间隔
      if(this.spacing){
        value.marginLeft = `-${this.spacing / 2}px`;
        value.marginRight = `-${this.spacing / 2}px`;
      }
      return value || {};
    }
  },
  render(createElement) {
    return createElement(this.tag, {
      class: [
          'zc-row',
          this.justify !== 'start' ? `justify-${this.justify}` : '',
          this.align !== 'top' ? `align-${this.align}` : '',
          {'flex': this.flex}
      ],
      style: this.style
    },this.$slots.default)
  }
}
</script>

<style scoped lang="scss">
  // 容器
  .zc-row{
    position: relative;
  }
  // 清除浮动，防止父级高度塌陷
  .zc-row::before,.zc-row:after{
    content: '';
    display: table;
  }
  .zc-row:after{
    clear: both;
  }

  // flex布局
  .zc-row.flex{
    display: flex;
  }
  .zc-row.flex::before,.zc-row.flex:after{
    content: none;
  }
  .zc-row.flex.justify-center{
    justify-content: center;
  }
  .zc-row.flex.justify-end{
    justify-content: flex-end;
  }
  .zc-row.flex.justify-between{
    justify-content: space-between;
  }
  .zc-row.flex.justify-around{
    justify-content: space-around;
  }

  .zc-row.flex.align-center{
    align-items: center;
  }
  .zc-row.flex.align-bottom{
    align-items: flex-end;
  }
  .zc-row.flex.align-stretch{
    align-items: stretch;
  }
</style>
