<template>
<!--  滑块-->
  <div class="zc-slider">
<!--    图表-->
    <apexchart
        style="margin-bottom: -10px"
        width="100%"
        height="40"
        type="area"
        :options="options"
        :series="series"
        v-if="data"
    ></apexchart>
<!--    滑块主体-->
    <div class="zc-slide-way" ref="slider">
<!--      开始按钮-->
      <div class="button" v-if="interval" @mousedown="startMousedown" :style="startStyle"></div>
<!--      当前满足条-->
      <div class="satisfy" :style="satisfyStyle"></div>
      <!--      结束按钮-->
      <div class="button" @mousedown="endMousedown" :style="endStyle"></div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: "zc-slider",
  components: {
    'apexchart': VueApexCharts
},
  model: {
    prop: "value",
    event: "sliderHandle"
  },

  watch: {
    name: function (val) {
      this.name = val
      this.series = [
        {
          name: this.name,
          data: this.data
        }
      ]
    },
    startX: function (val){
      this.$emit('sliderHandle',[Math.floor(val / this.$refs.slider.getBoundingClientRect().width * (this.max - this.min)) + this.min,Math.floor(this.endX / this.$refs.slider.getBoundingClientRect().width * (this.max - this.min)) + this.min])
    },
    endX: function (val){
      if(this.interval)
        this.$emit('sliderHandle',[Math.floor(this.startX / this.$refs.slider.getBoundingClientRect().width * (this.max - this.min)) + this.min,Math.floor(val / this.$refs.slider.getBoundingClientRect().width * (this.max - this.min)) + this.min])
      else
        this.$emit('sliderHandle',[Math.floor(val / this.$refs.slider.getBoundingClientRect().width * (this.max - this.min)) + this.min])
    },
    data: function (val){
      this.data = val
    }
  },
  props: {
    name: {
      type: String,
      default: 'range'
    },
    interval: {
      type: Boolean,
      default: false
    },
    value: Array,
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    data: Array
  },
  mounted() {
    // 初始化滑块数据
    setTimeout(() => {
      this.value && this.initSlider()
    },1000)

    console.log(this.$refs.slider.offsetWidth)
  },

  computed: {
    getName() {
      return this.name
    },
    startStyle() {
      return {
        position: 'absolute',
        // left: `${this.startX - 8}px`,
        transform: `translate3d(${this.startX - 8}px,0,0)`,
        top: '-7px',
        zIndex: `${this.startZ}`
      }
    },
    endStyle() {
      return {
        position: 'absolute',
        transform: `translate3d(${this.endX - 8}px,0,0)`,
        top: '-7px',
        zIndex: `${this.endZ}`
      }
    },
    satisfyStyle() {
      return {
        position: 'absolute',
        transform: `translate3d(${this.startX}px,0,0)`,
        left: '0px',
        top: '-1px',
        width: `${this.endX - this.startX}px`,
      }
    },
    series(){
      return [
        {
          name: this.name,
          data: this.data
        }
      ]
    }
  },
  data() {
    return {
      startX: 0,
      endX: 0,
      startZ: 2,
      endZ: 2,

      options: {
        chart: {
          sparkline: {
            enabled: true,
          },
        },
        fill: {
          colors: ['#0080FF'],
          opacity: 0.3,
          type: 'solid'
        },
        stroke: {
          curve: 'smooth',
          width: 1,
        },
        dataLabels: {
          // enabled: false
        },
        tooltip: {
          enabled: true,
          x: {
            show: false
          },
          marker: {
            show: false,
          },
          y: {
          }
        },
        xaxis: {
          type: 'numeric',
          min: this.min,
          max: this.max,
          tooltip: {
            enabled: false,
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          min: 0,
          max: 100,
          crosshairs: {
            show: false
          },
          tooltip: {
            enabled: false,
          }
        },
        grid: {
          padding: {
            // top: 0
          }
        }
      },
    }
  },
  methods: {
    // 初始化
    initChart() {

    },
    // 初始化滑块数据
    initSlider() {
      if (this.value.length === 0) return
      // 初始化滑块位置
      if(this.interval){
        // 区间滑块
        this.startX = this.$refs.slider.getBoundingClientRect().width / (this.max - this.min) * (this.value[0] - this.min)
        this.endX = this.$refs.slider.getBoundingClientRect().width / (this.max - this.min) * (this.value[1] - this.min)
      }else
        // 单个滑块
        this.endX = this.$refs.slider.getBoundingClientRect().width / (this.max - this.min) * (this.value[0] - this.min)
    },
    startMousedown(e){
      let disX = e.clientX - this.startX;
      document.onmousemove = (e)=>{
        this.startX = e.clientX - disX;
        if(e.clientX - disX <= 0)
          this.startX = 0
        else if(e.clientX - disX >= this.endX)
          this.startX = this.endX
      }
      document.onmouseup = () => {
        this.endZ = 2
        this.startZ = 3
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    endMousedown(e){
      let disX = e.clientX - this.endX;
      document.onmousemove = (e)=>{
        this.endX = e.clientX - disX;
        if(e.clientX - disX >= this.$refs.slider.getBoundingClientRect().width)
          this.endX = this.$refs.slider.offsetWidth
        else if(e.clientX - disX <= this.startX)
          this.endX = this.startX
        else if(e.clientX - disX <= 0)
          this.endX = 0
      }
      document.onmouseup = () => {
        this.endZ = 3
        this.startZ = 2
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }
}
</script>

<style scoped lang="scss">
  .zc-slider {
    width: 100%;
    padding: 0 8px;
    user-select: none;
  }
  // 滑块
  .zc-slide-way{
    width: 100%;
    height: 3px;
    position: relative;
    border-radius: 3px;
    background-color: #d1e3f5;
    margin: 10px 0;
  }
  // 按钮
  .button{
    width: 16px;
    height: 16px;
    border: 3px solid #0080FF;
    background-color: #fff;
    border-radius: 50%;
    cursor: pointer;
    z-index: 2;
    transition: filter .3s;
  }
  //.button:hover{
  //  filter: drop-shadow(0 0 5px rgba(#0080FF,.3));
  //}
  // 填充滑块
  .satisfy{
    height: 5px;
    border-radius: 5px;
    background-color: #0080FF;
    will-change: width;
  }
</style>

<style lang="scss">
.zc-slider .apexcharts-tooltip {
  background: #fff;
  color: #181c32;
  filter: drop-shadow(0 0 30px rgba(82,63,105, .3));
  border: none;
}
</style>
