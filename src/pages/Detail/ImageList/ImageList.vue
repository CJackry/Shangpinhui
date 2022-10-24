<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img, index) in imgList" :key="img.id">
        <img :src="img.imgUrl" :class="{active: currentIndex===index}" @click="changeImg(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
  import Swiper from "swiper";

  export default {
    name: "ImageList",
    data(){
      return {
        currentIndex: 0,
      }
    },
    props:['imgList'],
    watch:{
      imgList:{
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
              //同时展现的缩略图数量
              slidesPerView: 3,
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
          })
        }
      }
    },
    methods:{
      changeImg(index){
        this.currentIndex = index;
        this.$bus.$emit('imgIndex', index);
      }
    }
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>