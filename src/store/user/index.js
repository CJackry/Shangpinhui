import {reqCode, reqLogin, reqLogout, reqRegister, reqUserInfo} from "@/api";
import {clearToken, getToken, setToken} from "@/utils/token";

const state = {
    captchaCode: '',
    token: getToken()||'',
    userInfo: {}
};
const mutations = {
    GETCAPTCHACODECODE(state, captchaCode) {
        state.captchaCode = captchaCode;
    },
    SENDLOGIN(state, token) {
        state.token = token;
        setToken(token);
    },
    GETUERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    CLEARLOGIN(state){
        state.token = '';
        state.userInfo = {};
        clearToken();
    }
};
const getters = {};
const actions = {
    async getCaptchaCode({commit}, phone) {
        let res = await reqCode(phone);
        if (res.code === 200) {
            commit('GETCAPTCHACODECODE', res.data);
        } else {
            console.log(res.code);
        }
    },
    // eslint-disable-next-line no-unused-vars
    async sendRegister({commit}, userInfo) {
        let res = await reqRegister(userInfo);
        if (res.code === 200) {
            return 'OK';
        } else {
            console.log(res.code);
        }
    },
    async sendLogin({commit}, userInfo) {
        let res = await reqLogin(userInfo);
        if (res.code === 200) {
            commit('SENDLOGIN', res.data.token);
        } else {
            console.log(res.code);
        }
    },
    // eslint-disable-next-line no-unused-vars
    async getUserInfo({commit}) {
        let res = await reqUserInfo();
        if (res.code === 200) {
            commit('GETUERINFO', res.data);
        } else {
            console.log(res.code);
        }
    },
    async sendLogout({commit}){
        let res = await reqLogout();
        if(res.code === 200){
            //action不能用来操作state的数据,只有mutation才可以,所以先提交mutation
            commit('CLEARLOGIN');
            return 'OK';
        }else{
            return Promise.reject('fail');
        }
    }
};
export default {
    state,
    mutations,
    getters,
    actions
}