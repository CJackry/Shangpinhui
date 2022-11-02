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
        <ul class="cart-list" v-for="(good, index) in cartInfoList" :key="index">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" v-model="isChecked[index]">
          </li>
          <li class="cart-list-con2">
            <img :src="good.imgUrl" alt="">
            <div class="item-msg">{{ good.skuName }}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">{{ goodAttr }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ good.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <button class="minus" @click="handlerNum('minus', good)">-</button>
            <input autocomplete="off" type="text" :value="good.skuNum" class="itxt"
                   @change="handlerNum('change', good, $event.target.value * 1)">
            <a class="plus" @click="handlerNum('add', good)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ good.cartPrice * good.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteGood(good, index)">删除</a>
            <br>
            <a>移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" @change="changeAllCheck" v-model="AllCheck">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteSelectGood">删除选中的商品</a>
        <a>移到我的关注</a>
        <a>清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{ chooseNum }}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ allSum }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'ShopCart',
  data() {
    return {
      isChecked: [],
      AllCheck: false,
      goodAttr: sessionStorage.getItem('chooseAttr'),
    }
  },
  mounted() {
    this.getData();
    this.isChecked.length = 0;
  },
  methods: {
    changeAllCheck() {
      for (let i in this.isChecked) {
        //使用$set进行响应式赋值，否则当isChecked的元素变化的时候不会更新页面
        //（如点击全选但是总价不会更新，但是直接单击改变单选框值的时候属于是改变isChecked数组）
        this.$set(this.isChecked, i, this.AllCheck);
      }
    },
    //派发action
    getData() {
      this.$store.dispatch('getShopCartList');
    },
    sendUpdateNum(skuId, skuNum) {
      this.$store.dispatch('sendUpdateShoppingCar', {skuId, skuNum});
    },
    sendDeleteGood(skuId){
      this.$store.dispatch('deleteShopCart', skuId);
    },
    handlerNum(type, good, Num=0){
      let disNum = 0;
      switch (type){
        case 'add':
          disNum = 1;
          break;
        case 'minus':
          disNum = good.skuNum > 1 ? -1 : 0;
          break;
        case 'change':
          if(isNaN(disNum) || Num < 1)
            disNum = 0;
          else{
            disNum = parseInt(Num) - good.skuNum;
          }
        }

      if(disNum !== 0) this.sendUpdateNum(good.skuId, disNum);
      this.getData()
      },
    deleteGood(good){
      if(confirm('爱买买，不买滚')){
        this.sendDeleteGood(good.skuId);
        this.getData();
      }
    },
    deleteSelectGood(){
      if(confirm('确定要删除这些商品吗？')){
        let flag = false;
        for(let index in this.isChecked){
          if(this.isChecked){
            this.sendDeleteGood(this.cartInfoList[index].skuId);
            flag = true;
          }
        }
        if(!flag) alert('你还未选择商品');
        else this.getData();
      }
    }
  },
  watch: {
    isChecked(checkList) {
      this.AllCheck = checkList.indexOf(false) === -1;
    },
    cartInfoList() {
      console.log('cateInfoList changed');
      //处理购物车商品选中状态的初始值
      this.cartInfoList.forEach(() => this.isChecked.push(false));
    }
  },
  computed: {
    ...mapState({
      shopCartList: state => state.shopCart.ShopCartList,
    }),
    cartInfoList(){
      return this.shopCartList[0].cartInfoList;
    },
    chooseNum() {
      return this.isChecked.filter(item => item === true).length;
    },
    allSum() {
      let sum = 0;
      let index = 0;
      for (let good of this.cartInfoList) {
        if (this.isChecked[index])
          sum += good.cartPrice * good.skuNum;
        index++;
      }
      return sum;
    }
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
    text-align: center;

    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 4.1667%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3 {
        width: 20.8333%;
      }

      .cart-th4,
      .cart-th5,
      .cart-th6,
      .cart-th7 {
        width: 12.5%;

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
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;

        }

        .cart-list-con5 {
          width: 12.5%;
          margin: 0 auto;
          display: flex;

          .minus {
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

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
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