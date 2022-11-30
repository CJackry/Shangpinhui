<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">属性</div>
        <div class="cart-th4">单价（元）</div>
        <div class="cart-th5">数量</div>
        <div class="cart-th6">小计（元）</div>
        <div class="cart-th7">操作</div>
      </div>
      <div class="cart-body">
        <!--判断购物车内有没有商品-->
        <div v-if="!isCartNull">
          <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
            <li class="cart-list-con1">
              <input type="checkbox" name="chk_list" id="" v-model="cart.isChecked"
                     @change="changeCheck(cart.skuId, $event.target.checked)"/>
            </li>
            <li class="cart-list-con2">
              <div class="good-detail">
                <img :src="cart.imgUrl">
                <div class="item-msg">{{ cart.skuName }}</div>
              </div>
            </li>
            <li class="cart-list-con3">
              <div class="item-txt">墨绿色</div>
            </li>
            <li class="cart-list-con4">
              <span class="price">{{ cart.skuPrice }}.00</span>
            </li>
            <li class="cart-list-con5">
              <div class="btn-num">
                <a href="javascript:void(0)" class="mins" @click="changeNum('-', cart, -1)">-</a>
                <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt"
                       @change="changeNum('change', cart, $event.target.value * 1)">
                <a href="javascript:void(0)" class="plus" @click="changeNum('+', cart, 1)">+</a>
              </div>
            </li>
            <li class="cart-list-con6">
              <span class="sum">{{ cart.skuPrice * cart.skuNum }}.00</span>
            </li>
            <li class="cart-list-con7">
              <a href="#none" class="sindelet" @click="delCart(cart.skuId)">删除</a>
              <br>
              <a href="#none">移到收藏</a>
            </li>
          </ul>
        </div>
        <!--没有商品则显示未添加商品-->
        <div class="tip-add" v-else>
          你还尚未添加商品，去
          <router-link to="/home">首页</router-link>
        </div>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isAllChecked" @change="allCheck">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">0</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import throttle from "lodash/throttle";

export default {
  name: 'ShopCart',
  data() {
    return {
      isAllChecked: true,
      isCartNull: true,
    }
  },
  mounted() {
    this.getData();
  },
  watch: {
    cartInfoList() {
      //检查是否含有商品
      console.log('检查cartInfoList');
      this.isCartNull = !this.cartInfoList;
      //检查是否全选
      if (!this.isCartNull) {
        this.cartInfoList.forEach(cart => {
          if (!cart.isChecked) this.isAllChecked = false;
        });
      }
    }
  },
  computed: {
    ...mapState({
      ShopCartList: state => state.shopCart.ShopCartList,
    }),
    cartInfoList() {
      if (this.ShopCartList && 'cartInfoList' in this.ShopCartList)
        return this.ShopCartList.cartInfoList;
      else
        return undefined;
    },
  },
  methods: {
    getData() {
      this.$store.dispatch('getShopCartList');
    },
    delCart(skuId) {
      if (confirm('确定删除该商品吗')) {
        this.$store.dispatch('deleteShopCart', skuId);
        this.getData();
      }
    },
    //节流，同时要注意async，否则修改后服务器还没返回数据，页面就不会更新，导致出现页面响应迟钝
    changeNum: throttle(async function (type, cart, num) {
      let isDel = false;
      let disNum = 1;
      switch (type) {
        case '+':
          disNum = 1;
          break;
        case '-':
          if (cart.skuNum > 1) {
            disNum = -1;
          } else if (cart.skuNum === 1)
            isDel = true;
          break;
        case 'change':
          if (!isNaN(num)) {
            // 如果输入的是0则删除
            if (num === 0)
              isDel = true;
            else
              disNum = num - cart.skuNum;
            //如果输入非数字则不做操作，即disNum为0
          } else {
            disNum = 0;
          }
      }
      try {
        if (isDel)
          await this.delCart(cart.skuId);
        //disNum不为0则发送修改请求
        else if (disNum !== 0)
          await this.$store.dispatch('updateShoppingCar', {skuId: cart.skuId, skuNum: disNum});
        this.getData();
      } catch (e) {
        console.log('修改出错，', e.message);
      }
    }, 500),
    async changeCheck(skuId, check) {
      let isChecked = 1;
      if (check) isChecked = 1;
      else isChecked = 0;
      await this.$store.dispatch('changeChoose', {skuId, isChecked});
      this.getData();
    },
    async allCheck() {
      let isChecked = 1;
      if (this.isAllChecked) isChecked = 1;
      else isChecked = 0;
      for (let cart of this.cartInfoList) {
        if (cart.isChecked !== isChecked)
          await this.$store.dispatch('changeChoose', {skuId: cart.skuId, isChecked});
      }
      this.getData();
    },
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 5.5%;
        text-align: center;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 32%;
        text-align: center;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6,
      .cart-th7 {
        width: 12.5%;
        text-align: center;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 5.5%;
          text-align: center;
        }

        .cart-list-con2 {
          width: 32%;
          text-align: center;

          .good-detail {
            display: -webkit-flex;
            display: flex;
            -webkit-align-items: center;
            align-items: center;
            -webkit-justify-content: center;
            justify-content: center;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 60%;
              margin: 0 10px 10px;
              line-height: 18px;
            }
          }
        }

        .cart-list-con3 {
          width: 12.5%;
          text-align: center;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
          text-align: center;

        }

        .cart-list-con5 {
          width: 12.5%;
          text-align: center;

          .btn-num {
            display: flex;
            align-items: center;
            text-align: center;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

        }

        .cart-list-con6 {
          width: 12.5%;
          text-align: center;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;
          text-align: center;

          a {
            color: #666;
          }
        }
      }

      .tip-add {
        padding: 10px;
        text-align: center;
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>