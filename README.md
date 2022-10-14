# Shangpinhui

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# 项目结构
## 1. public
静态资源
## 2. src
- @根目录
- 资源文件夹
### 2.1 api
请求文件夹，保存Ajax等访问请求的封装
#### index.js
对api进行统一管理，如axios的发送请求
#### mockAjax.js
mock请求的封装
#### request.js
实例axios，同时进行自定义配置，设置拦截器，对外抛出**requests**用于发送请求，是index.js的基础
### 2.2 assets
动态资源文件夹（但目前是否又存在的必要仍存疑）
### 2.3 components
vue全局组件文件夹
### 2.4 mock
mock用于拦截前端请求，并响应（即不需自己配置服务器来对请求进行响应）
#### .json
用于响应的数据文件
#### mockServe.js
配置mock的响应，结合mockAjax的请求配置实现
### 3. pages
组件文件夹，index.js
### 4. router
路由配置部分
### 5. store
vue仓库