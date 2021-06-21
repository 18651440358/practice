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
            <swiper v-if="haveData">
              <swiper-slide>11</swiper-slide>
              <swiper-slide>22</swiper-slide>
              <swiper-slide>33</swiper-slide>
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
export default {
  name: "zc-page-house-price-index",
  components: {ZcCardHouseUpload, ZcCol, ZcRow, ZcSubheader, Swiper, SwiperSlide},
  directives: {
    swiper: directive
  },
  data() {
    return {
      map: {},
      height: 0,
      haveData: false
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
        center: [118.92983417850085, 32.12182486408519], // 初始坐标系，这个是南京建邺附近
        zoom: 15,     // starting zoom 地图初始的拉伸比例
        pitch: 0,  //地图的角度，不写默认是0，取值是0-60度，一般在3D中使用
        bearing: 0, //地图的初始方向，值是北的逆时针度数，默认是0，即是正北
        antialias: true, //抗锯齿，通过false关闭提升性能
      });
      this.map.on('click', function() {
        console.log('123')
      });
    },
    fly(index){
      if(index === 1)
        this.map.flyTo({
          center: [121.54024,24.98298],
          essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
      else
        this.map.flyTo({
          center: [121.51649,24.96447],
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
}
</style>
