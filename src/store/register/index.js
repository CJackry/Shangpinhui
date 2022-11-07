import {reqCode, reqRegister} from "@/api";

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
    },
    // eslint-disable-next-line no-unused-vars
    async sendRegister({commit}, userInfo){
        let res = await reqRegister(userInfo);
        if(res.code === 200){
            return 'OK';
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