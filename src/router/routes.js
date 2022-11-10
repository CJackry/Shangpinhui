import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Center from "@/pages/Center";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import myOrder from "@/pages/Center/myOrder";
import groupOrder from "@/pages/Center/groupOrder";

export const routes = [
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
    {
        name: 'detail',
        path: '/Detail/:id',
        component: Detail,
        meta: {
            show: true
        }
    },
    {
        name: 'AddCartSuccess',
        path: '/AddCartSuccess',
        component: AddCartSuccess,
        meta: {
            show: true
        }
    },
    {
        name: 'ShopCart',
        path: '/ShopCart',
        component: ShopCart,
        meta: {
            show: true
        }
    },
    {
        name: 'Trade',
        path: '/Trade',
        component: Trade,
        meta: {
            show: true
        }
    },
    {
        name: 'Center',
        path: '/Center',
        component: Center,
        children:[
            //children的path要么直接写路由名要么就要把完整路径写全
            //如要是写的是/myOrder,则跳转的时候会变成localhost:3000/#/myOrder
            {
                path: 'myOrder',
                component: myOrder
            },
            {
                path: 'groupOrder',
                component: groupOrder
            },
            //Center是父，则直接/Center
            {
                path: '/Center',
                redirect: 'myOrder'
            }
        ],
        meta: {
            show: true
        }
    },
    {
        name: 'Pay',
        path: '/Pay',
        component: Pay,
        meta: {
            show: true
        }
    },
    {
        name: 'PaySuccess',
        path: '/PaySuccess',
        component: PaySuccess,
        meta: {
            show: true
        }
    },

    //重定向

    // {
    //     path: '*',
    //     redirect: '/home'
    // }
]