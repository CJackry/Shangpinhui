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