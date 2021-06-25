import Notification from './notification.vue'

export default {
    extends: Notification,
    computed: {
        style(){
            return {
                position: 'fixed',
                right: '20px',
                top: `${this.verticalOffset}px`
            }
        }
    },
    data(){
      return {
          verticalOffset: 0,
          autoClose: 4500,
          height: 0,
          visible: false
      }
    },
    mounted(){
        this.createTimer();
    },
    methods: {
        createTimer () {
            if (this.autoClose) {
                this.timer = setTimeout(() => {
                    this.visible = false
                }, this.autoClose)
            }
        },
        clearTimer () {
            if (this.timer) {
                clearTimeout(this.timer)
            }
        },
        afterEnter () {
            this.height = this.$el.offsetHeight
        }, destruction () {
            this.visible = false
        },
    }
}