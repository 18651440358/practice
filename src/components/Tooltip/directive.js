import Tooltip from './tooltip.js'
import { EventBus } from "@/util/event-bus.js";

function clearEvent (el) {
    if (el._tipHandler) {
        el.removeEventListener('mouseenter', el._tipHandler)
    }
    if (el._tipMouseleaveHandler) {
        el.removeEventListener('mouseleave', el._tipMouseleaveHandler)
    }
    delete el._tipHandler
    delete el._tipMouseleaveHandler
    delete el._tipOptions
    delete el._tipInstance
}

var publicInstance = null

// 位置更新
function calculation(basis,self,placements){
    if(!basis || !self) return;

    publicInstance.boxX = 0
    publicInstance.boxY = 0
    const pBox = basis.getBoundingClientRect()
    const bBox = self.getBoundingClientRect()

    // 判断主题
    var background = document.getElementsByTagName('html')[0].getAttribute('data-theme') === "tuke" ? '#000' : '#fff'

    if(placements === "left"){
        // 窗体位置
        publicInstance.boxX = pBox.width + pBox.x + 10
        publicInstance.boxY = pBox.height / 2 + pBox.y - bBox.height / 2
        // 箭头
        publicInstance.arrowsPos = {
            top: `${bBox.height / 2 - 5}` + 'px',
            left: '-10px',
            borderColor: `transparent ${background} transparent transparent`
        }
    }else if(placements === "bottom"){
        // 窗体位置
        publicInstance.boxX = pBox.width / 2 + pBox.x - bBox.width / 2
        publicInstance.boxY = pBox.height + pBox.y + 10
        // 箭头
        publicInstance.arrowsPos = {
            top: '-10px',
            left: `${bBox.width / 2 - 5}` + 'px',
            borderColor: `transparent transparent ${background} transparent`
        }
    }else if(placements === "right"){
        // 窗体位置
        publicInstance.boxX = pBox.x - bBox.width - 10
        publicInstance.boxY = pBox.height / 2 + pBox.y - bBox.height / 2
        // 箭头
        publicInstance.arrowsPos = {
            top: `${bBox.height / 2 - 5}` + 'px',
            left: `${bBox.width}` + 'px',
            borderColor: `transparent transparent transparent ${background}`
        }
    }else if(placements === "top"){
        // 窗体位置
        publicInstance.boxX = pBox.width / 2 + pBox.x - bBox.width / 2
        publicInstance.boxY = pBox.y - bBox.height - 10
        // 箭头
        publicInstance.arrowsPos = {
            top: `${bBox.height}` + 'px',
            left: `${bBox.width / 2 - 5}` + 'px',
            borderColor: `${background} transparent transparent transparent`
        }
    }

}



export default {
    install (Vue, options) {
        options = options || {}
        // 自定义指令的名字，默认为 rb-tip
        const name = 'zc-tip' || options.directiveName

        // rb-tip 的展示方向
        const allPlacements = ['left','bottom','right','top']

        Vue.directive(name, {
            bind (el, binding) {
                clearEvent(el)
                const limitPlacementQueue = allPlacements.filter(placement => binding.modifiers[placement])
                el._tipOptions = binding.value
                el._tipHandler = function tipHandler() {
                    if (this._tipOptions == null) return
                    const options = this._tipOptions
                    const placements = limitPlacementQueue.length
                        ? limitPlacementQueue : allPlacements
                    const mix = {
                        placements,
                    }
                    // 一般情况为 v-rb-tip 绑定需要显示的内容
                    // 需要配置时可以直接绑定一个配置对象
                    const tipOptions = typeof options === 'object'
                        ? Object.assign(mix, options, {target: this})
                        : Object.assign(mix, {content: String(options), target: this})
                    this._tipInstance = publicInstance = Tooltip(tipOptions)
                    this._tipInstance.showTip()
                    this._tipInstance.transitionName = placements[0]
                    var _this = this;
                    this._tipInstance.$nextTick(function () {
                        calculation(el,_this._tipInstance.$el,placements[0]);
                    })
                    EventBus.$on('majorScroll',function (){
                        _this._tipInstance && calculation(el,_this._tipInstance.$el,placements[0]);
                    })
                }
                el._tipMouseleaveHandler = function tipMouseleaveHandler () {
                    if (this._tipInstance) {
                        this._tipInstance.hiddenTip()
                    }
                }
                el.addEventListener('mouseenter', el._tipHandler)
                el.addEventListener('mouseleave', el._tipMouseleaveHandler)
            },

            update (el, { value, oldValue }) {
                if (value === oldValue) return
                el._tipOptions = value
            },

            unbind (el) {
                const instance = el._tipInstance
                if (instance && instance.destroy) {
                    instance.destroy()
                }
                clearEvent(el)
            }
        })
    }
}
