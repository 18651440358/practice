<template>
  <div class="zc-page-house-price-index">
    <div class="subheader" ref="header">
      <zc-subheader @click.native="findSchool" title="房屋价格预测系统"></zc-subheader>
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
        </zc-col>
      </zc-row>
    </section>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'
const mapboxgl = require('mapbox-gl');  //引入组件
import ZcSubheader from "@/components/subheader/subheader";
import ZcRow from "@/components/row/row";
import ZcCol from "@/components/col/col";
import ZcCardHouseUpload from "@/components/card-house-upload/card";
import ZcCardHouseItem from "@/components/card-house-item/card";
export default {
  name: "zc-page-house-price-index",
  components: {ZcCardHouseItem, ZcCardHouseUpload, ZcCol, ZcRow, ZcSubheader, Swiper, SwiperSlide},
  directives: {
    swiper: directive
  },
  data() {
    return {
      map: {},
      height: 0,
      haveData: true,
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
      }
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
        center: [118.93592026803236,32.120796221894416], // 初始坐标系，这个是南京建邺附近
        zoom: 16,     // starting zoom 地图初始的拉伸比例
        pitch: 0,  //地图的角度，不写默认是0，取值是0-60度，一般在3D中使用
        bearing: 0, //地图的初始方向，值是北的逆时针度数，默认是0，即是正北
        antialias: true, //抗锯齿，通过false关闭提升性能
      });
    },
    flyHandle({log,lat}){
      // if(index === 1)
      //
      // else
      //   this.map.flyTo({
      //     center: [121.51649,24.96447],
      //     essential: true // this animation is considered essential with respect to prefers-reduced-motion
      //   });
      this.map.flyTo({
            center: [log,lat],
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
          });
    },
    findSchool(){
      this.map.flyTo({
        center: [118.93592026803236,32.120796221894416],
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
      });
    }
  },
  mounted() {
    // 初始化
    this.initDom();
    this.$nextTick(() => {
      // 初始化地图
      this.initMap();
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
</style>
