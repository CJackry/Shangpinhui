//存储home组建的小仓库
import {reqCategoryList, reqBannerList, reqFloorList} from "@/api";

//state: 仓库存储数据的地方
const state = {
    // state中数据默认不能随便写
    categoryList: [],
    bannerList: [],
    floorList: []
};
//mutations:对仓库数据进行操作的唯一途径
const mutations = {
    GETCATEGORYLIST(state, categoryList){
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList){
        state.bannerList = bannerList;

    },
    GETFLOORLIST(state, floorList){
        state.floorList = floorList;
    }
};
//actions: 处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 由于该请求返回的是一个Promise，要获取Promise成功的数据，要使用async await
    //commit
    async getCategoryList({commit}){
        let res = await reqCategoryList();
        if(res.code === 200){
            //传递给mutation中的CATEGORYLIST，注入参数res.data
            commit('GETCATEGORYLIST', res.data);
        }else{
            console.log(res.code);
        }
    },
    async getBannerList({commit}){
        let res = await reqBannerList();
        if(res.code === 200){
            //传递给mutation中的CATEGORYLIST，注入参数res.data
            commit('GETBANNERLIST', res.data);
        }else{
            console.log(res.code);
        }
    },
    async getFloorList({commit}){
        let res = await reqFloorList();
        if(res.code === 200){
            commit('GETFLOORLIST', res.data);
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