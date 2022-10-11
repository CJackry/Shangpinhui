<template>
  <div class="swiper-container" ref="Swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel, index) in list" :key="carousel.id">
        <img :src=carousel.imgUrl :alt=index>
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper';
export default {
  name: "Carousel",
  props: ['list'],
  watch:{
    list:{
      //立即监听：不管数据是否发生了变化，直接执行一次
      //因为list是父组件给的，即一开始数据就是固定的了，不会发生变化，因此watch监听不到list
      immediate:true,
      handler(){
        this.$nextTick(()=>{
          //创建mySwiper实例时Swiper组件必须完整，且其中的所有数据必须已经加载完毕
          // eslint-disable-next-line no-unused-vars
          let mySwiper = new Swiper('.swiper-container', {
            // observer: true,
            direction: 'horizontal', // 垂直切换选项 vertical
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },

            // 如果需要滚动条
            scrollbar: {
              el: '.swiper-scrollbar',
            },
          });
          console.log("new Swiper");
        })
      }
    }
  }
}
</script>

<style scoped>

</style>