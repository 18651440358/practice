<template>
  <div class="zc-card-student-table">
    <div ref="title" class="title-group">
      <div class="title">
        <h3>学生及成绩列表</h3>
        <span>一共检索到{{students.length}}条记录</span>
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
              <zc-dropdown-item class="select-item" :command="false">全部</zc-dropdown-item>
              <zc-dropdown-item class="select-item" :command="item" v-for="(item,index) in category" :key="index">{{item}}</zc-dropdown-item>
            </ul>
          </zc-dropdown-menu>
        </zc-dropdown>
      </div>
    </div>
    <div class="student-table">
      <transition name="table">
        <table class="table" v-if="showTable">
          <thead class="thead">
            <tr>
              <th style="min-width: 200px">学生信息</th>
              <th style="min-width: 100px">语文成绩</th>
              <th style="min-width: 100px">数学成绩</th>
              <th style="min-width: 100px">所在分组</th>
              <th style="min-width: 280px">操作</th>
            </tr>
          </thead>
          <tbody class="tbody">
            <tr v-for="(stu,index) in students" :key="index">
              <td class="first">
                <div class="student-user">
                  <div class="student-portrait">
                    <img :src="randomAvatars()" />
                  </div>
                  <div class="student-title">
                    <h4>学生{{index + 1}}</h4>
                    <span>{{stu.sno}}</span>
                  </div>
                </div>
              </td>
              <td>
                <h4>{{stu.chinese}}分</h4>
                <span>语文成绩</span>
              </td>
              <td>
                <h4>{{stu.math}}分</h4>
                <span>数学成绩</span>
              </td>
              <td>
                <span class="tab info" v-if="stu.category === 0">第一类</span>
                <span class="tab success" v-if="stu.category === 1">第二类</span>
                <span class="tab warning" v-if="stu.category === 2">第三类</span>
                <span class="tab danger" v-if="stu.category === 3">第四类</span>
              </td>
              <td class="last">
                <div class="buttons">
                  <a v-zc-tip.left="`标记 <font style='color: #0080FF;font-weight: 600;font-size: 110%'>学生${(index+1)}</font>`" class="info">
                    <i class="fi-sr-bookmark"></i>
                  </a>
                  <a v-zc-tip.left="`编辑 <font style='color: #ffc700;font-weight: 600;font-size: 110%'>学生${(index+1)}</font>`" class="waring">
                    <i class="fi-sr-settings-sliders"></i>
                  </a>
                  <a v-zc-tip.left="`删除 <font style='color: #f1416c;font-weight: 600;font-size: 120%'>学生${(index+1)}</font>`" class="danger">
                    <i class="fi-sr-trash"></i>
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="empty" v-else>
          <img :src="require('@/assets/images/student_table-empty.png')">
          <span>正在加载数据</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import ZcInput from "@/components/input/input";
import ZcDropdown from "@/components/dropdown/dropdown";
import ZcDropdownMenu from "@/components/dropdown-menu/dropdown-menu";
import ZcDropdownItem from "@/components/dropdown-item/dropdown-item";
export default {
  name: "zc-card-student-table",
  components: {ZcDropdownItem, ZcDropdownMenu, ZcDropdown, ZcInput},
  data() {
    return {
      students: [
        {chinese: 90,math: 94, sno: '2002922124', category: 1},
        {chinese: 90,math: 94, sno: '2002922124', category: 2},
        {chinese: 90,math: 94, sno: '2002922124', category: 3},
        {chinese: 90,math: 94, sno: '2002922124', category: 4},
        {chinese: 90,math: 94, sno: '2002922124', category: 1},
      ],
      initial: [],
      search: '',
      category: ["第一类","第二类","第三类","第四类"],
      currentCategory: '全部学生',
      showTable: false
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
  computed: {

  },
  methods: {
    retrieveData(search,currentCategory){
      var category = currentCategory === "第一类" ? 0 : currentCategory === "第二类" ? 1 : currentCategory === "第三类" ? 2 : currentCategory === "第四类" ? 3 : -1;
      if(search !== '' && category !== -1)
        this.students = this.initial.filter((item) => {return item.sno.indexOf(search) !== -1 && item.category === category})
      else if(search !== '' && category === -1)
        this.students = this.initial.filter((item) => {return item.sno.indexOf(search) !== -1})
      else if(search === '' && category !== -1)
        this.students = this.initial.filter((item) => {return item.category === category})
      else
        this.students = this.initial
    },
    // 选择类别
    selectCategory(msg) {
      console.log(msg)
      if(msg)
        this.currentCategory = msg
      else
        this.currentCategory = '全部学生'
    },
    randomAvatars() {
      return require('@/assets/images/avatars/' + (1 + Math.floor(Math.random() * 9)) + '.svg')
    }
  },
  mounted() {
    var _this = this;
    this.$bus.on('gotStudentData', (data) => {
      _this.students = []
      _this.initial = []
      data.forEach((item) => {
        _this.students.push({sno: item[1], chinese: item[2], math: item[3], category: item[4]})
        _this.initial.push({sno: item[1], chinese: item[2], math: item[3], category: item[4]})
      })
      this.$nextTick(() => {
        this.showTable = true
      })
    })
  }
}
</script>

<style scoped lang="scss">
  // 容器
  .zc-card-student-table{
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

  // 表格
  .student-table{
    overflow: hidden;
  }
  .table{
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin-top: 10px;
    table-layout: fixed;
  }
  .thead tr th{
    padding: 13px 15px;
    background-color: #F3F6F9;
    letter-spacing: 1px;
    color: #B5B5C3;
    font-weight: 500;
    text-align: left;
  }
  .thead th:first-child{
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    color: #181c32;
  }
  .thead th:last-child{
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  .tbody td{
    padding: 10px;
    flex-direction: column;
    justify-content: center;
  }
  .first{
    padding: 26px 10px 26px 0!important;
    flex-direction: row!important;
    align-items: center;
  }
  .student-portrait{
    width: 50px;
    height: 50px;
    background-color: #F3F6F9;
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    margin-right: 10px;
  }
  .student-portrait img{
    width: 37px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate3d(-50%,0,0);
  }
  .student-user{
    display: inline-flex;
    flex-direction: row;
    align-items: center;
  }
  .student-title{
    display: inline-flex;
    flex-direction: column;
  }
  .tbody td h4{
    font-size: 14px;
    font-weight: 600;
  }
  .tbody td span{
    color: #B5B5C3;
    font-weight: 600;
    margin-top: 3px;
  }
  .tab{
    padding: 14px;
    height: 24px;
    font-size: 12px;
    border-radius: 5px;
    display: inline-block;
    line-height: 1px;
  }
  .tab.info{
    color: #0080FF;
    background: #e7f6ff;
  }
  .tab.success{
    color: #20d489;
    background: #e4fff4;
  }
  .tab.warning{
    color: #ffc700;
    background: #fff8dd;
  }
  .tab.danger{
    color: #f1416c;
    background: #ffeff3;
  }
  .last{
    padding: 26px 0 26px 10px!important;
    flex-direction: row!important;
    align-items: center;
  }
  .last a{
    width: 35px;
    height: 35px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    transition: all .3s;
  }
  .buttons{
    display: flex;
    align-items: center;
  }
  .last a.info{
    color: #0080FF;
    background: #e7f6ff;
  }
  .last a.info:hover{
    background: #0080FF;
  }
  .last a.waring{
    color: #ffc700;
    background: #fff8dd;
  }
  .last a.waring:hover{
    background: #ffc700;
  }
  .last a.danger{
    color: #f1416c;
    background: #ffeff3;
  }
  .last a.danger:hover{
    background: #f1416c;
  }
  .last a:hover{
    color: #fff!important;
  }
  // 空
  .empty{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 300px;
    justify-content: center;
  }
  .empty img{
    width: 300px;
  }
  .empty span{
    font-size: 12px;
    color: #7e8299;
    margin-top: 15px;
  }

  // 动画
  .table-enter-active, .table-leave-active {
    transition: all .3s
  }
  .table-enter, .table-leave-active {
    opacity: 0;
    transform: scale(2);
  }
</style>


