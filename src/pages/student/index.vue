<template>
  <div class="zc-page-student-index">
<!--    顶部-->
    <div class="subheader">
      <zc-subheader
          title="学生群组挖掘"></zc-subheader>
    </div>
<!--    主体内容-->
    <section class="content">
      <zc-row :spacing="15" flex align="stretch">
        <zc-col :grid="8">
<!--          上传-->
          <zc-card-student-upload></zc-card-student-upload>
        </zc-col>
        <zc-col :grid="16">
<!--          显示图表-->
          <zc-card-student-chart></zc-card-student-chart>
        </zc-col>
      </zc-row>
      <zc-row style="margin-top: 30px">
        <zc-col>
<!--          表格-->
          <zc-card-student-table></zc-card-student-table>
        </zc-col>
      </zc-row>
    </section>
  </div>
</template>

<script>
import ZcSubheader from "@/components/subheader/subheader";
import ZcRow from "@/components/row/row";
import ZcCol from "@/components/col/col";
import ZcCardStudentUpload from "@/components/card-student-upload/card";
import ZcCardStudentChart from "@/components/card-student-chart/card";
import ZcCardStudentTable from "@/components/card-student-table/card";
export default {
  name: "zc-page-student-index",
  components: {ZcCardStudentTable, ZcCardStudentChart, ZcCardStudentUpload, ZcCol, ZcRow, ZcSubheader},
  mounted() {
    // 发送登录数据
    this.$bus.emit('user',this.$route.params.user[0])
    // 发送团队信息
    this.$bus.emit('team',this.$route.params.team)
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
