<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div class="address clearFix" v-for="address in userAddress" :key="address.id">
        <span class="username" :class="{selected: chooseId === address.id}"
              @click="handleChoose('address', address.id)">{{ address.consignee }}</span>
        <p @click="handleChoose('address', address.id)">
          <span class="s1">{{ address.fullAddress || "" }}</span>
          <span class="s2">{{ address.phoneNum }}</span>
          <span class="s3" v-if="address.isDefault === '1'">默认地址</span>
        </p>
      </div>
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username" :class="{selected: payWay === 1}" @click="handleChoose('payWay', 1)">在线支付</span>
        <span class="username" style="margin-left:5px;" :class="{selected: payWay === 0}"
              @click="handleChoose('payWay', 0)">货到付款</span>

      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1" :class="{selected: expressWay === 'tt'}"
                @click="handleChoose('expressWay', 'tt')">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
        <div class="info clearFix">
          <span class="s1" :class="{selected: expressWay === 'sf'}"
                @click="handleChoose('expressWay', 'sf')">顺丰快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul class="list clearFix" v-for="good in goodTradeList" :key="good.skuId">
          <li style="width: 20%; text-align: center">
            <img :src="good.imgUrl" alt="" style="height: 100px; width: 100px">
          </li>
          <li style="width: 50%; text-align: center">
            <p>
              {{ good.skuName }}</p>
            <h4>7天无理由退货</h4>
          </li>
          <li style="width: 10%; text-align: center">
            <h3>￥{{ good.orderPrice }}</h3>
          </li>
          <li style="width: 10%; text-align: center">X{{ good.skuNum }}</li>
          <li style="width: 10%; text-align: center">有货</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea placeholder="建议留言前先与商家沟通确认" class="remarks-cont" v-model="msg"></textarea>

      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b><i>{{ tradeInfo.totalNum }}</i>件商品，总商品金额</b>
          <span>¥{{ tradeInfo.totalAmount }}</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">应付金额:&nbsp;<span>¥{{ tradeInfo.totalAmount }}</span></div>
      <div class="receiveInfo">
        寄送至:
        <span>{{ chooseAddress.fullAddress || "" }}</span>
        收货人：<span>{{ chooseAddress.consignee }}</span>
        <span>{{ chooseAddress.phoneNum }}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <a class="subBtn" @click="submitOrder">提交订单</a>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";

export default {
  name: 'Trade',
  data() {
    return {
      chooseId: -1,
      // 支付方式：0-货到付款，1-在线支付
      payWay: 1,
      expressWay: 'sf',
      msg: '',
      orderId: -1,
      chooseAddress: {}
    }
  },
  mounted() {
    this.$store.dispatch('getTrade');
    this.$store.dispatch('getUserAddress');
  },
  computed: {
    ...mapState({
      tradeInfo: state => state.trade.tradeInfo,
      userAddress: state => state.trade.userAddress
    }),
    ...mapGetters(['goodTradeList']),

  },
  watch: {
    userAddress() {
      let defaultAddress = this.userAddress.find(item => item.isDefault === '1');
      this.chooseId = defaultAddress.id;
      // 用户选择的地址
      this.chooseAddress = this.userAddress.find(item => item.id === this.chooseId);
    },
    // goodTradeList() {
    //   // 订单商品总数
    //   let sum = 0, sumPrice = 0;
    //   this.goodTradeList.forEach(good => {
    //     sum += good.skuNum;
    //     sumPrice += good.skuNum * good.orderPrice
    //   });
    //   this.allGoodsNum = sum;
    //   this.allPrice = sumPrice;
    // }
  },
  methods: {
    handleChoose(type, id) {
      switch (type) {
        case 'address':
          this.chooseId = id;
          break;
        case 'payWay':
          this.payWay = id;
          break;
        case 'expressWay':
          this.expressWay = id;
          break;
      }
    },
    async submitOrder() {
      let {tradeNo} = this.tradeInfo;
      let data = {
        consignee: this.chooseAddress.consignee,
        consigneeTel: this.chooseAddress.phoneNum,
        deliveryAddress: this.chooseAddress.fullAddress,
        paymentWay: "ONLINE",
        orderComment: this.msg,
        orderDetailList: this.goodTradeList,
      }
      //发起请求的时候一定要注意使用async+await，否则返回的res会是个Promise
      let res = await this.$API.reqSubmitOrder(tradeNo, data);
      if(res.code === 200){
        this.orderId = res.data;
        this.$router.push(`/pay?orderId=${this.orderId}`);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.trade-container {
  .title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 25px;
    box-sizing: border-box;

    .receive,
    .pay {
      line-height: 36px;
      margin: 18px 0;
    }

    .address {
      padding-left: 20px;
      margin-bottom: 15px;

      .username {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ddd;
        position: relative;
      }

      .username::after {
        content: "";
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: url(./images/choosed.png) no-repeat;
      }

      .username.selected {
        border-color: #e1251b;
      }

      .username.selected::after {
        display: block;
      }

      p {
        width: 610px;
        float: left;
        line-height: 30px;
        margin-left: 10px;
        padding-left: 5px;
        cursor: pointer;

        .s1 {
          float: left;

        }

        .s2 {
          float: left;
          margin: 0 5px;
        }

        .s3 {
          float: left;
          width: 56px;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
          background-color: #878787;
          color: #fff;
          margin-top: 3px;
          text-align: center;
        }
      }

      p:hover {
        background-color: #ddd;
      }
    }

    .line {
      height: 1px;
      background-color: #ddd;
    }

    .way {
      width: 1080px;
      height: 180px;
      background: #f4f4f4;
      padding: 15px;
      margin: 0 auto;

      h5 {
        line-height: 50px;
      }

      .info {
        margin-top: 20px;

        .s1 {
          float: left;
          border: 1px solid #ddd;
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
        }

        .s1.selected {
          border-color: #e1251b;
        }

        .s1.selected::after {
          display: block;
        }

        p {
          line-height: 30px;
        }
      }
    }

    .detail {
      width: 1080px;

      background: #feedef;
      padding: 15px;
      margin: 2px auto 0;

      h5 {
        line-height: 50px;
      }

      .list {
        display: flex;
        justify-content: space-between;

        li {
          line-height: 30px;

          p {

            margin-bottom: 20px;
          }

          h4 {
            color: #c81623;
            font-weight: 400;
          }

          h3 {

            color: #e12228;
          }
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 50px;
      }

      textarea {
        width: 100%;
        border-color: #e4e2e2;
        line-height: 1.8;
        outline: none;
        resize: none;
      }
    }

    .bill {
      h5 {
        line-height: 50px;
      }

      div {
        padding-left: 15px;
      }
    }
  }

  .money {
    width: 1200px;
    margin: 20px auto;

    ul {
      width: 220px;
      float: right;

      li {
        line-height: 30px;
        display: flex;
        justify-content: space-between;

        i {
          color: red;
        }
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    text-align: right;
    background-color: #f4f4f4;
    border: 1px solid #ddd;

    div {
      line-height: 30px;
    }

    .price span {
      color: #e12228;
      font-weight: 700;
      font-size: 14px;
    }

    .receiveInfo {
      color: #999;
    }
  }

  .sub {
    width: 1200px;
    margin: 0 auto 10px;

    .subBtn {
      float: right;
      width: 164px;
      height: 56px;
      font: 700 18px "微软雅黑";
      line-height: 56px;
      text-align: center;
      color: #fff;
      background-color: #e1251b;

    }
  }

}
</style>