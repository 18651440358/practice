<template>
<!--  上传癌症信息-->
  <div class="zc-card-cancer-upload">
    <h3>Kickstart First Application</h3>
    <p>请选择并上传csv格式的病例数据并诊断病情。</p>
    <a @click="updateCancerInfo">选择数据</a>
    <img src="./cancer_upload.png" alt="" />
    <input style="position: absolute;opacity: 0;z-index: -2" @change="submitFile" name="file" type="file" ref="file" accept=".csv">
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "zc-card-cancer-upload",
  methods: {
    updateCancerInfo() {
      // 选择文件
      this.$refs.file.click();
    },
    submitFile(e){
      let self = this
      let file = e.target.files[0]
      let param = new FormData()
      param.append('file', file)
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      this.$rbNote({
        title: '正在上传文件',
        messageType: 'loading2',
        message: '正在诊断病例。。。'
      })
      // 添加请求头
      axios.post(this.$domain + '/update/cancerInfo', param, config)
          .then(res => {
            self.$bus.emit('gotCancerDate',res.data)
          })
    }
  }
}
</script>

<style scoped lang="scss">
  .zc-card-cancer-upload{
    background: #fff;
    height: 100%;
    //max-height: 436px;
    border-radius: 8px;
    padding: 30px;
    padding-top: 70px;
    box-shadow: 0 0 30px 0 rgba(82,63,105, .05);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .zc-card-cancer-upload h3{
    font-size: 1.5rem;
    margin-bottom: 20px;
    font-weight: 800;
    text-align: center;
  }
  .zc-card-cancer-upload p{
    color: #7e8299;
    font-size: 14px;
    text-align: center;
  }
  .zc-card-cancer-upload a{
    display: inline-block;
    color: #fff;
    background-color: #50CD89;
    padding: 10px 24px;
    border-radius: 6px;
    font-weight: 500;
    font-size: 14px;
    margin: 0 auto;
    margin-top: 40px;
  }
  .zc-card-cancer-upload img{
    width: 120%;
    margin-top: 60px;
  }
</style>
