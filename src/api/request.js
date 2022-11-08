// 对axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
//引入进度条样式，修改进度条样式直接去该目录下的css文件下改
import "nprogress/nprogress.css";
import store from "@/store"

//利用axios对象的方法create来创建一个axios实例
//requests就是axios一个实例，但是可以自行进行配置
const requests = axios.create({
    //配置对象
    //基础路径
    baseURL: '/api',
    //响应超时时间
    timeout: 5000,
});
//请求拦截器，再发送请求前请求拦截器都能检测，执行
requests.interceptors.request.use((config) => {
    //是否需要携带token
    if(store.state.user.token){
        // console.log('token', store.state.user.token);
        config.headers.token = store.state.user.token;
    }//如果没有token则携带uuid
    else if(store.state.shopCart.uuid_token){
        console.log('uuid', store.state.shopCart.uuid_token);
        //userTempId是后端定义好的需要的请求头字段
        config.headers.userTempId = store.state.uuid_token;
    }
    //进度条开始
    nprogress.start();
    //config：配置对象，对象里headers请求头很重要
    return config;
});

// 响应拦截器
requests.interceptors.response.use((res) => {
    //进度条结束
    nprogress.done();
    //响应成功的回调函数：服务器返回数据后，该拦截器能够检测，执行
    return res.data;
}, () => {
    return Promise.reject(new Error('fail'));
})

export default requests;


