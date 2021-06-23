<template>
<!--  上传学生信息-->
  <div class="zc-card-student-upload">
    <div class="title">
      <h3>Kickstart<br>First Application</h3>
      <p>请选择并上传csv格式的学生数据并对学生数据信息分析。</p>
      <div class="button">
        <a>选择数据</a>
      </div>
    </div>
    <img :src="require('@/assets/images/student_upload.png')">
  </div>
</template>

<script>
export default {
  name: "zc-card-student-upload"
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
