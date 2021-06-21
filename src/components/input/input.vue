<template>
<!--  输入框-->
  <div class="zc-input">
    <!--    icon插槽-->
    <div class="rb-input-icon" v-if="$slots.prepend">
      <slot name="prepend"></slot>
    </div>
    <input type="text"
           :value="value"
           :class="{'hasPre':$slots.prepend}"
           @input="$emit('input', $event.target.value)"
           @focus="$emit('focus', $event.target.value)"
           @blur="$emit('blur', $event.target.value)"
           @change="$emit('change', $event.target.value)" />
  </div>
</template>

<script>
export default {
  name: "zc-input",
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: String,
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
  .rb-input-icon{
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translate3d(0,-50%,0);
  }
</style>
