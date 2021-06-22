<template>
  <div class="zc-card-house-item">
    <div class="house-portrait" @click="fly(log,lat)">
      <img :src="randomPortrait()" alt="" />
<!--      距离-->
      <div class="distance">
        <i class="fi-sr-marker"></i>
        <span>地铁 {{distance.toFixed(2)}} 米</span>
      </div>
    </div>
    <div class="house-info">
      <div class="price">
        <h2>{{unitPrice.toFixed(2)}}</h2>
        <span>万/平</span>
      </div>
      <div class="info-group">
        <div>
          <i class="fi-sr-alarm-clock"></i>
          <span>{{houseAge}}年</span>
        </div>
        <div>
          <i class="fi-sr-shop"></i>
          <span>{{storeCount}}商业区</span>
        </div>
      </div>
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
      return require('@/assets/images/house/house' + (1 + Math.floor(Math.random() * 14)) + '.png')
    },
    // 跳转
    fly(log,lat){
      this.$emit('fly',{log,lat})
    }
  }
}
</script>

<style scoped lang="scss">
  .zc-card-house-item{
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
  }
  .house-portrait{
    position: relative;
    padding-top: 75%;
    overflow: hidden;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

  }
  .house-portrait img{
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    display: block;
    height: 100%;
    object-fit: cover;
    object-position: center;
    cursor: pointer;
  }
  // 距离
  .distance{
    padding: 6px;
    color: #fff;
    background: rgba(255,255,255,.3);
    border-radius: 50px;
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 12px;
    backdrop-filter: blur(10px);
    display: inline;
    align-items: center;
  }
  .distance span{
    margin-left: 5px;
    font-weight: 600;
  }
  // info
  .house-info{
    padding: 10px;
  }
  .house-info h3{
    font-size: 14px;
  }

  .info-group{
    display: flex;
    align-items: center;
    margin-top: 5px;
  }
  .info-group div{
    display: inline-flex;
    align-items: center;
    font-size: 12px;
    color: #7e8299;
    margin-right: 5px;
    line-height: 1;
    font-weight: 600;
  }
  .info-group i{
    //color: #50CD89;
    margin-right: 3px;
  }
  .price{
    display: flex;
    //margin-top: 3px;
    color: #0080FF;
    align-items: flex-end;
    line-height: 1;
  }
  .price{
    font-weight: 800;
  }
  .price span{
    margin-left: 3px;
    font-size: 12px;
    letter-spacing: 1px;
  }
</style>
