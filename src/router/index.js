import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import {routes} from "@/router/routes";
import {getToken} from "@/utils/token";

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
};
let OriginReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function (location, resolve, reject) {
    // 如果resolve和reject都传入了相应函数
    if (resolve && reject) {
        // 使用call改变this指向为VueRouter，否则OriginReplace的this是指向window的，细品上边的浅拷贝
        OriginReplace.call(this, location, resolve, reject);
    } else {  //如果没有都传入则手动补充一个
        OriginReplace.call(this, location, () => {
        }, () => {
        })
    }
}
//对外暴露VueRouter实例
let router = new VueRouter({
    // 配置路由
    routes,
    // eslint-disable-next-line no-unused-vars
    scrollBehavior(to, from, savedPosition){
        //路由跳转的滚动条位置，y=0为最顶部
        return {y: 0}
    }
})
//使用全局路由守卫
//前置守卫(路由跳转之前进行判断)
// to: 跳转之后的路由 from: 发起跳转的原页面 next: 控制跳转,next()为放行,next(route)为放行到route
router.beforeEach((to, from, next) => {
    let token = getToken();
    console.log(to, token);
    // 如果用户已登录
    if(token){
        if(to.name === 'login' || to.name === 'register'){
            next('/home');
        }else{
            next();
        }
    }else{
        //如果用户未登录,访问购物车
        if(to.name === 'ShopCart'){
            next('/login');
        }else{
            next();
        }
    }
})

export default router;