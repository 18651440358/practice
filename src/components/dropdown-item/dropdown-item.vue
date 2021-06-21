<template>
  <li class="zc-dropdown-item" @click="handleClick">
    <slot></slot>
  </li>
</template>

<script>
import pop from '@/util/floating'
export default {
  name: "zc-dropdown-item",
  mixins: [pop],
  props: {
    command: {}
  },
  methods: {
    handleClick() {
      this.dispatch(this.$parent, "ZcDropdown", "menu-item-click", [
        this.command,
        this
      ])
    }
  }
}
</script>

<style scoped>

</style>
