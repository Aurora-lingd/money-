import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
// js有个潜规则如果它引入了目录，那么它会直接找index
import router from './router';
import store from './store';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import Nav from '@/components/Nav.vue';
import tagListModel from '@/models/tagListModel';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

window.tagList = tagListModel.fetch()
window.createTag = (name: string)=>{
    const message= tagListModel.create(name)
    if (message === 'duplicated') {
        window.alert('标签名重复');
    } else if (message === 'success') {
        window.alert('添加成功');
    }
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
