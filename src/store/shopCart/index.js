import {reqChoose, reqDeleteShopCart, reqShopCartList, reqUpdateShoppingCar} from "@/api";
import {getUUID} from "@/utils/uuid_token"

const state =  {
    ShopCartList: [],
    uuid_token: getUUID()
};
const mutations = {
    GETSHOPCARTLIST(state, ShopCartList){
        state.ShopCartList = ShopCartList[0];
    },
};
const getters = {

};
const actions = {
    // eslint-disable-next-line no-unused-vars
    async updateShoppingCar({commit}, {skuId, skuNum}){
        let res = await reqUpdateShoppingCar(skuId, skuNum);
        if(res.code === 200){
            return 'OK';
        }else{
            return Promise.reject(new Error('fail'));
        }
    },
    async getShopCartList({commit}){
        let res = await reqShopCartList();
        if(res.code === 200){
            commit("GETSHOPCARTLIST", res.data);
        }else{
            console.log(res.code);
        }
    },
    // eslint-disable-next-line no-unused-vars
    async sendUpdateShoppingCar({commit}, {skuId, skuNum}){
        let res = await reqUpdateShoppingCar(skuId, skuNum);
        if(res.code === 200){
            return 'OK';
        }else{
            return Promise.reject(res.code);
        }
    },
    // eslint-disable-next-line no-unused-vars
    async deleteShopCart({commit}, skuId){
        let res = await reqDeleteShopCart(skuId);
        if(res.code === 200){
            return 'OK';
        }else{
            return Promise.reject(res.code);
        }
    },
    // eslint-disable-next-line no-unused-vars
    async changeChoose({commit}, {skuId, isChecked}){
        let res = await reqChoose(skuId, isChecked);
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