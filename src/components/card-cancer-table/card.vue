<template>
  <div class="zc-card-cancer-table">
    <div ref="title" class="title-group">
      <div class="title">
        <h3>诊断结果</h3>
        <span>一共检索到{{cancers.length}}条记录</span>
      </div>
      <div class="title-tools">
        <zc-input v-model="search" style="margin-right: 10px">
          <i slot="prepend" class="fi-rr-search"></i>
        </zc-input>
        <zc-dropdown @command="selectCategory">
          <div class="select">
            <span>{{currentCategory}}</span>
            <i class="fi-rr-angle-small-down"></i>
          </div>
          <zc-dropdown-menu slot="zc-dropdown-menu">
            <ul class="select-menu">
              <zc-dropdown-item class="select-item" :command="false">全部病例</zc-dropdown-item>
              <zc-dropdown-item class="select-item" :command="item" v-for="(item,index) in category" :key="index">{{item}}</zc-dropdown-item>
            </ul>
          </zc-dropdown-menu>
        </zc-dropdown>
      </div>
    </div>
    <div class="student-table">
      <zc-table v-if="showTable" :table-height="500">
        <tr slot="leftThead" class="Thead-head thead">
          <th :width="100">病人编号</th>
        </tr>
        <template slot="leftTbody">
          <tr v-for="(item,index) in cancers" :key="'leftTbody'+index">
            <td>
              <div class="value">
                <h3>PNO-{{item[0]}}</h3>
              </div>
            </td>
          </tr>
        </template>
        <tr class="thead" slot="mainThead">
          <th :width="100">病人年龄</th>
          <th :width="100">是否绝经</th>
          <th :width="100">肿瘤大小</th>
          <th :width="100">淋巴结个数</th>
          <th :width="150">是否有结节冒</th>
          <th :width="150">肿瘤恶性程度</th>
          <th :width="150">肿瘤出现位置</th>
          <th :width="150">肿瘤出现象限</th>
          <th :width="200">是否有放射性治疗经历</th>
        </tr>
        <template slot="mainTbody">
          <tr v-for="(item,index) in cancers" :key="'mainTbody'+index">
            <td>
              <div class="value">
                {{ageValue[item[1]]}}
              </div>
            </td>
            <td>
              <div class="value">
                {{menopauseValue[item[2]]}}
              </div>
            </td>
            <td>
              <div class="value">
                {{tumorValue[item[3]]}}
              </div>
            </td>
            <td>
              <div class="value">
                {{invValue[item[4]]}}
              </div>
            </td>
            <td>
              <div class="value">
                {{capsValue[item[5]]}}
              </div>
            </td>
            <td>
              <div class="value">
                {{maligValue[item[6]-1]}}
              </div>
            </td>
            <td>
              <div class="value">
                {{breastValue[item[7]]}}
              </div>
            </td>
            <td>
              <div class="value">
                {{quadValue[item[8]]}}
              </div>
            </td>
            <td>
              <div class="value">
                {{irradiatValue[item[9]]}}
              </div>
            </td>
          </tr>
        </template>
        <tr class="Thead-bottom thead" slot="rightThead">
          <th :width="100">诊断结果</th>
        </tr>
        <template slot="rightTbody">
          <tr v-for="(item,index) in cancers" :key="'rightTbody'+index">
            <td>
              <div class="value">
                <span class="tag" :class="[{'health':item[10]===0},{'danger':item[10]===1}]">{{forecastValue[item[10]]}}</span>
              </div>
            </td>
          </tr>
        </template>
      </zc-table>
      <div class="empty" v-if="!showTable">
        <img :src="require('@/assets/images/cancer_table-empty.png')">
        <span>正在等待数据</span>
      </div>
    </div>
  </div>
</template>

<script>
import ZcInput from "@/components/input/input";
import ZcDropdown from "@/components/dropdown/dropdown";
import ZcDropdownMenu from "@/components/dropdown-menu/dropdown-menu";
import ZcDropdownItem from "@/components/dropdown-item/dropdown-item";
import ZcTable from "@/components/table/table";
export default {
  name: "zc-card-cancer-table",
  components: {ZcTable, ZcDropdownItem, ZcDropdownMenu, ZcDropdown, ZcInput},
  data(){
    return {
      cancers: [],
      search: '',
      category: ['健康', '确诊癌症'],
      currentCategory: '全部病例',
      showTable: false,
      ageValue: ["10-19","20-29","30-39","40-49","50-59","60-69","70-79","80-89","90-99"],
      menopauseValue: ['40岁之前','40岁以后','没有绝经'],
      tumorValue: ['0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59'],
      invValue: ['0-2', '3-5', '6-8', '9-11', '12-14', '15-17', '18-20', '21-23', '24-26', '27-29', '30-32', '33-35', '36-39'],
      capsValue: ['有结节冒', '没有结节冒'],
      maligValue: ['等级一' ,'等级二', '等级三'],
      breastValue: ['左侧' ,'右侧'],
      quadValue: ['左上（第一象限）', '左下（第四象限）', '右上（第二象限）', '右下（第三象限）', '中间部位'],
      irradiatValue: ['拥有', '从未'],
      forecastValue: ['健康', '确诊癌症']
    }
  },
  methods: {
    // 选择类别
    selectCategory(msg) {
      if(msg)
        this.currentCategory = msg
      else
        this.currentCategory = '全部病例'
    },
    retrieveData(search,currentCategory){
      var category = currentCategory === "健康" ? 0 : currentCategory === "确诊癌症" ? 1 :  -1;

      if(search !== '' && category !== -1)
        this.cancers = this.initial.filter((item) => {return item[0].indexOf(search) !== -1 && item[10] === category})
      else if(search !== '' && category === -1)
        this.cancers = this.initial.filter((item) => {return item[0].indexOf(search) !== -1})
      else if(search === '' && category !== -1)
        this.cancers = this.initial.filter((item) => {return item[10] === category})
      else
        this.cancers = this.initial
    }
  },
  watch: {
    search: function (val){
      this.retrieveData(val,this.currentCategory)
    },
    currentCategory: function (val){
      this.retrieveData(this.search,val)
    }
  },
  created() {
    var _this = this
    this.$bus.on('gotCancerDate', data => {
      _this.cancers = data
      _this.initial = data
      this.$nextTick(() => {
        this.showTable = true
      })
      setTimeout(() => {
        // 提示上传
        this.$rbNote({
          title: '拉取成功',
          messageType: 'success',
          message: '诊断病例完成。'
        })
      }, 500)
    })
  }
}
</script>

<style scoped lang="scss">
// 容器
.zc-card-cancer-table{
  background: #fff;
  height: 100%;
  border-radius: 8px;
  padding: 20px 30px;
  box-shadow: 0 0 30px 0 rgba(82,63,105, .05);
}
// 标题
.title-group{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
}
.title{
  display: inline-flex;
  flex-direction: column;
}
.title h3{
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
}
.title span{
  color: #b5b5c3;
  font-size: 13px;
  font-weight: 500;
  margin-top: 6px;
  line-height: 1.2;
}
.title-tools{
  display: inline-flex;
  align-items: center;
}
.title-tools .fi-rr-search{
  color: #a1a5b7;
}
// 下拉选择
.select{
  height: 40px;
  padding: 10px 16px;
  background-color: #f3f3f4;
  border-radius: 6px;
  width: 125px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
.select-menu{
  width: 150px;
  box-shadow: 0 0 50px 0 rgba(82,63,105,0.15);
  border-radius: 8px;
  background: #fff;
  margin: 3px 0;
  padding: 10px 0;
}
.select-item{
  display: block;
  padding: 10px 15px;
  cursor: pointer;
}
.select-item:hover{
  background: #f3f6f9;
}
// 空
.empty{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px;
  justify-content: center;
}
.empty img{
  width: 300px;
  margin-top: 30px;
}
.empty span{
  font-size: 12px;
  color: #7e8299;
  margin-top: 15px;
}

// 表格
.student-table{
  overflow: hidden;
  margin-top: 15px;
}
.table{
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 10px;
  table-layout: fixed;
}
.thead th{
  padding: 13px 15px;
  line-height: 1;
  background-color: #F3F6F9;
  letter-spacing: 1px;
  color: #B5B5C3;
  font-weight: 500;
  text-align: left;
}
.Thead-head th{
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  color: #181c32;
}
.Thead-bottom th{
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  color: #181c32;
}
.value{
  height: 64px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.tag{
  padding: 12px 6px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border-radius: 3px;
}
.tag.health{
  color: #1BC5BD;
  background-color: #C9F7F5;
}
.tag.danger{
  color: #F64E60;
  background-color: #FFE2E5;
}
</style>
