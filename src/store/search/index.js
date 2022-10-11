import {reqSearchList} from "@/api";
//存储search组建的小仓库
//store配置
//state: 仓库存储数据的地方
const state = {
    SearchList: [],
};
//mutations:对仓库数据进行操作的唯一途径
const mutations = {
    GETSEARCHLIST(state, searchList){
        state.SearchList = searchList;
    }
};
//actions: 处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //params形参，当用户派发action的时候，第二个参数传递过来，设置默认值为空对象
    async getSearchList({commit}, params={}){
        //带参数的POST请求，所以params至少要是个空对象
        let res = await reqSearchList(params);
        if(res.code === 200){
            commit('GETSEARCHLIST', res.data);
        }else{
            console.log(res.code);
        }
    }
};
//getters: 可以理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}