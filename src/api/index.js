//对api进行统一管理
import requests from "@/api/request";

//三级联动接口
// /api/product/getBaseCategoryList get 无参数

//axios发送请求返回结果Promise对象
export const reqCategoryList = () => requests({url: '/product/getBaseCategoryList', method: 'get'});
export const reqBanner = () => requests({url: '/mock/banner', methods: 'get'});