<template>
<!--  学生图表-->
  <div class="zc-card-student-chart" ref="box">
    <div ref="title" class="title-group">
      <h3>学生成绩分类</h3>
      <div class="title-tools">
        <a v-zc-tip.top="'新增节点'" class="success">
          <svg ref="test" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path opacity="0.25" fill-rule="evenodd" clip-rule="evenodd" d="M6.54184 2.36899C4.34504 2.65912 2.65912 4.34504 2.36899 6.54184C2.16953 8.05208 2 9.94127 2 12C2 14.0587 2.16953 15.9479 2.36899 17.4582C2.65912 19.655 4.34504 21.3409 6.54184 21.631C8.05208 21.8305 9.94127 22 12 22C14.0587 22 15.9479 21.8305 17.4582 21.631C19.655 21.3409 21.3409 19.655 21.631 17.4582C21.8305 15.9479 22 14.0587 22 12C22 9.94127 21.8305 8.05208 21.631 6.54184C21.3409 4.34504 19.655 2.65912 17.4582 2.36899C15.9479 2.16953 14.0587 2 12 2C9.94127 2 8.05208 2.16953 6.54184 2.36899Z" fill="#50CD89"></path>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 17C12.5523 17 13 16.5523 13 16V13H16C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11H13V8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8V11H8C7.44772 11 7 11.4477 7 12C7 12.5523 7.44771 13 8 13H11V16C11 16.5523 11.4477 17 12 17Z" fill="#50CD89"></path>
          </svg>
        </a>
        <a @click="svgImage" v-zc-tip.top="'生成图片'" class="info">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path opacity="0.25" d="M2.45153 5.94826C2.71842 4.12109 4.12109 2.71842 5.94826 2.45153C7.54228 2.21869 9.6618 2 12 2C14.3382 2 16.4577 2.21869 18.0517 2.45153C19.8789 2.71842 21.2816 4.12109 21.5485 5.94826C21.7813 7.54228 22 9.6618 22 12C22 14.3382 21.7813 16.4577 21.5485 18.0517C21.2816 19.8789 19.8789 21.2816 18.0517 21.5485C16.4577 21.7813 14.3382 22 12 22C9.6618 22 7.54228 21.7813 5.94826 21.5485C4.12109 21.2816 2.71842 19.8789 2.45153 18.0517C2.21869 16.4577 2 14.3382 2 12C2 9.6618 2.21869 7.54228 2.45153 5.94826Z" fill="#00B2FF"></path>
            <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" fill="#00B2FF"></path>
            <path d="M21.6642 17.2016C21.7024 16.8989 21.5962 16.5963 21.3805 16.3806L17.4143 12.4144C16.6332 11.6334 15.3669 11.6334 14.5858 12.4144L11.7072 15.2931C11.3166 15.6836 10.6835 15.6836 10.293 15.2931L9.41427 14.4144C8.63322 13.6334 7.36689 13.6334 6.58584 14.4144L2.93337 18.0669C2.68517 18.3151 2.57669 18.679 2.70674 19.005C3.24439 20.3529 4.45448 21.3303 5.94832 21.5485C7.54234 21.7813 9.66186 22 12.0001 22C14.3383 22 16.4578 21.7813 18.0518 21.5485C19.879 21.2816 21.2816 19.8789 21.5485 18.0517C21.5878 17.7828 21.6267 17.499 21.6642 17.2016Z" fill="#00B2FF"></path>
          </svg>
        </a>
        <a v-zc-tip.top="'分享至聊天'" class="danger">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path opacity="0.25" fill-rule="evenodd" clip-rule="evenodd" d="M2.36899 6.54184C2.65912 4.34504 4.34504 2.65912 6.54184 2.36899C8.05208 2.16953 9.94127 2 12 2C14.0587 2 15.9479 2.16953 17.4582 2.36899C19.655 2.65912 21.3409 4.34504 21.631 6.54184C21.8305 8.05208 22 9.94127 22 12C22 14.0587 21.8305 15.9479 21.631 17.4582C21.3409 19.655 19.655 21.3409 17.4582 21.631C15.9479 21.8305 14.0587 22 12 22C9.94127 22 8.05208 21.8305 6.54184 21.631C4.34504 21.3409 2.65912 19.655 2.36899 17.4582C2.16953 15.9479 2 14.0587 2 12C2 9.94127 2.16953 8.05208 2.36899 6.54184Z" fill="#F1416C"></path>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12ZM13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12ZM16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z" fill="#F1416C"></path>
          </svg>
        </a>
      </div>
    </div>
<!--    图表-->
    <apexchart v-if="hasData" ref="apexchart" type="scatter" :height="317" :options="chartOptions" :series="series"></apexchart>
    <img v-if="!hasData" :src="require('./work.png')" style="width: 100%;margin: 0 auto;object-fit: cover;object-position: center center" height="317">
  </div>
</template>

<script>
// 图表注册
import VueApexCharts from 'vue-apexcharts'

export default {
  name: "zc-card-student-chart",
  components: {'apexchart': VueApexCharts},
  data() {
    var _this = this;
    return {
      height: 0,
      hasData: false,
      series: [
        {
          name: "第一类",
          data: []
        },
        {
          name: "第二类",
          data: []
        },
        {
          name: "第三类",
          data: []
        },
        {
          name: "第四类",
          data: []
        }
      ],
      chartOptions: {
        markers: {
          onClick: function(e) {
            console.log(e)
          },
          hover: {
            sizeOffset: 3
          }
        },

        chart: {
          type: 'scatter',
          zoom: {
            enabled: true,
            type: 'xy'
          },
          toolbar: {
            show: false,
          }
        },
        grid: {
          show: false,
          padding: {
            top: -10,
            right: 0,
            bottom: 0,
            left: 0
          },
        },
        tooltip: {
          x: {
            show: true,
            formatter: function (value, {seriesIndex, dataPointIndex}){
              return "学生：" + _this.series[seriesIndex].data[dataPointIndex].sno
            }
          },
          y: {
            show: true,
            formatter: function (value, {seriesIndex, dataPointIndex}){
              return "语文:" + value + '分  数学:' + _this.series[seriesIndex].data[dataPointIndex].x + '分'
            }
          }
        },
        xaxis: {
          max: 100,
          min: 0,
          tickAmount: 10,
          type: 'numeric',
          tooltip: {
            formatter: function(val) {
              return "数学：" + val + "分"
            }
          },
          axisTicks: {
            show: false
          },
        },
        type: 'numeric',
        yaxis: {
          max: 100,
          min: 0,
          tickAmount: 10,
          axisBorder: {
            show: true
          },
          labels: {
            offsetX: -13
          },
          axisTicks: {
            show: false
          },
        }
      },

    }
  },
  mounted() {
    this.$nextTick(() => {
      // 初始化
      this.domInit();
    })
    var _this = this;

    // 获得
    this.$bus.on('gotStudentData', (data) => {
      this.series[0].data = []
      this.series[1].data = []
      this.series[2].data = []
      this.series[3].data = []
      var arrayA = data.filter((item) => {return item[4] === 0})
      arrayA.forEach((item) => {
        _this.series[0].data.push({x: item[3],y: item[2], sno: item[1]})
      })
      var arrayB = data.filter((item) => {return item[4] === 1})
      arrayB.forEach((item) => {
        _this.series[1].data.push({x: item[3],y: item[2], sno: item[1]})
      })
      var arrayC = data.filter((item) => {return item[4] === 2})
      arrayC.forEach((item) => {
        _this.series[2].data.push({x: item[3],y: item[2], sno: item[1]})
      })
      var arrayD = data.filter((item) => {return item[4] === 3})
      arrayD.forEach((item) => {
        _this.series[3].data.push({x: item[3],y: item[2], sno: item[1]})
      })
      this.hasData = true
      this.$nextTick(() => {
        this.$refs.apexchart.updateSeries(this.series)
        // 提示上传
        this.$rbNote({
          title: '渲染成功',
          messageType: 'success',
          message: '学生成绩数据可视化渲染完成。'
        })
      })

    })
  },
  methods: {
    // 保存图片
    svgImage(){

    },
    // 初始化
    domInit() {
      let box = this.$refs.box.offsetHeight + 50
      let title = this.$refs.title.offsetHeight
      this.height = box - title
    }
  }
}
</script>

<style scoped lang="scss">
  .zc-card-student-chart{
    background: #fff;
    height: 100%;
    border-radius: 8px;
    padding: 30px;
    padding-top: 20px;
    box-shadow: 0 0 30px 0 rgba(82,63,105, .05);
  }
  // 标题
  .title-group{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
  }
  .title-tools{
    display: inline-flex;
    align-items: center;
  }
  .title-tools a{
    border-radius: 50%;
    width: 34px;
    height: 34px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all ,.3s;
  }
  .title-tools a.success:hover{
    background: rgba(#50CD89,.15);
  }
  .title-tools a.info:hover{
    background: rgba(#00B2FF,.1);
  }
  .title-tools a.danger:hover{
    background: rgba(#F1416C,.1);
  }

</style>
<style>
  .zc-card-student-chart .apexcharts-xaxistooltip{
    background: #fff;
    border-radius: 6px;
    filter: drop-shadow(0 0 5px rgba(82,63,105, .1));
    color: #181c32;
    border: none;
    font-weight: 500;
  }
  .zc-card-student-chart .apexcharts-xaxistooltip::before,.zc-card-student-chart .apexcharts-xaxistooltip::after{
    border-bottom-color: #fff;
  }
  .zc-card-student-chart .apexcharts-tooltip{
    border: none;
    background: rgba(255, 255, 255, 0.96);
    filter: drop-shadow(0 0 10px rgba(82,63,105, .1));
    box-shadow: none;
    border-radius: 8px;
  }
  .zc-card-student-chart .apexcharts-tooltip .apexcharts-tooltip-title{
    background: #F3F6F9 !important;
    border: 0 !important;
    padding: 7px 13px;
    font-weight: 500;
  }
</style>
