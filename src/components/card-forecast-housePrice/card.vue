<template>
<!--  房价预测-->
  <div class="zc-card-forecast-house-price">
<!--    顶部滑块-->
    <h2>房价预测</h2>
    <swiper ref="swiper" @slideChange="slideChange" class="step-group" :options="swiperOption">
      <swiper-slide>
        <div class="step-item" :class="{'active':activeIndex===0}">
          <div class="step-icon">1</div>
          <div class="step-into">
            <h3>开始预测</h3>
            <span>输入基本数据</span>
          </div>
          <div class="step-next">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <polygon points="0 0 24 0 24 24 0 24"/>
                <rect class="paint" fill="#000000" opacity="0.3" transform="translate(8.500000, 12.000000) rotate(-90.000000) translate(-8.500000, -12.000000) " x="7.5" y="7.5" width="2" height="9" rx="1"/>
                <path class="paint" d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997) "/>
              </g>
            </svg>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="step-item" :class="{'active':activeIndex>0}">
          <div class="step-icon">2</div>
          <div class="step-into">
            <h3>完成预测</h3>
            <span>输出房屋价格</span>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <swiper ref="parent" :options="parentOption" class="step-panel" @slideChange="slideChange">
      <swiper-slide>
        <div class="input-group swiper-no-swiping">
          <label>房屋年龄</label>
          <zc-input v-model="forecast[0]">
            <i slot="prepend" class="fi-sr-dashboard" style="color: #7e8299"></i>
          </zc-input>
        </div>
        <div class="input-group swiper-no-swiping">
          <label>最近地铁站距离</label>
          <zc-input v-model="forecast[1]">
            <i slot="prepend" class="fi-sr-marker" style="color: #7e8299"></i>
          </zc-input>
        </div>
        <div class="input-group swiper-no-swiping">
          <label>生活圈便利店数量</label>
          <zc-input v-model="forecast[2]">
            <i slot="prepend" class="fi-sr-shop" style="color: #7e8299"></i>
          </zc-input>
        </div>
        <div class="input-group swiper-no-swiping">
          <label>纬度</label>
          <zc-input v-model="forecast[3]">
            <i slot="prepend" class="fi-sr-world" style="color: #7e8299"></i>
          </zc-input>
        </div>
        <div class="input-group swiper-no-swiping">
          <label>经度</label>
          <zc-input v-model="forecast[4]">
            <i slot="prepend" class="fi-sr-world" style="color: #7e8299"></i>
          </zc-input>
        </div>
        <div class="next" @click="nextStep">开始预测</div>
      </swiper-slide>
      <swiper-slide>
        <zc-card-house-item v-if="activeIndex==1"
                            :distance="forecast[1]"
                            :house-age="forecast[0]"
                            :lat="forecast[3]"
                            :log="forecast[4]"
                            :unit-price="price"
                            :store-count="forecast[2]"
        ></zc-card-house-item>
        <div class="next" @click="clear">重新预测</div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import ZcInput from "@/components/input/input";
import axios from "axios";
import ZcCardHouseItem from "@/components/card-house-item/card";
export default {
  name: "zc-card-forecast-house-price",
  components: {ZcCardHouseItem, ZcInput, Swiper, SwiperSlide},
  directives: {
    swiper: directive
  },
  mounted() {

  },
  methods: {
    slideChange(e){
      this.activeIndex = e.activeIndex
    },
    clear(){
      this.activeIndex = 0
      this.$refs.parent.$swiper.slideTo(this.activeIndex);
      this.$refs.swiper.$swiper.slideTo(this.activeIndex);
      this.forecast = []
    },
    nextStep(){
      if(this.forecast.length < 5) {
        this.$rbNote({
          title: '预测失败',
          messageType: 'error',
          message: '您输入的基本信息不全!'
        })
        return
      }
      this.forecast.forEach((item,index) => {
        this.forecast[index] = parseFloat(item)
      })
      var _this = this;
      axios.post(this.$domain + '/forecast/house', {
        forecast: _this.forecast
      })
      .then(res => {
        this.price = res.data
      })
      this.activeIndex ++ ;
      if(this.activeIndex > 1)
        this.activeIndex = 1
      this.$refs.parent.$swiper.slideTo(this.activeIndex);
      this.$refs.swiper.$swiper.slideTo(this.activeIndex);
    }
  },
  data() {
    return {
      activeIndex: 0,
      swiperOption: {
        slideToClickedSlide: true,
        slidesPerView: 'auto',
        spaceBetween : 60,
        allowTouchMove: false,
      },
      parentOption: {
        allowTouchMove: false,
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0,
        slidesOffsetAfter : 0,
        centeredSlidesBounds: true,
        // resistanceRatio : 0
        noSwiping : true,
        autoHeight: true,
      },
      forecast: [],
      price: 0
    }
  }
}
</script>

<style lang="scss">
.step-group .swiper-slide{
  width: auto!important;
}
.step-group .active .step-icon{
  background-color: #ffe2e5;
  color: #f64e60;
}
.step-group .active.step-item .paint{
  fill: #f64e60;
}
.step-group .active .step-into h3{
  color: #f64e60;
}
</style>

<style scoped lang="scss">
  .zc-card-forecast-house-price{
    padding: 30px 30px 20px 30px;
    background: #fff;
  }
  .zc-card-forecast-house-price h2{
    font-size: 1.2rem;
    font-weight: 700;
  }

  // 步骤条
    .step-group{
      margin: 30px 0;
    }
  .step-item{
    padding: .5rem 0;
    display: inline-flex;
    align-items: stretch;
  }
  .step-icon{
    font-weight: 800;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    width: 46px;
    height: 46px;
    border-radius: 12px;
    background-color: #f3f6f9;
    color: #181c32;
    transition: all .15s linear;
  }

  // 说明
  .step-into{
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .step-into h3{
    font-size: 1rem;
    font-weight: 800;
  }
  .step-into span{
    white-space: nowrap;
    font-size: .8rem;
    color: #b5b5c3;
  }
  .step-next{
    display: inline-flex;
    align-items: center;
    margin-left: .7rem;
  }
  .step-item .paint{
    fill: #b5b5c3;
  }
  .input-group{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin-bottom: 1.5rem;
    padding: 0 5px;
  }
  .input-group label{
    font-size: .9rem;
    font-weight: 700;
    margin-bottom: .5rem;
  }
  .next{
    margin-top: 1rem;
    width: 100%;
    padding: .5rem .6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: #fff;
    border-radius: .5rem;
    cursor: pointer;
    background: #f64e60;
  }
</style>
