import Vue from 'vue'
// import {createApp} from 'vue'
import App from './App.vue'
//引入路由
import router from "@/router";

new Vue({
    render: h => h(App),
    router
}).$mount('#app')

// const app = createApp{App}.use(router)