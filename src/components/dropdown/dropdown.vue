<script>
import pop from '@/util/floating'
export default {
  name: "ZcDropdown",
  componentName: 'ZcDropdown',
  mixins: [pop],
  data() {
    return {
      // 是否显示
      visible: false,
    }
  },
  props: {
    // 出发下拉菜单的方式
    mode: {
      type: String,
      default: 'click',
      validator: function (val){
        return ['hover', 'click'].includes(val);
      }
    }
  },
  methods: {
    // 初始化
    initialize() {
      // 将菜单栏目重新挂在body上
      this.trigger = this.$slots['default'][0].elm;
      this.dropdown = this.$slots['zc-dropdown-menu'][0].elm

      if (this.mode === 'click')
        this.trigger.addEventListener('click',this.triggerClick);

      // 当页面点击其他内容时隐藏
      document.addEventListener('click', event => {
        if(!this.trigger.contains(event.target) && this.dropdown && !this.dropdown.contains(event.target)){
          this.visible && this.hide()
        }
      })

      this.$on("menu-item-click", this.handleMenuItemClick)

    },
    // 被单机
    triggerClick() {
      this.visible ? this.hide() : this.show()
    },
    // 隐藏
    hide() {
      this.visible = false
    },
    // 显示
    show() {
      this.visible = true
    },
    // 自组件向上传值
    handleMenuItemClick(command, instance) {
      this.hide()
      this.$emit("command", command, instance)
    }
  },
  watch: {
    visible(val) {
      this.broadcast(this.$children, "ZcDropdownMenu", "visible", [val])
    }
  },
  mounted() {
    // 初始化
    this.initialize();
  },
  render() {
    return (
        <div class="zc-dropdown">
          {this.$slots['default']}
          {this.$slots['zc-dropdown-menu']}
        </div>
    )
  }
}
</script>

