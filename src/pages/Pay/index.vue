<template>
  <div class="pay-main">

    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info">订单提交成功，请您及时付款，以便尽快为您发货~~</span>
        </h4>
        <div class="paymark">
          <span class="fl">请您在提交订单<em class="orange time">4小时</em>之内完成支付，超时订单会自动取消。订单号：<em>{{  }}</em></span>
          <span class="fr"><em class="lead">应付金额：</em><em class="orange money">￥17,654</em></span>
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。</li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）</h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg"></li>
            <li><img src="./images/pay3.jpg"></li>
          </ul>

        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg" alt=""></li>
              <li><img src="./images/pay11.jpg" alt=""></li>
              <li><img src="./images/pay12.jpg" alt=""></li>
              <li><img src="./images/pay13.jpg" alt=""></li>
              <li><img src="./images/pay14.jpg" alt=""></li>
              <li><img src="./images/pay15.jpg" alt=""></li>
              <li><img src="./images/pay16.jpg" alt=""></li>
              <li><img src="./images/pay17.jpg" alt=""></li>
              <li><img src="./images/pay18.jpg" alt=""></li>
              <li><img src="./images/pay19.jpg" alt=""></li>
              <li><img src="./images/pay20.jpg" alt=""></li>
              <li><img src="./images/pay21.jpg" alt=""></li>
              <li><img src="./images/pay22.jpg" alt=""></li>

            </ul>
          </div>

        </div>
        <div class="hr"></div>

        <div class="submit">
          <a class="btn" @click="open">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import {Message} from 'element-ui'

export default {
  name: 'Pay',
  data() {
    return {
      orderId: this.$route.query.orderId,
      payInfo: {},
      payStatus: '',
      isTimeClear: true,
    }
  },
  mounted() {
    //不要再mounted中使用async！！！，要使用就另写一个函数调用就行
    this.getPayInfo()
  },
  methods: {
    // 获取支付信息
    async getPayInfo() {
      let res = await this.$API.reqPayInfo(this.orderId);
      if (res.code === 200) {
        this.payInfo = res.data;
      }
    },
    // 支付
    async open() {
      //QRcode生成二维码
      // With promises 可以使用then和catch捕获，返回一个Promise对象
      let url = await QRCode.toDataURL(this.payInfo.codeUrl);
      // element-ui弹窗
      this.$alert(`<img src="${url}" />`, '请立即支付', {
        // 中间布局
        center: true,
        //是否使用HTML解析字符串
        dangerouslyUseHTMLString: true,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: '我已支付',
        cancelButtonText: '支付遇见问题',
        //是否显示右上角关闭按钮
        showClose: false,
        //用户点击确认框（我已支付）
      }).then(()=>{
        if(this.payStatus === 200) {
          Message({
            type: 'success',
            message: '支付成功'
          });
          this.$router.push('PaySuccess');
        }
        else{
          Message({
            type: 'warning',
            message: '尚未支付'
          });
          this.stopTimer(this.timer);
        }
        //用户点击取消框（支付遇见问题）
      }).catch(()=>{
        // 用户取消支付。弹出提示框，并取消定时器，停止发送请求
        Message({
          type: 'info',
          message: '取消支付'
        });
        this.stopTimer(this.timer);
      })
      //设置计时器清空判定为false以开始计时器
      this.isTimeClear = false;
      //设置定时器来向服务器发请求查询用户订单支付状态，直到用户支付成功或者支付超时
      let timeout = 6;
      if (!this.isTimeClear) {
        this.timer = setInterval(async () => {
          // 设置订单超时
          if(timeout>0){
            timeout--;
            console.log(timeout);
          }else{
            Message.warning('支付超时');
            this.stopTimer(this.timer);
            // 为了方便调试，超时的时候会直接跳转
            this.$router.push('PaySuccess');
          }
          let res = await this.$API.reqPayStatus(this.payInfo.orderId);
          //当返回200的时候表示支付成功
          if (res.code === 200) {
            //清除定时器
            this.payStatus = res.code;
            this.stopTimer(this.timer);
            this.$router.push('PaySuccess');
          }
        }, 1000)
      }
    },
    // 中止计时器，停止发送请求，关闭提示框
    stopTimer(timer){
      // 这里才是清除计时器，timer只是该计时器的一个标识
      clearInterval(timer);
      // timer赋空值并不代表清除了计时器，而是清除了timer这个变量
      timer = null;
      this.isTimeClear = true;
      this.$msgbox.close();
    }
  }

}
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(./images/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }

        li:hover {
          border-color: #ff6600;
        }

        li.selected {
          border-color: #e1251b;
        }

      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px "微软雅黑";
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>