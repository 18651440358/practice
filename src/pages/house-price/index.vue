<template>
  <div class="zc-page-house-price-index">
    <div class="subheader" ref="header">
      <zc-subheader title="房屋价格预测系统"></zc-subheader>
    </div>
<!--    -->
    <section class="content">
      <zc-row>
        <zc-col style="position: relative">
          <div id="map" :style="style"></div>
          <div class="panel">
<!--            上传卡片-->
            <zc-card-house-upload v-if="!haveData" style="max-width: 300px"></zc-card-house-upload>
            <swiper v-if="haveData" :options="swiperOptions">
              <swiper-slide v-for="(house,index) in houseList" :key="index">
                <zc-card-house-item :distance="house.distance"
                                    :house-age="house.houseAge"
                                    :lat="house.lat"
                                    :log="house.log"
                                    :unit-price="house.unitPrice"
                                    :store-count="house.storeCount"
                                    :transaction-date="house.transactionDate"
                                    @fly="flyHandle"></zc-card-house-item>
              </swiper-slide>
            </swiper>
          </div>
<!--          filter-->
          <div class="filter-button" @click="filterShow=!filterShow" v-if="haveData">
            <transition name="filter">
              <i v-if="!filterShow" class="fi-sr-apps"></i>
            </transition>
            <transition name="filter">
              <i v-if="filterShow" style="font-size: 24px;width: 24px;height: 24px" class="fi-sr-arrow-small-left"></i>
            </transition>
          </div>
          <div class="filter-panel" :class="{'open':filterShow}">
            <zc-row :spacing="20" flex>
              <zc-col :grid="7">
                <div class="input-group">
                  <h3>房屋年龄</h3>
                  <zc-input @input="houseAgeInput" v-model="forecast.houseAge" :status="forecastStatus.houseAge">
                    <i style="color: #7e8299" slot="prepend" class="fi-sr-home"></i>
                  </zc-input>
                </div>
              </zc-col>
              <zc-col :grid="10">
                <div class="input-group">
                  <h3>距离地铁站距离
                    <span>{{forecast.distance[0]}}-{{forecast.distance[1]}}</span>
                  </h3>
                  <zc-slider name="区间拥有房屋" interval v-model="forecast.distance" :max="5000" :min="0" :data="distanceInterval"></zc-slider>
                </div>
              </zc-col>
              <zc-col :grid="7">
                <div class="input-group">
                  <h3>生活圈数量</h3>
                  <zc-input @keydown="storeCountKeyDown" @input="storeCountInput" v-model="forecast.storeCount" :status="forecastStatus.storeCount">
                    <i style="color: #7e8299" slot="prepend" class="fi-sr-shop"></i>
                  </zc-input>
                </div>
              </zc-col>
            </zc-row>
            <zc-row align="stretch" :spacing="20" flex style="margin-top: 15px">
              <zc-col :grid="7">
                <div class="input-group">
                  <h3>所在地经度</h3>
                  <zc-input v-model="forecast.log" @input="logInput" :status="forecastStatus.log">
                    <i style="color: #7e8299" slot="prepend" class="fi-sr-marker"></i>
                  </zc-input>
                </div>
              </zc-col>
              <zc-col :grid="7">
                <div class="input-group">
                  <h3>所在地纬度</h3>
                  <zc-input v-model="forecast.lat" @input="latInput" :status="forecastStatus.lat">
                    <i style="color: #7e8299" slot="prepend" class="fi-sr-marker"></i>
                  </zc-input>
                </div>
              </zc-col>
              <zc-col :grid="10">
                <div class="input-button">
                  <a @click="findSchool">清除过滤</a>
                  <a class="search" @click="filter">启用过滤</a>
                </div>
              </zc-col>
            </zc-row>
          </div>
        </zc-col>
      </zc-row>
    </section>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
const mapboxgl = require('mapbox-gl');
import ZcSubheader from "@/components/subheader/subheader";
import ZcRow from "@/components/row/row";
import ZcCol from "@/components/col/col";
import ZcCardHouseUpload from "@/components/card-house-upload/card";
import ZcCardHouseItem from "@/components/card-house-item/card";
import ZcInput from "@/components/input/input";
import ZcSlider from "@/components/slider/slider";
export default {
  name: "zc-page-house-price-index",
  components: {ZcSlider, ZcInput, ZcCardHouseItem, ZcCardHouseUpload, ZcCol, ZcRow, ZcSubheader, Swiper, SwiperSlide},
  directives: {
    swiper: directive
  },
  data() {
    return {
      map: {},
      height: 0,
      haveData: false,
      houseList: [
        {
          distance: 84.87882,
          houseAge: 32,
          lat: 24.98298,
          log: 121.54024,
          unitPrice: 37.9,
          storeCount: 10,
          transactionDate: '2012-10'
        },
        {
          distance: 84.87882,
          houseAge: 32,
          lat: 24.98034,
          log: 121.53951,
          unitPrice: 37.9,
          storeCount: 10,
          transactionDate: '2012-10'
        },
        {
          distance: 84.87882,
          houseAge: 32,
          lat: 24.97349,
          log: 121.53372,
          unitPrice: 37.9,
          storeCount: 10,
          transactionDate: '2012-10'
        },
        {
          distance: 84.87882,
          houseAge: 32,
          lat: 24.98746,
          log: 121.54391,
          unitPrice: 37.9,
          storeCount: 10,
          transactionDate: '2012-10'
        },
        {
          distance: 84.87882,
          houseAge: 32,
          lat: 24.97937,
          log: 121.54245,
          unitPrice: 37.9,
          storeCount: 10,
          transactionDate: '2012-10'
        },
        {
          distance: 84.87882,
          houseAge: 32,
          lat: 24.96305,
          log: 121.51254,
          unitPrice: 37.9,
          storeCount: 10,
          transactionDate: '2012-10'
        },
        {
          distance: 84.87882,
          houseAge: 32,
          lat: 24.97933,
          log: 121.53642,
          unitPrice: 37.9,
          storeCount: 10,
          transactionDate: '2012-10'
        },
        {
          distance: 84.87882,
          houseAge: 32,
          lat: 24.98042,
          log: 121.54228,
          unitPrice: 37.9,
          storeCount: 10,
          transactionDate: '2012-10'
        }
      ],
      swiperOptions: {
        slidesPerView: 4,
        spaceBetween : 20,
      },
      filterShow: false,
      forecast: {
        distance: [1000,3000],
        houseAge: undefined,
        log: undefined,
        lat: undefined,
        storeCount: undefined
      },
      forecastStatus: {
        houseAge: '',
        storeCount: '',
        log: '',
        lat: ''
      },
      distanceInterval: []
    }
  },
  computed: {
    style() {
      return {
        height: `${this.height}px`
      }
    }
  },
  methods: {
    // 过滤
    filter() {
      this.houseList = this.rawData.filter((item) => {return item.distance >= this.forecast.distance[0] && item.distance <= this.forecast.distance[1]})
      if(this.forecast.houseAge !== undefined)
        this.houseList = this.houseList.filter(item => parseFloat(item.houseAge) === parseFloat(this.forecast.houseAge))
      if(this.forecast.storeCount !== undefined)
        this.houseList = this.houseList.filter(item => parseInt(item.storeCount) === parseInt(this.forecast.storeCount))
      if(this.forecast.log !== undefined)
        this.houseList = this.houseList.filter(item => parseFloat(item.log) === parseFloat(this.forecast.log))
      if(this.forecast.lat !== undefined)
          this.houseList = this.houseList.filter(item =>  parseFloat(item.lat) ===  parseFloat(this.forecast.lat))
      },
    // 初始化
    initDom() {
      var winHeight = document.documentElement.clientHeight - 110;
      var headerHeight = this.$refs.header.getBoundingClientRect().height;
      this.height = winHeight - headerHeight
    },
    // 初始化地图
    initMap() {
      mapboxgl.accessToken = 'pk.eyJ1IjoicmFiYml0LWRvb21zZGF5IiwiYSI6ImNrcTR0a2JtNzA1MGYyb2x4NG1mbDR3c2wifQ.C0eCYvqUWeMfZbri4d1LDw';
      this.map = new mapboxgl.Map({
        container: 'map', // container id 绑定的组件的id
        style: 'mapbox://styles/mapbox/navigation-day-v1', //地图样式，可以使用官网预定义的样式,也可以自定义
        center: [118.93592026803236,32.120796221894416],
        zoom: 16,     // starting zoom 地图初始的拉伸比例
        pitch: 0,  //地图的角度，不写默认是0，取值是0-60度，一般在3D中使用
        bearing: 0, //地图的初始方向，值是北的逆时针度数，默认是0，即是正北
        antialias: true, //抗锯齿，通过false关闭提升性能
      });
    },
    flyHandle({log,lat}){
      this.map.flyTo({
        center: [log,lat],
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
      });
      this.houseList = this.rawData
    },
    findSchool(){
      this.map.flyTo({
        center: [118.93592026803236,32.120796221894416],
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
      });
      this.houseList = this.rawData
      this.forecast = {
        distance: [1000,3000],
        houseAge: undefined,
        log: undefined,
        lat: undefined,
        storeCount: undefined
      }
    },
    // 初始化图表
    initChart() {
      var priceRangeList = []
      priceRangeList.push({x: 0,y: 0})
      for(var i = 100; i <= 4900; i += 200) {
        priceRangeList.push({x: i, y: Math.floor(Math.random() * 60 + 20)})
      }
      priceRangeList.push({x: 5000,y: 0})
      this.distanceInterval = priceRangeList
    },
    houseAgeInput(e) {
      this.forecast.houseAge = e.replace(/[^\d.]/g,"")
    },
    storeCountInput(e) {
      this.forecast.storeCount = e.replace(/[^\d.]/g,"")
    },
    logInput(e) {
      this.forecast.log = e.replace(/[^\d.]/g,"")
      if(!isNaN(parseFloat(this.forecast.log))){
        this.forecast.log = (parseFloat(this.forecast.log) <= -180 ? -180 : parseFloat(this.forecast.log) >= 180 ? 180 : parseFloat(this.forecast.log)).toString()
      }
    },
    latInput(e) {
      this.forecast.lat = e.replace(/[^\d.]/g,"")
      if(!isNaN(parseFloat(this.forecast.lat))){
        this.forecast.lat = (parseFloat(this.forecast.lat) <= -180 ? -180 : parseFloat(this.forecast.lat) >= 180 ? 180 : parseFloat(this.forecast.lat)).toString()
      }
    },
    storeCountKeyDown(e) {
      e.preventDefault();
      var _this = this;
      var count = parseFloat(_this.forecast.storeCount) || 0;
      if(e.keyCode === 38)
        this.forecast.storeCount = (++count).toString()
      else if(e.keyCode === 40)
        this.forecast.storeCount = ((count-1) < 0 ? 0 : --count).toString()
    },
  },
  mounted() {
    // 初始化
    this.initDom();
    // 初始化图表
    this.initChart();
    this.$nextTick(() => {
      // 初始化地图
      this.initMap();
    })
  },
  created() {
    this.$bus.on('gotHouseData', data => {
      this.houseList = []
      this.rawData = []
      data.forEach((item) => {
        this.houseList.push({'houseCode':item[1],'houseAge':item[2], 'distance': item[3], 'storeCount': item[4], 'log': item[5], 'lat': item[6], 'unitPrice': item[7]})
        this.rawData.push({'houseCode':item[1],'houseAge':item[2], 'distance': item[3], 'storeCount': item[4], 'log': item[5], 'lat': item[6], 'unitPrice': item[7]})
      })
      this.haveData = true
    })
  },
  destroyed() {
    this.map = {}
  }
}
</script>

<style scoped lang="scss">
// 顶部导航
.subheader{
  margin-bottom: 30px;
}
// 主体内容
.content{
  padding: 0 40px;
}

#map{
  overflow: hidden;
  border-radius: 10px;
  border: 5px solid #fff;
  box-shadow: 0 0 30px 0 rgba(82,63,105, .05);
}
// 操作面板
.panel{
  padding: 40px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  filter: drop-shadow(0 0 30px rgba(82,63,105, .3));
}
// filter-button
.filter-button{
  width: 50px;
  height: 50px;
  border-radius: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  position: absolute;
  top: 20px;
  left: 20px;
  background: #f64e60;
  color: #fff;
  line-height: 1;
  cursor: pointer;
  overflow: hidden;
  z-index: 3;
  transition: transform .2s cubic-bezier(.35,-0.84,.76,2.02), box-shadow .3s linear;
}
.filter-button:hover{
  transform: scale(1.1) translateZ(0);
  box-shadow: 3px 3px 30px rgba(#f64e60, .5);
}
.filter-button i{
  width: 20px;
  height: 20px;
}
// 面板
.filter-panel{
  position: absolute;
  transition: all .3s cubic-bezier(.44,-0.54,.55,1.48);
  opacity: 0;
  visibility: hidden;
  transform-origin: left top;
  top: 45px;
  left: 45px;
  width: calc(100% - 85px);
  z-index: 2;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  filter: drop-shadow(0 0 30px rgba(82,63,105, .3));
  transform: translate3d(0,50%,0);
}
.filter-panel.open{
  opacity: 1;
  visibility: visible;
  transform: translate3d(0,0,0);
}
// 表单
.input-group{
  display: flex;
  flex-direction: column;
}
.input-group h3{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 15px;
  margin-bottom: 10px;
}
.input-group h3 span{
  font-size: 12px;
  color: #7e8299;
  font-weight: 400;
  letter-spacing: 1px;
}
.input-button{
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  height: 100%;
}
.input-button a{
  color: #7E8299;
  background-color: #F3F6F9;
  padding: 8px 13px;
  border-radius: 6px;
  margin-right: 10px;
  font-weight: 600;
}
.input-button a.search{
  box-shadow: 0 9px 16px 0 rgb(54,153,255);
  color: #FFFFFF;
  background-color: #3699FF;
}
</style>

<style>
.filter-enter-active,.filter-leave-active{
  opacity: 1;
  transform: translate3d(0,0,0);
  transition: all .3s linear;
  transform-origin: center center;
}
.filter-enter,
.filter-leave-active {
  opacity: 0;
  transform: translate3d(100%,0,0);
}
</style>
