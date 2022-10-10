import Vue from 'vue'
// import {createApp} from 'vue'
import App from './App.vue'
//引入路由
import router from "@/router";
//引入三级联动组件
import TypeNav from "@/components/TypeNav";
// 注册全局组件
Vue.component(TypeNav.name, TypeNav);
//引入仓库
import store from "@/store";

// //引入请求拦截器进行测试
// import {reqCategoryList} from "@/api";
// reqCategoryList();

// 引入mock模块直接执行
import "@/mock/mockServe";
// 引入swiper样式
import 'swiper/js/swiper'
import 'swiper/css/swiper.css'

new Vue({
    render: h => h(App),
    //注册路由
    router,
    //注册仓库
    store
}).$mount('#app')

// const app = createApp{App}.use(router)