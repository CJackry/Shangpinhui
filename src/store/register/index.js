import {reqCode} from "@/api";

const state = {
    captchaCode: '',
};
const mutations = {
    GETCAPTCHACODECODE(state, captchaCode){
        state.captchaCode = captchaCode;
    }
};
const getters = {

};
const actions = {
    async getCaptchaCode({commit}, phone){
        let res = await reqCode(phone);
        if(res.code === 200){
            commit('GETCAPTCHACODECODE', res.data);
        }else{
            console.log(res.code);
        }
    }
};
export default {
    state,
    mutations,
    getters,
    actions
}