<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的地方-->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/index';
import Footer from "@/components/Footer";

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  //app组件的mounted只会执行一次，因为只会渲染一次
  mounted() {
    //在app渲染的时候请求一次，这样就不会因为切换组件而导致多次请求
    this.$store.dispatch("getcategoryList");
    this.$store.dispatch('getbannerList');
    this.$store.dispatch('getfloorList');
  }
}
</script>

<style>
#app {

}
</style>
