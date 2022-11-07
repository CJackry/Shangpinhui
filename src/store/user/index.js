import {reqCode, reqLogin, reqRegister, reqUserInfo} from "@/api";

const state = {
    captchaCode: '',
    token: ''
};
const mutations = {
    GETCAPTCHACODECODE(state, captchaCode){
        state.captchaCode = captchaCode;
    },
    SENDLOGIN(state, token){
        state.token = token;
        localStorage.setItem('token', token);
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
    },
    async sendLogin({commit}, userInfo){
        let res = await reqLogin(userInfo);
        if(res.code === 200){
            commit('SENDLOGIN', res.data.token);
        }else{
            console.log(res.code);
        }
    },
    // eslint-disable-next-line no-unused-vars
    async getUserInfo({commit}){
        let res = await reqUserInfo();
        console.log(res);
}
};
export default {
    state,
    mutations,
    getters,
    actions
}