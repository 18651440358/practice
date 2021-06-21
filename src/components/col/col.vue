<!-- 行容器 -->
<script>
export default {
  name: "zc-col",
  props: {
    // 栅格数
    grid: {
      type: Number,
      default: 24
    },
    tag: {
      type: String,
      default: 'div'
    },
    // 左侧偏移
    offset: Number,
  },
  computed: {
    hasGrid() {
      let parent = this.$parent;
      while (parent && parent.$options.name !== 'zc-row') {
        parent = parent.$parent;
      }
      return parent ? parent.spacing : 0;
    }
  },
  render(createElement) {
    let classList = [];
    // 处理行内式
    let style = {};
    if (this.hasGrid) {
      style.paddingRight = style.paddingLeft = this.hasGrid / 2 + 'px';
    }

    // 给
    ['grid', 'offset'].forEach(prop => {
      if (this[prop] || this[prop] === 0) {
        classList.push(
            prop !== 'grid'
                ? `grid-${prop}-${this[prop]}`
                : `offset-${this[prop]}`
        );
        prop === 'grid'
           ?Object.assign(style,{
              width: `${this[prop] / 24 * 100}%`
           })
           :Object.assign(style,{
              marginLeft: `${this[prop] / 24 * 100}%`,
              float: "left"
           })
      }
    });

    return createElement(this.tag, {
      class: ['zc-col',
              classList
      ],
      style: style,
    }, this.$slots.default);
  }
}
</script>
