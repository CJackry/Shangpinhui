import Vue from 'vue'
// import {createApp} from 'vue'
import App from './App.vue'
//引入路由
import router from "@/router";
//引入三级联动组件
import TypeNav from "@/components/TypeNav";
//引入轮播图组件
import Carousel from "@/components/Carousel";
//引入分页器组件
import Pagination from "@/components/Pagination";
// 注册全局组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
//引入仓库
import store from "@/store";

// //引入请求拦截器进行测试
// import {reqCategoryList} from "@/api";
// reqCategoryList();

// 引入mock模块直接执行
import "@/mock/mockServe";
// 引入swiper样式(全局引入则各组件使用的时候不需要再进行引入)
import 'swiper/js/swiper'
import 'swiper/css/swiper.css'

// 统一引入API中的请求，在不使用Vuex情况下方便管理使用
import * as API from './api'

new Vue({
    render: h => h(App),
    //注册路由
    router,
    //注册仓库
    store,
    beforeCreate() {
        //安装全局事件总线
        Vue.prototype.$bus = new Vue;
        //此时$API是一个对象，包含了api文件中的所有请求
        Vue.prototype.$API = API;
    }
}).$mount('#app')

// const app = createApp{App}.use(router)