<template>
  <div class="zc-card-house-item">
    <div class="house-portrait">
      <img :src="randomPortrait" alt="">
<!--      距离-->
      <div class="distance"></div>
    </div>

  </div>
</template>

<script>
export default {
  name: "zc-card-house-item",
  props: {
    distance: Number,
    transactionDate: String,
    houseAge: Number,
    storeCount: Number,
    log: Number,
    lat: Number,
    unitPrice: Number
  },
  methods: {
    // 随机选择图片
    randomPortrait() {
      return require('@/assets/images/' + (1 + Math.floor(Math.random() * 14)) + '.png')
    }
  }
}
</script>

<style scoped>

</style>
