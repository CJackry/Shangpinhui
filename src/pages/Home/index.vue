<template>
  <div>
    <!-- 使用全局组件，不需要再进行注册-->
    <TypeNav></TypeNav>
    <!-- 使用其余组件 -->
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <like></like>
    <floor></floor>
    <floor></floor>
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import TodayRecommend from "@/pages/Home/TodayRecommend";
import like from "@/pages/Home/like";
import floor from "@/pages/Home/floor";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    ListContainer,
    TodayRecommend,
    like,
    floor
  }
}
</script>

<style scoped lang="less">

</style>