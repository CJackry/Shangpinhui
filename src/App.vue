<template>
  <Header></Header>
  <!-- 路由组件出口的地方-->
  <router-view></router-view>
  <Footer></Footer>
</template>

<script>
import Header from './components/Header/index';
import Footer from "@/components/Footer";

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
#app {

}
</style>
