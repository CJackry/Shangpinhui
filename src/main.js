import Vue from 'vue'
// import {createApp} from 'vue'
import App from './App.vue'
//引入路由
import router from "@/router";
//引入三级联动组件
import TypeNav from "@/pages/Home/TypeNav";
// 注册全局组件
Vue.component(TypeNav.name, TypeNav);

new Vue({
    render: h => h(App),
    router
}).$mount('#app')

// const app = createApp{App}.use(router)