<template>
  <!--三级联动-->
  <div class="type-nav">
    <div class="container">
      <!--鼠标移出去除一级菜单背景颜色添加到父元素，这样可以应用到所有子元素（因此要移出h2标签才会触发）-->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!--添加过渡动画-->
        <transition name="sort">
          <div class="sort" v-show="navShow">
            <div class="all-sort-list2" @click="clickNav($event)">
              <!--动态样式使用:class，其为一个对象，属性为一个样式名，样式名描述使用条件-->
              <div class="item" v-for="(c1, index) in categoryList.slice(0,15)" :key="c1.categoryId"
                   @mouseenter="ChangeIndex(index)"
                   :class="{cur: currentIndex === index}">
                <h3>
                  <!--使用自定义属性来进行标签判断和数据传递-->
                  <a :data-category1Id="c1.categoryId" :data-categoryName="c1.categoryName">{{ c1.categoryName }}</a>
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-category2Id="c2.categoryId" :data-categoryName="c2.categoryName">{{
                            c2.categoryName
                          }}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-category3Id="c3.categoryId" :data-categoryName="c3.categoryName">{{
                              c3.categoryName
                            }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="https://www.baidu.com">服装城</a>
        <a href="https://www.baidu.com">美妆馆</a>
        <a href="https://www.baidu.com">尚品汇超市</a>
        <a href="https://www.baidu.com">全球购</a>
        <a href="https://www.baidu.com">闪购</a>
        <a href="https://www.baidu.com">团购</a>
        <a href="https://www.baidu.com">有趣</a>
        <a href="https://www.baidu.com">秒杀</a>
      </nav>
    </div>

  </div>
</template>

<script>
//引入仓库数据
import {mapState} from 'vuex';
//引入lodash的throttle来实现节流
import throttle from 'lodash/throttle';

export default {
  name: "TypeNav",
  data() {
    return {
      // 鼠标当前停留到的菜单索引
      currentIndex: -1,
      navShow: true,
    }
  },
  mounted() {
    //发送给action categoryList
    this.navShow = (this.$route.name === 'home');
  },
  methods: {
    //js实现鼠标移动改变导航样式（通过三级联动一级菜单的index）
    // ChangeIndex(index) {
    //   this.currentIndex = index;
    // },
    //加入节流功能的ChangeIndex,throttle回调函数尽量不要用箭头函数,容易出现this问题
    ChangeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 10),
    leaveShow() {
      this.currentIndex = -1;
      if (this.$route.name === 'search') {
        this.navShow = false;
      }
    },
    enterShow() {
      if (this.$route.name === 'search') {
        this.navShow = true;
      }
    },
    //菜单点击事件
    clickNav(e) {
      if (e.target.nodeName === "A") {
        this.$router.push({
          name: 'search', params: {
            keyword: e.target.innerHTML,
            category1Id: e.target.dataset.category1Id,
            category2Id: e.target.dataset.category2Id,
            category3Id: e.target.dataset.category3Id,
            categoryName: e.target.dataset.categoryName
          }
        })
      }
    }
  },
  computed: {
    ...mapState({
      //右侧是一个函数名（也是一个计算属性的变量）
      // 当使用这个计算属性时，右侧函数就会立即执行一次并注入一个参数-大仓库中的state（大仓库数据）
      categoryList: state => state.home.categoryList
    }),
  }
}
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }

      //动态样式cur，在HTML标签上使用
      .cur {
        background-color: red;
      }


    }

    //nav的过渡动画
    //过渡动画开始的状态（进入）
    .sort-enter {
      height: 0px;
    }

    //过渡动画结束的状态（进入）
    .sort-enter-to {
      height: 461px;
    }

    //...（离开）
    .sort-leave {
      height: 461px;
    }

    .sort-leave-to {
      height: 0px;
    }

    //定义动画时间和速率(进入)
    .sort-enter-active {
      transition: all .5s linear;
    }

    //...（离开）
    .sort-leave-active {
      transition: all .5s linear;
    }
  }
}
</style>