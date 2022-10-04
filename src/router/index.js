import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

//重写push与replace方法
// 浅拷贝原型方法
let OriginPush = VueRouter.prototype.push;
// 重写push方法
VueRouter.prototype.push = function (location, resolve, reject) {
    // 如果resolve和reject都传入了相应函数
    if (resolve && reject) {
        // 使用call改变this指向为VueRouter，否则OriginPush的this是指向window的，细品上边的浅拷贝
        OriginPush.call(this, location, resolve, reject);
    } else {  //如果没有都传入则手动补充一个
        OriginPush.call(this, location, () => {
        }, () => {
        })
    }
}

export default new VueRouter({
    routes: [
        {
            name: 'home',
            path: '/home',
            component: Home,
            meta: {
                show: true
            }
        },
        {
            name: 'search',
            path: '/Search/:keyword',
            component: Search,
            meta: {
                show: true
            }
        },
        {
            name: 'login',
            path: '/Login',
            component: Login,
            meta: {
                show: false
            }
        },
        {
            name: 'register',
            path: '/Register',
            component: Register,
            meta: {
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