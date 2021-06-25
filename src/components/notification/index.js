import Vue from 'vue';
import Notification from './notification.vue'
import notification from './instance'

export default () => {
    Vue.component(Notification.name,Notification);
    Vue.prototype.$rbNote = notification;
}
