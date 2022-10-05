//存储home组建的小仓库
import {reqCategoryList} from "@/api";

//state: 仓库存储数据的地方
const state = {};
//mutations:对仓库数据进行操作的唯一途径
const mutations = {
    CATEGORYLIST(){
        reqCategoryList();
    }
};
//actions: 处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 由于该请求返回的是一个Promise，要获取Promise成功的数据，要使用async await
    //commit
    async CategoryList({commit}){
        let res = await reqCategoryList();

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