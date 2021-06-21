<template>
  <div class="zc-subheader">
    <div class="left">
      <h1>{{title}}
        <span>updates and statistics</span>
      </h1>
    </div>
    <div class="right">
      <a v-zc-tip.bottom="today" class="button">{{ today }}</a>
      <a v-zc-tip.bottom="'添加条目'" class="button">添加条目</a>
      <a v-zc-tip.bottom="'生成报告'" class="danger button">生成报告</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "zc-subheader",
  props: {
    title: {
      type: String,
      default: '系统标题'
    }
  },
  computed: {
    today() {
      let aData = new Date();
      return aData.getFullYear() + "·" + (aData.getMonth() + 1) + "·" + aData.getDate();
    }
  }
}
</script>

<style scoped>
  .zc-subheader{
    width: 100%;
    padding: 0 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .left,.right{
    display: flex;
    padding: 7px 0;
  }
  .left h1{
    font-size: 20px;
    font-weight: 500;
    display: flex;
    align-items: flex-end;
  }
  .left span{
    color: #b5b5c3;
    font-size: 14px;
    margin-left: 10px;
    font-weight: 400;
  }
  .right .button{
    height: 36px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 7px;
    padding: 0 20px;
    color: #7e8299;
    font-weight: 500;
    margin-left: 10px;
  }
  .button.danger{
    color: #fff;
    background-color: #f64e60;
  }
</style>
