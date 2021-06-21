import Chat from './chat-sidebar-card.js'
export default {
    install(Vue, options) {
        options = options || {}
        // 自定义指令的名字，默认为 zc-chat
        const name = 'zc-chat' || options.directiveName

        // rb-tip 的展示方向
        const allForm = ['private','public']

        Vue.directive(name,{
            bind(el, binding){
                const limitPlacementQueue = allForm.filter(placement => binding.modifiers[placement])
                el._tipOptions = binding.value
                el._chatHandler = function chatHandler() {
                    if (this._tipOptions == null) return;
                    const tipOptions = {
                        targetUserCode: binding.value,
                        chatForm: limitPlacementQueue[0]
                    }
                    this._tipInstance = Chat(tipOptions)
                    this._tipInstance.showTip()
                }
                el.addEventListener('click',el._chatHandler)
            }
        })
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
    }
}
