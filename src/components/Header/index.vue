<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!isLogin">
            <span>请</span>
            <!--  声明式路由跳转   -->
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-else>
            <a>{{ name }}</a>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/ShopCart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" title="尚品汇" to="/home" target="_blank">
          <img src="../../assets/images/logo.png" alt="">
        </router-link>
      </h1>
      <div class="searchArea">
        <form @action=goSearch class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword"/>
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click.prevent="goSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>

import {getToken} from "@/utils/token";

export default {
  name: "Header",
  data() {
    return {
      keyword: '',
      isLogin: false,
    }
  },
  mounted() {
    let token = getToken();
    if (token) {
      this.$store.dispatch('getUserInfo');
      this.isLogin = true;
    }
  },
  computed: {
    name() {
      return this.$store.state.user.userInfo.name;
    }
  },
  watch: {
    name() {
      //需要使用isLogin来判断是否已登陆
      // 如果直接使用name则当刷新页面的时候,一开始name为undefined则会先显示未登录的状态然后再显示登陆状态
      this.isLogin = !!this.name;
    }
  },
  methods: {
    goSearch() {
      //编程式路由跳转
      // 声明式参数传递
      // this.$router.push('/search/'+this.keyword);
      // 编程式参数传递
      this.$router.push({name: 'search', params: {keyword: this.keyword}})
    },
    async logout() {
      try {
        await this.$store.dispatch('sendLogout');
        // 如果退出登录则重新进入home页面
        this.$router.push('/home');
      } catch (e) {
        console('logout failed');
      }
    }
  },

}
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }

      }

    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>