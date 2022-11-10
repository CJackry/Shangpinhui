import {reqTrade, reqUserAddress, reqMyOrderList} from "@/api";

const state = {
    tradeInfo: {},
    userAddress: [],
    myOrderList: []
};
const mutations = {
    REQTRADE(state, tradeInfo) {
        state.tradeInfo = tradeInfo;
    },
    GETUSERADDRESS(state, userAddress) {
        state.userAddress = userAddress;
    },
    GETMYORDERLIST(state, myOrderList){
        state.myOrderList = myOrderList;
    }
};
const getters = {
    goodTradeList(state) {
        return state.tradeInfo.detailArrayList||[];
    },

};
const actions = {
    async getTrade({commit}) {
        let res = await reqTrade();
        if (res.code === 200) {
            commit("REQTRADE", res.data);
        } else {
            console.log("getTrade failed: ", res.code);
        }
    },
    async getUserAddress({commit}) {
        let res = await reqUserAddress();
        if (res.code === 200) {
            commit("GETUSERADDRESS", res.data);
        } else {
            console.log("getUserAddress failed: ", res.code);
        }
    },
    async getMyOrderList({commit}, {page, limit}){
        let res = await reqMyOrderList(page, limit);
        if(res.code === 200){
            commit('GETMYORDERLIST', res.data);
        }
    }
};

export default {
    state,
    mutations,
    getters,
    actions
}
