//对api进行统一管理
import requests from "@/api/request";
//mock的请求
import mockRequests from './mockAjax';

//三级联动接口
// /api/product/getBaseCategoryList get 无参数

//axios发送请求返回结果Promise对象
export const reqCategoryList = () => requests({url: '/product/getBaseCategoryList', method: 'get'});
//通过mock获取生成的轮播图数据
export const reqBannerList = () => mockRequests.get('/banner');