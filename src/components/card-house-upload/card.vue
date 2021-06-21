<template>
  <div class="zc-card-house-upload">
    <h4>House Price Forecasting</h4>
    <p>请点击按钮选择并上传csv格式的房价数据并对房价进行预测月查询管理。</p>
    <a>选择数据</a>
  </div>
</template>

<script>
export default {
  name: "zc-card-house-upload"
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
