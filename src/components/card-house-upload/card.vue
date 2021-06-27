<template>
  <div class="zc-card-house-upload">
    <h4>House Price Forecasting</h4>
    <p>请点击按钮选择并上传csv格式的房价数据并对房价进行预测月查询管理。</p>
    <a @click="selectDate">选择数据</a>
    <input style="position: absolute;opacity: 0;z-index: -2" @change="submitFile" name="file" type="file" ref="file" accept=".csv">
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "zc-card-house-upload",
  methods: {
    selectDate() {
      // 选择文件
      this.$refs.file.click();
    },
    submitFile(e) {
      let self = this
      let file = e.target.files[0]
      let param = new FormData()  // 创建form对象
      param.append('file', file)  // 通过append向form对象添加数据
      // console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      // 添加请求头
      axios.post(this.$domain + '/update/housesInfo', param, config)
          .then(res => {
            // 发送数据
            self.$bus.emit('gotHouseData', res.data)
          })

    }
  }
}
</script>

<style scoped lang="scss">
  .zc-card-house-upload{
    position: relative;
    padding: 26px;
    border-radius: 8px;
    background-color: #F64E60;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-image: url('./background.svg');
    background-position: calc(100% + 0.5rem) bottom;
    background-size: auto 70%;
    background-repeat: no-repeat;
  }
  .zc-card-house-upload h4{
    font-size: 18px;
    font-weight: 800;
    margin: 6px 0;
  }
  .zc-card-house-upload p{
    width: 70%;
    margin: 20px 0;
  }
  .zc-card-house-upload a{
    color: #ffffff;
    background-color: #FFA800;
    padding: 6px 20px;
    border-radius: 6px;
    display: inline-block;
  }

</style>
