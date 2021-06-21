import Vue from 'vue'
import main from './main.vue'

const chatConstructor = Vue.extend(main)

let chatInstance = null

export default function chat(options) {
    options = options || {}
    // 如果已经存在 tooltip 的实例,直接更新属性值
    if (chatInstance && chatInstance.$el.parentNode) {
        Object.assign(chatInstance, options)
        chatInstance.updateTip()
        return chatInstance
    }
    // 否则创建一个 tip 实例
    chatInstance = new chatConstructor({
        propsData: options
    }).$mount()
    document.body.appendChild(chatInstance.$el)
    chatInstance.updateTip()
    return chatInstance
}
