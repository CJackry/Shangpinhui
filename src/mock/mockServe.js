//引入mock模块，Mock是一个对象
import Mock from 'mockjs';
//引入json数据
//webpack默认对外暴露的有：图片、JSON数据格式，因此可以直接引入
import banner from './banner.json';
import floor from './floor.json';

//mock数据，第一个参数请求地址，第二个为请求的数据
Mock.mock('/mock/banner', {code:200, data:banner});
Mock.mock('/mock/floor', {code:200, data:floor});

// 因为mock只需要执行就行，因此不需要对外暴露