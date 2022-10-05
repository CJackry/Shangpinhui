const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    //代理跨域
    devServer: {
        proxy: {
            //含有api路径的都会使用代理服务器
            '/api': {
                target: 'http://gmall-h5-api.atguigu.cn',
                pathRewrite: {'^api': ''},
            }
        }
    }
})
