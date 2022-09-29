import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';


export default new VueRouter({
    routes:[
        {
            path: '/home',
            component: Home,
            meta:{
                show: true
            }
        },
        {
            path: '/Search',
            component: Search,
            meta:{
                show: true
            }
        },
        {
            path: '/Login',
            component: Login,
            meta:{
                show: false
            }
        },
        {
            path: '/Register',
            component: Register,
            meta:{
                show: false
            }
        },
        //重定向
        {
            path: '*',
            redirect: '/home'
        }
    ]
})