<template>
  <div>
    <!--三级联动-->
    <TypeNav/>
    <div class="main">
      <div class="py-container">
        <!--bread：面包屑，带x的选择的标签-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i
                @click="removeBreadName('categoryName')">×</i></li>
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i
                @click="removeBreadName('keyword')">×</i></li>
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(':')[1] }}<i
                @click="removeBreadName('trademark')">×</i></li>
            <li class="with-x" v-for="(prop, index) in searchParams.props" :key="index">{{ prop.split(':')[1] }}<i
                @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!--selector 自定义事件不需要加括号，只需要写回调函数名，否则接收不到参数-->
        <SearchSelector @trademarkInfo=" trademarkInfo" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{'active': isActive(1)}" @click="changeOrder('1')">
                  <a>综合<span v-show="isActive(1)" class="iconfont"
                               :class="{'icon-down': !isAsc(), 'icon-up': isAsc()}"></span></a>
                </li>
                <li :class="{'active': isActive(2)}" @click="changeOrder('2')">
                  <a>价格<span v-show="isActive(2)" class="iconfont"
                               :class="{'icon-down': !isAsc(), 'icon-up': isAsc()}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in SearchList.goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"><img :src=good.defaultImg /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em style="margin-right: 10px">¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="就这">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank"
                       class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共{{ SearchList.totalPages }}页&nbsp;</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import {mapState} from "vuex";

export default {
  name: 'Search',
  components: {
    SearchSelector
  },
  data() {
    return {
      searchParams: {
        //一级菜单
        "category1Id": "",
        //二级菜单
        "category2Id": "",
        //三级菜单
        "category3Id": "",
        //分类名
        "categoryName": "",
        //搜索关键字
        "keyword": "",
        //排序方式：1综合2价格（asc升，desc降，如1:desc），默认为综合降序
        "order": "1:desc",
        //页码，初始必为1
        "pageNo": 1,
        //每页数量
        "pageSize": 10,
        //商品属性
        "props": [],
        //品牌（ID: 名称）
        "trademark": ""
      }
    }
  },
  beforeMount() {
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
    console.log(this.searchParams);
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch('getSearchList', this.searchParams);
    },
    //重置搜索的参数，设置为undefind则不会携带发送请求，提高性能
    resetSearchParams(...res) {
      for (let attr of res) {
        this.searchParams[attr] = undefined;
      }
    },
    //移除面包屑
    removeBreadName(breadName) {
      //如果是分类名则要把名字和分类id都移除
      if (breadName === 'categoryName') {
        this.resetSearchParams("categoryName", "category1Id", "category2Id", "category3Id");
      } else {
        this.resetSearchParams(breadName);
      }
      //移除面包屑之后对自身进行重新跳转
      if (this.$route.params) {
        this.$router.push({name: 'search', params: this.$route.params});
      } else {
        this.$router.push({name: 'search'});
      }
    },
    //移除属性参数需要使用索引，并重新发起请求，因此另写一个移除方法
    removeAttr(index) {
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    //自定义事件回调
    trademarkInfo(brand) {
      // console.log('brandInfo: ', brand);
      //ES6模板字符串
      this.searchParams.trademark = `${brand.tmId}:${brand.tmName}`;
      this.getData();
    },
    attrInfo(attr, attrValue) {
      let prop = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      if (this.searchParams.props.indexOf(prop) === -1) {
        this.searchParams.props.push(prop);
        this.getData();
      }
    },
    //排序
    //选择的排序方式css激活
    isActive(choice) {
      choice = choice.toString();
      //检查order中包含的是1还是2，来判断哪个排序标签需要添加激活的css
      return this.searchParams.order.indexOf(choice) !== -1;
    },
    //判断是否为升序，以确定使用的箭头
    isAsc() {
      return this.searchParams.order.indexOf("asc") !== -1;
    },
    //排序的点击事件
    changeOrder(choice){
      console.log("Choice: ", choice);
      let origin = this.searchParams.order;
      let originChoice = origin.split(":")[0];
      console.log("originChoice: ", originChoice);
      if(originChoice === choice) {
        if (this.isAsc()) this.searchParams.order = `${choice}:desc`;
        else this.searchParams.order = `${choice}:asc`;
      }else{
        if(this.isActive(1))  this.searchParams.order = '2:desc';
        else  this.searchParams.order = '1:desc';
      }
      this.getData();
    }
  },
  computed: {
    ...mapState({
      SearchList: state => state.search.SearchList,
    })
  },
  watch: {
    // 监听路由变化，当路由的参数变化的时候对搜索页面进行重新获取数据
    $route() {
      //合并参数，直接将路由里的参数对searchParams进行覆盖（因此categoryName一定会被重新赋值）
      Object.assign(this.searchParams, this.$route.params, this.$route.query);
      this.getData();
      //跳转完后要把原来的searchParams中的菜单id清空，以防下次点击的时候出现上次的id信息
      this.searchParams.category1Id = '';
      this.searchParams.category2Id = '';
      this.searchParams.category3Id = '';
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>