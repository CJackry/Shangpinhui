//对api进行统一管理
import requests from "@/api/request";
//mock的请求
import mockRequests from './mockAjax';

//三级联动接口
// /api/product/getBaseCategoryList get 无参数

//axios发送请求返回结果Promise对象
export const reqCategoryList = () => requests({url: '/product/getBaseCategoryList', method: 'get'});
//携带商品id发起详情请求
export const reqGoodDetails = (skuid) => requests({url: `item/${skuid}`, method: 'get'});
//加入购物车请求||对购物车商品数量进行修改 /api/cart/addToCart/{ skuId }/{ skuNum } POST
export const reqUpdateShoppingCar = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
});
//带参数的POST请求，params至少是个空对象，因此调用的时候一定要带上参数！！！
export const reqSearchList = (params) => requests(({url: '/list', method: 'POST', data: params}));
//获取购物车列表 /api/cart/cartList GET
export const reqShopCartList = () => requests({url: '/cart/cartList', method: 'get'});
//删除购物车商品 /api/cart/deleteCart/{skuId}
export const reqDeleteShopCart = (skuId) => requests({url: `/cart/deleteCart/${skuId}`, method: 'delete'});
// 请求验证码 /api/user/passport/sendCode/{phone} get
export const reqCode = (phone) => requests({url: `/user/passport/sendCode/${phone}`, method: 'get'});
// 注册用户 /api/user/passport/user post
export const reqRegister = (userInfo) => requests({url: '/user/passport/register', method: 'post', data: userInfo});
// 用户登录 /api/user/passport/login post
export const reqLogin = (userInfo) => requests({url: '/user/passport/login', method: 'post', data: userInfo});
// 获取用户信息 api/user/passport/auth/getUserInfo get
export const reqUserInfo = () => requests({url: '/user/passport/auth/getUserInfo', method: 'get'});
// 退出登录 /api/user/passport/logout get
export const reqLogout = () => requests(({url: '/user/passport/logout', method: 'get'}));
// 获取交易页数据 /api/order/auth/trade get
export const reqTrade = () => requests({url: '/order/auth/trade', method: 'get'});
// 获取用户地址 /api/user/userAddress/auth/findUserAddressList get
export const reqUserAddress = () => requests({url: '/user/userAddress/auth/findUserAddressList', method: 'get'});
// 提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo} post
export const reqSubmitOrder = (tradeNo, data) => requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: 'post',
    data: data
})
// 获取订单支付信息 /api/payment/weixin/createNative/{orderId} get
export const reqPayInfo = (orderId) => requests({url: `/payment/weixin/createNative/${orderId}`, method: 'get'})
// 获取支付订单状态 /api/payment/weixin/queryPayStatus/{orderId} get
export const reqPayStatus = (orderId) => requests({url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get'});
// 获取我的订单列表 /api/order/auth/{page}/{limit} get
export const reqMyOrderList = (page, limit) => requests({url: `/order/auth/${page}/${limit}`, method: 'get'});



//通过mock获取生成的轮播图数据
export const reqBannerList = () => mockRequests.get('/banner');
export const reqFloorList = () => mockRequests.get('/floor');