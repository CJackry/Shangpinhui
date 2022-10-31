import {reqGoodDetails} from "@/api";
import {reqAddShoppingCar} from "@/api";

const state =  {
    goodDetails: {},
};
const mutations = {
    GETGOODDETAILS(state, goodDetails){
        state.goodDetails = goodDetails;
    },
};
const getters = {
    goodInfo(state){
        return state.goodDetails.skuInfo||{};
    },
    goodAttr(state) {
        return state.goodDetails.spuSaleAttrList || [];
    },
    categoryView(state){
        //goodDetails初始状态下是个空对象，空对象的属性值为undefined，因此会报错一次categoryView的category1Name为undefined
        //为防止出现假报错属性值为undefined，添加一个设置为空对象，返回的至少是个空对象
        return state.goodDetails.categoryView||{}
    }
};
const actions = {
    async getGoodDetails({commit}, skuid){
        let res = await reqGoodDetails(skuid);
        if(res.code === 200){
            commit("GETGOODDETAILS", res.data);
        }else{
            console.log(res.code);
        }
    },
    // eslint-disable-next-line no-unused-vars
    async addShoppingCar({commit}, {skuId, skuNum}){
        let res = await reqAddShoppingCar(skuId, skuNum);
        if(res.code === 200){
            return 'OK';
        }else{
            return Promise.reject();
        }
    }
}
export default {
    state,
    mutations,
    getters,
    actions
}