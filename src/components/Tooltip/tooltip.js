import Vue from 'vue'
import main from './main.vue'

const tooltipConstructor = Vue.extend(main)

let tooltipInstance = null

export default function tooltip(options) {
    options = options || {}
    // 如果已经存在 tooltip 的实例,直接更新属性值
    // if (tooltipInstance && tooltipInstance.$el.parentNode) {
    //     Object.assign(tooltipInstance, options)
    //     if (tooltipInstance.target) {
    //         tooltipInstance.updateTip()
    //     } else {
    //         tooltipInstance.hiddenTip()
    //     }
    //     return tooltipInstance
    // }
    // 否则创建一个 tip 实例
    tooltipInstance = new tooltipConstructor({
        propsData: options
    }).$mount()
    document.body.appendChild(tooltipInstance.$el)
    tooltipInstance.updateTip()
    return tooltipInstance
}
