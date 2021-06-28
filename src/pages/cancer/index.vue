<template>
  <div class="zc-page-cancer-index">
    <!--    顶部-->
    <div class="subheader">
      <zc-subheader
          title="癌症复发诊断系统"></zc-subheader>
    </div>
<!--    主体内容-->
    <section class="content">
      <zc-row :spacing="15" flex align="stretch">
        <zc-col :grid="8">
<!--      上传-->

        </zc-col>
        <zc-col :grid="16">

        </zc-col>
      </zc-row>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import ZcSubheader from "@/components/subheader/subheader";
import ZcRow from "@/components/row/row";
import ZcCol from "@/components/col/col";
export default {
  name: "zc-page-cancer-index",
  components: {ZcCol, ZcRow, ZcSubheader},
  data() {
    return {
      list: []
    }
  },
  created() {

  },
  methods: {
    sendMsg() {
      axios.post(this.$domain + '/admin/sendMsg',{
        a: 1,
        b: 3
      }).then(res => {
        window.console.log(res)
      })
    }
  }
}
</script>

<style scoped>

</style>
