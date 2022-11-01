import {reqEditShopCartNum, reqShopCartList} from "@/api";
import {getUUID} from "@/utils/uuid_token"

const state =  {
    ShopCartList: [],
    uuid_token: getUUID()
};
const mutations = {
    GETSHOPCARTLIST(state, ShopCartList){
        state.ShopCartList = ShopCartList;
    },
};
const getters = {
    cartInfoList(state){
        return state.ShopCartList[0].cartInfoList||[];
    }
};
const actions = {
    async getShopCartList({commit}){
        let res = await reqShopCartList();
        if(res.code === 200){
            commit("GETSHOPCARTLIST", res.data);
        }else{
            console.log(res.code);
        }
    },
    async getEditShopCartNum(skuId, skuNum){
        let res = await reqEditShopCartNum(skuId, skuNum);
        if(res.code === 200){
            return 'OK';
        }else{
            return Promise.reject(res.code);
        }
    }
}
export default {
    state,
    mutations,
    getters,
    actions
}