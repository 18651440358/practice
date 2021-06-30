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
  <!--     上传-->
          <zc-card-cancer-upload></zc-card-cancer-upload>
        </zc-col>
        <zc-col :grid="16">
          <zc-card-forecast-cancer></zc-card-forecast-cancer>
        </zc-col>
      </zc-row>
      <zc-row style="margin-top: 30px">
        <zc-col>
<!--          表格-->
          <zc-card-cancer-table></zc-card-cancer-table>
        </zc-col>
      </zc-row>
    </section>
  </div>
</template>

<script>
// import axios from 'axios'
import ZcSubheader from "@/components/subheader/subheader";
import ZcRow from "@/components/row/row";
import ZcCol from "@/components/col/col";
import ZcCardCancerUpload from "@/components/card-cancer-upload/card";
import ZcCardForecastCancer from "@/components/card-forecast-cancer/card";
import ZcCardCancerTable from "@/components/card-cancer-table/card";
export default {
  name: "zc-page-cancer-index",
  components: {ZcCardCancerTable, ZcCardForecastCancer, ZcCardCancerUpload, ZcCol, ZcRow, ZcSubheader},
  data() {
    return {

    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
// 顶部导航
.subheader{
  margin-bottom: 30px;
}
// 主体内容
.content{
  padding: 0 40px;
}
</style>
