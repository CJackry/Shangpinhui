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
    scrollBehavior(to, from, savedPosition) {
        //路由跳转的滚动条位置，y=0为最顶部
        return {y: 0}
    }
})
//使用全局路由守卫
//前置守卫(路由跳转之前进行判断)
// to: 跳转之后的路由 from: 发起跳转的原页面 next: 控制跳转,next()为放行,next(route)为放行到route
router.beforeEach((to, from, next) => {
    // 已登录后无法前往的页面
    let routesForbidWithoutToken = ['login', 'register'];
    // 未登录需要跳转到登录的页面
    let routeNeedsLogin = ['Pay', 'paySuccess', 'ShopCart', 'myOrder', 'groupOrder', 'Trade'];
    // 未登录需要跳转到登陆页面并待登陆后返回原页面
    let routeNeedsLoginWithGoBack = ['ShopCart', 'myOrder', 'groupOrder', 'Trade']
    let token = getToken();
    // 如果用户已登录
    if (token) {
        if (routesForbidWithoutToken.find(route => route === to.name)) {
            console.log('用户已登录，', to.name, '禁止访问');
            next('/home');

        }else{
            next();
        }
        //用户已登录
    } else {
        if (routeNeedsLogin.find(route => route === to.name)) {
            console.log('用户未登录，', to.name, '跳转至登录页');
            next('/login');
        }
    }
// //如果用户跳转到了登录页，要是从特定路由（routeNeedsLoginWithGoBack）跳转来的，则登陆后跳转到原页面
// if(to.name === 'login' && routeNeedsLoginWithGoBack.indexOf(from.name) !== -1){
//     // eslint-disable-next-line no-debugger
//     debugger;
//     next(from.name);

})

export default router;