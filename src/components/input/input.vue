<template>
<!--  输入框-->
  <div class="zc-input">
    <!--    icon插槽-->
    <div class="rb-input-icon" v-if="$slots.prepend">
      <slot name="prepend"></slot>
    </div>
    <input type="text"
           :value="value"
           :class="[{'hasPre':$slots.prepend},{'error':status==='error'}]"
           @input="$emit('input', $event.target.value)"
           @focus="$emit('focus', $event.target.value)"
           @blur="$emit('blur', $event.target.value)"
           @change="$emit('change', $event.target.value)"
           @keydown="$emit('keydown', $event)"
    />
    <svg v-zc-tip.left="'您的输入有误'" v-if="status==='error'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <rect x="0" y="0" width="24" height="24"/>
        <circle fill="#f64e60" opacity="0.3" cx="12" cy="12" r="10"/>
        <path d="M12.0355339,10.6213203 L14.863961,7.79289322 C15.2544853,7.40236893 15.8876503,7.40236893 16.2781746,7.79289322 C16.6686989,8.18341751 16.6686989,8.81658249 16.2781746,9.20710678 L13.4497475,12.0355339 L16.2781746,14.863961 C16.6686989,15.2544853 16.6686989,15.8876503 16.2781746,16.2781746 C15.8876503,16.6686989 15.2544853,16.6686989 14.863961,16.2781746 L12.0355339,13.4497475 L9.20710678,16.2781746 C8.81658249,16.6686989 8.18341751,16.6686989 7.79289322,16.2781746 C7.40236893,15.8876503 7.40236893,15.2544853 7.79289322,14.863961 L10.6213203,12.0355339 L7.79289322,9.20710678 C7.40236893,8.81658249 7.40236893,8.18341751 7.79289322,7.79289322 C8.18341751,7.40236893 8.81658249,7.40236893 9.20710678,7.79289322 L12.0355339,10.6213203 Z" fill="#f64e60"/>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "zc-input",
  model: {
    prop: 'value',
    event: 'input'
  },
  watch: {
    status: function (val) {
      this.status = val
    }
  },
  methods: {
    inputHandle() {

    }
  },
  props: {
    value: [String,Number],
    number: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: 'normal',
      validator: function (val){
        return ['','normal','error'].includes(val);
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .zc-input{
    position: relative;
  }
  .zc-input input{
    width: 100%;
    font-size: 14px;
    line-height: 14px;
    height: 40px;
    padding: 10px 16px;
    outline: none;
    appearance: none;
    border-style: solid;
    background-color: #f3f3f4;
    border-color: #f3f3f4;
    border-width: 1px;
    color: #5e6278;
    min-height: 34px;
    border-radius: 6px;
    transition: background-color 200ms ease,
                outline 200ms ease,
                color 200ms ease,
                box-shadow 200ms ease,
                -webkit-box-shadow 200ms ease;
    font-family: "Helvetica", "PingFang SC", "Lantinghei SC", "Microsoft YaHei", "HanHei SC", "Open Sans", Arial, "Hiragino Sans GB", 微软雅黑, STHeiti, "WenQuanYi Micro Hei", SimSun, sans-serif;
  }
  .zc-input input:hover{
    box-shadow: 0 0 0 4px rgba(#0080FF,.3);
    background-color: #fff;
    border-color: #dfdfdf;
  }
  .zc-input input:focus{
    box-shadow: 0 0 0 4px rgba(#0080FF,.2);
    border-color: #0080FF;
    background: #fff;
  }
  .zc-input input.hasPre{
    padding-left: 32px!important;
  }
  .zc-input input.error{
    border-color: #f64e60;
    padding-right: 32px;
  }
  .zc-input svg {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translate3d(0,-50%,0);
  }
  .rb-input-icon{
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translate3d(0,-50%,0);
  }
</style>
