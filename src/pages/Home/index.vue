<template>
  <div>
    <!-- 使用全局组件，不需要再进行注册-->
    <TypeNav></TypeNav>
    <!-- 使用其余组件 -->
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <like></like>
    <floor v-for="floor in floorList" :key="floor.id" :list="floor" />
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import TodayRecommend from "@/pages/Home/TodayRecommend";
import like from "@/pages/Home/like";
import floor from "@/pages/Home/floor";
import {mapState} from "vuex";

export default {
  name: "Home",
  components: {
    ListContainer,
    TodayRecommend,
    like,
    floor
  },
  computed:{
    ...mapState({
      floorList: state => state.home.floorList,
    })
  },
  mounted() {
    this.$store.dispatch('getUserInfo');
  }
}
</script>

<style scoped lang="less">

</style>