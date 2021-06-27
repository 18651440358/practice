<template>
<!--  上传学生信息-->
  <div class="zc-card-student-upload">
    <div class="title">
      <h3>Kickstart<br>First Application</h3>
      <p>请选择并上传csv格式的学生数据并对学生数据信息分析。</p>
      <div class="button">
        <a @click="updateStudentInfo">选择数据</a>
          <input style="position: absolute;opacity: 0;z-index: -2" @change="submitFile" name="file" type="file" ref="file" accept=".csv">
      </div>
    </div>
    <img :src="require('@/assets/images/student_upload.png')">
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "zc-card-student-upload",
  methods: {
    // 上传学生信息
    updateStudentInfo() {
      // 选择文件
      this.$refs.file.click();
    },
    submitFile(e) {
      // 提交表单
      // this.$refs.form.submit();
      let self = this
      let file = e.target.files[0]
      let param = new FormData()  // 创建form对象
      param.append('file', file)  // 通过append向form对象添加数据
      // console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      // 提示上传
      this.$rbNote({
        title: '正在上传文件',
        messageType: 'loading2',
        message: '正在生成学生预测模型。。。'
      })
      // 添加请求头
      axios.post(this.$domain + '/update/studentsInfo', param, config)
          .then(res => {
            self.$bus.emit('gotStudentData',res.data)
          })
    },
  }
}
</script>

<style scoped lang="scss">
  .zc-card-student-upload{
    background: #fff;
    height: 100%;
    //max-height: 436px;
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0 0 30px 0 rgba(82,63,105, .05);
  }
  // 标题
  .title{
    margin-top: 20px;
    text-align: center;
  }
  .title h3{
    font-size: 1.5rem;
    margin-bottom: 20px;
    font-weight: 800;
  }
  .title p{
    color: #7e8299;
    font-size: 14px;
  }
  .button{
    padding-top: 20px;
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
  }
  .title a{
    display: inline-block;
    color: #fff;
    background-color: #00b2ff;
    padding: 10px 24px;
    border-radius: 6px;
    font-weight: 500;
    font-size: 14px;
  }
  .zc-card-student-upload img{
    width: 100%;
  }
</style>
