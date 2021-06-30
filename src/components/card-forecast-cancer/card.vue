<template>
  <div class="zc-card-forecast-cancer">
    <div class="title-group">
      <h3>癌症病例诊断</h3>
    </div>
    <div class="card-content">
      <div class="left">
        <div class="input-group">
          <label>病人年龄</label>
          <zc-dropdown>
            <div class="input-value">
              <span>{{ageValue[forecast.age] || '请选择'}}</span>
              <i class="fi-br-angle-small-down"></i>
            </div>
            <zc-dropdown-menu  slot="zc-dropdown-menu">
              <ul class="dropdown-menu" style="height: 250px">
                <vuescroll :ops="ops">
                  <zc-dropdown-item @click.native="ageHandle(index)" class="dropdown-item" :key="'age'+index" :command="index" v-for="(item,index) in ageValue">{{item}}</zc-dropdown-item>
                </vuescroll>
              </ul>
            </zc-dropdown-menu>
          </zc-dropdown>
        </div>
        <div class="input-group">
          <label>是否绝经</label>
          <zc-dropdown @command="menopauseHandle">
            <div class="input-value">
              <span>{{menopauseValue[forecast.menopause] || '请选择'}}</span>
              <i class="fi-br-angle-small-down"></i>
            </div>
            <zc-dropdown-menu  slot="zc-dropdown-menu">
              <ul class="dropdown-menu">
                <zc-dropdown-item class="dropdown-item" :key="'menopause'+index" :command="index" v-for="(item,index) in menopauseValue">{{item}}</zc-dropdown-item>
              </ul>
            </zc-dropdown-menu>
          </zc-dropdown>
        </div>
        <div class="input-group">
          <label>肿瘤大小</label>
          <zc-dropdown>
            <div class="input-value">
              <span>{{tumorValue[forecast.tumor] || '请选择'}}</span>
              <i class="fi-br-angle-small-down"></i>
            </div>
            <zc-dropdown-menu  slot="zc-dropdown-menu">
              <ul class="dropdown-menu" style="height: 250px">
                <vuescroll :ops="ops">
                  <zc-dropdown-item @click.native="tumorHandle(index)" class="dropdown-item" :key="'tumor'+index" :command="index" v-for="(item,index) in tumorValue">{{item}}</zc-dropdown-item>
                </vuescroll>
              </ul>
            </zc-dropdown-menu>
          </zc-dropdown>
        </div>
        <div class="input-group">
          <label>淋巴结个数</label>
          <zc-dropdown>
            <div class="input-value">
              <span>{{invValue[forecast.inv] || '请选择'}}</span>
              <i class="fi-br-angle-small-down"></i>
            </div>
            <zc-dropdown-menu  slot="zc-dropdown-menu">
              <ul class="dropdown-menu" style="height: 250px">
                <vuescroll :ops="ops">
                  <zc-dropdown-item @click.native="invHandle(index)" class="dropdown-item" :key="'inv'+index" :command="index" v-for="(item,index) in invValue">{{item}}</zc-dropdown-item>
                </vuescroll>
              </ul>
            </zc-dropdown-menu>
          </zc-dropdown>
        </div>
        <div class="input-group">
          <label>是否有结节冒</label>
          <zc-dropdown @command="capsHandle">
            <div class="input-value">
              <span>{{capsValue[forecast.caps] || '请选择'}}</span>
              <i class="fi-br-angle-small-down"></i>
            </div>
            <zc-dropdown-menu  slot="zc-dropdown-menu">
              <ul class="dropdown-menu">
                <zc-dropdown-item class="dropdown-item" :key="'caps'+index" :command="index" v-for="(item,index) in capsValue">{{item}}</zc-dropdown-item>
              </ul>
            </zc-dropdown-menu>
          </zc-dropdown>
        </div>
      </div>
      <div class="right">
        <div class="input-group">
          <label>肿瘤恶性程度</label>
          <zc-dropdown @command="maligHandle">
            <div class="input-value">
              <span>{{maligValue[forecast.malig] || '请选择'}}</span>
              <i class="fi-br-angle-small-down"></i>
            </div>
            <zc-dropdown-menu  slot="zc-dropdown-menu">
              <ul class="dropdown-menu">
                <zc-dropdown-item class="dropdown-item" :key="'malig'+index" :command="index" v-for="(item,index) in maligValue">{{item}}</zc-dropdown-item>
              </ul>
            </zc-dropdown-menu>
          </zc-dropdown>
        </div>
        <div class="input-group">
          <label>肿瘤出现位置</label>
          <zc-dropdown @command="breastHandle">
            <div class="input-value">
              <span>{{breastValue[forecast.breast] || '请选择'}}</span>
              <i class="fi-br-angle-small-down"></i>
            </div>
            <zc-dropdown-menu  slot="zc-dropdown-menu">
              <ul class="dropdown-menu">
                <zc-dropdown-item class="dropdown-item" :key="'breast'+index" :command="index" v-for="(item,index) in breastValue">{{item}}</zc-dropdown-item>
              </ul>
            </zc-dropdown-menu>
          </zc-dropdown>
        </div>
        <div class="input-group">
          <label>肿瘤出现象限</label>
          <zc-dropdown @command="quadHandle">
            <div class="input-value">
              <span>{{quadValue[forecast.quad] || '请选择'}}</span>
              <i class="fi-br-angle-small-down"></i>
            </div>
            <zc-dropdown-menu  slot="zc-dropdown-menu">
              <ul class="dropdown-menu">
                <zc-dropdown-item class="dropdown-item" :key="'quad'+index" :command="index" v-for="(item,index) in quadValue">{{item}}</zc-dropdown-item>
              </ul>
            </zc-dropdown-menu>
          </zc-dropdown>
        </div>
        <div class="input-group">
          <label>是否有放射性治疗经历</label>
          <zc-dropdown @command="irradiatHandle">
            <div class="input-value">
              <span>{{irradiatValue[forecast.irradiat] || '请选择'}}</span>
              <i class="fi-br-angle-small-down"></i>
            </div>
            <zc-dropdown-menu  slot="zc-dropdown-menu">
              <ul class="dropdown-menu">
                <zc-dropdown-item class="dropdown-item" :key="'irradiat'+index" :command="index" v-for="(item,index) in irradiatValue">{{item}}</zc-dropdown-item>
              </ul>
            </zc-dropdown-menu>
          </zc-dropdown>
        </div>
        <div class="button-group">
          <a @click="clearValue">清除选择</a>
          <a @click="startForecast">开始预测</a>
        </div>
        <div class="forecast-value" :class="[{'health':forecastClass===0},{'danger':forecastClass===1}]">{{forecastValue[forecastClass]}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import ZcDropdown from "@/components/dropdown/dropdown";
import ZcDropdownMenu from "@/components/dropdown-menu/dropdown-menu";
import ZcDropdownItem from "@/components/dropdown-item/dropdown-item";
import vuescroll from 'vuescroll';
import axios from "axios";
export default {
  name: "zc-card-forecast-cancer",
  components: {ZcDropdownItem, ZcDropdownMenu, ZcDropdown, vuescroll},
  data() {
    return {
      ops: {
        bar: {
          background: '#8950fc',
        }
      },
      forecastClass: -1,
      forecast: {
        age: -1,
        menopause: -1,
        tumor: -1,
        inv: -1,
        caps: -1,
        malig: -1,
        breast: -1,
        quad: -1,
        irradiat: -1
      },
      // age取值
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
    ageHandle(value) {
      this.forecast.age = value;
    },
    menopauseHandle(value) {
      this.forecast.menopause = value;
    },
    tumorHandle(value) {
      this.forecast.tumor = value;
    },
    invHandle(value) {
      this.forecast.inv = value;
    },
    capsHandle(value) {
      this.forecast.caps = value;
    },
    maligHandle(value) {
      this.forecast.malig = value;
    },
    breastHandle(value) {
      this.forecast.breast = value;
    },
    quadHandle(value) {
      this.forecast.quad = value;
    },
    irradiatHandle(value) {
      this.forecast.irradiat = value;
    },
    // 开始预测
    startForecast(){
      for(var item in this.forecast){
        if(this.forecast[item] === -1){
          this.$rbNote({
            title: '请检查表单',
            messageType: 'warning',
            message: '您输入的内容不能为空😅。'
          })
          return
        }
      }
        this.$rbNote({
          title: '正在诊断',
          messageType: 'loading',
          message: '正在连接服务器。。。'
        })
        axios.post(this.$domain + '/forecast/cancer', {
          forecast: this.forecast
        })
            .then(res => {
              this.forecastClass = res.data
            })

    },
    // 清空选择
    clearValue() {
      this.forecast = {
            age: -1,
            menopause: -1,
            tumor: -1,
            inv: -1,
            caps: -1,
            malig: -1,
            breast: -1,
            quad: -1,
            irradiat: -1
      }
      this.forecastClass = -1
    }
  }
}
</script>

<style scoped lang="scss">
  .zc-card-forecast-cancer{
    background: #fff;
    height: 100%;
    border-radius: 8px;
    padding: 30px;
    padding-top: 20px;
    box-shadow: 0 0 30px 0 rgba(82,63,105, .05);
  }
  // 标题
    .title-group{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 20px;
    }
    // 主体部分
    .card-content{
      display: flex;
      align-items: stretch;
      //margin-top: 10px;
    }
    .card-content > div{
      width: 50%;
    }
    .card-content .left{
      padding-right: 15px;
    }
    .card-content .right{
      padding-left: 15px;
    }
    .input-group{
      display: flex;
      flex-direction: column;
      margin-top: 10px;
    }
    .input-group label{
      margin-bottom: 5px;
      font-size: 15px;
      font-weight: 600;
    }
    // 下拉框
    .input-value{
      width: 100%;
      height: 48px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      background-color: #f3f3f4;
      color: #5e6278;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
    }
    .dropdown-menu{
      width: 200px;
      padding: 10px 0;
      box-shadow: 0 0 30px 0 rgba(82,63,105, .05);
      background: #fff;
    }
    .dropdown-item{
      cursor: pointer;
      padding: 15px;
      font-weight: 600;
    }
    .dropdown-item:hover{
      background: #f3f3f4;
    }
    .button-group{
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 15px;
      justify-content: flex-end;
    }
    .button-group a{
      padding: 10px 15px;
      border-radius: 8px;
      background: #f3f3f4;
      color: #5e6278;
      font-weight: 600;
      margin-left: 10px;
    }
    .button-group a:last-child{
      background: #f64e60;
      color: #fff;
    }
    .forecast-value.health{
      margin-top: 10px;
      color: #50CD89;
      font-weight: 600;
    }
    .forecast-value.danger{
      margin-top: 10px;
      color: #f64e60;
      font-weight: 600;
    }
</style>
