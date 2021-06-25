<template>
  <div class="zc-page-system-login">
    <div class="login-group">
      <div class="form-content">
<!--         logo-->
        <div class="logo">
          <img src="./logo-letter-1.png">
        </div>
        <h1>Welcome to Practice</h1>
        <div class="input-group">
          <div class="input-head">
            <label>Sno</label>
          </div>
          <input type="text" v-model="email" />
        </div>
        <div class="input-group">
          <div class="input-head">
            <label>Password</label>
            <a @click="jurisdiction">Forgot Password ?</a>
          </div>
          <input type="password" v-model="password" @keydown.enter="tryToSignIn" />
        </div>
<!--        登录按钮-->
        <a class="logo-button" @click="tryToSignIn">Sign In</a>
      </div>
    </div>
    <div class="login-background">
      <img class="background" src="./login.svg">
      <h3>
        We Got
        <br>
        A Surprise
        <br>
        For You
      </h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "zc-page-system-login",
  components: {},
  data(){
    return {
      email: '2002922124',
      password: '123456',
      email_state: 1,
      password_state: 1,
      adcode: '',
      city: '',
      weather: '',
      temperature: '',
      info: ''
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    init() {
    },
    jurisdiction() {
      this.$rbNote({
        title: '权限不足',
        messageType: 'power',
        message: '对不您的权限不足，操作被禁止，请升级为PRO账户'
      })
    },
    tryToSignIn() {
      if(this.email === "" || this.password === ""){
        this.$rbNote({
          title: '请检查表单',
          messageType: 'warning',
          message: '您输入的学号或者密码不能为空😅。'
        })
        return
      }
      this.$rbNote({
        title: '正在登录',
        messageType: 'loading',
        message: '正在连接服务器。。。'
      })
      var _this = this
      // 发起登录请求
      axios.post(this.$domain + '/toLogin',
          {
            sno: _this.email,
            password: _this.password
          })
      .then(res => {
        if(res.data.token) {
          // 登录成功
          this.$rbNote({
            title: '登录成功',
            messageType: 'success',
            message: '正在初始化数据...'
          })
          // 存入当前token
          window.sessionStorage.setItem("token", res.data.user);
          // 跳转到主页
          this.$refs
        }else{
          // 登录失败
          this.$rbNote({
            title: '登录失败',
            messageType: 'error',
            message: '您输入的学号或密码不正确！'
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .zc-page-system-login{
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    background: #fff;
  }
  .login-group{
    padding: 3rem;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .form-content{
    width: 500px;
  }
  .form-content h1{
    margin-top: 3rem;
  }
  .login-background{
    width: 600px;
    background: linear-gradient(147.04deg,#ca7b70 .74%,#5a2119 99.61%);
    position: relative;
  }
  .login-background .background{
    width: 580px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .login-background h3{
    font-size: 5rem;
    color: #fff;
    padding-top: 10rem;
    padding-left: 5rem;
    font-weight: 700;
    z-index: 2;
    position: relative;
  }
  .logo img{
    height: 75px;
  }
  .form-content h1{
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 5rem;
  }
  .input-group{
    margin-bottom: 1.75rem;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .input-head{
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: .3rem;
    justify-content: space-between;
  }
  .input-head label{
    font-weight: 700;
    font-size: 1.2rem;
  }
  .input-head a{
    color: #7e8299;
    font-weight: 600;
    font-size: 1.1rem;
  }
  .input-group input{
    width: 100%;
    background-color: #f3f3f4;
    border-color: #f3f3f4;
    border-style: solid;
    padding: 1.3rem;
    border-radius: .75rem;
    transition: background-color .15s ease,border-color .15s ease;
    font-size: 1rem;
    font-weight: 600;
    margin-top: 3px;
  }
  .input-group input:hover{
    box-shadow: 0 0 0 4px rgba(#0080FF,.3);
    background-color: #fff;
    border-color: #dfdfdf;
  }
  .input-group input:focus{
    box-shadow: 0 0 0 4px rgba(#0080FF,.2);
    border-color: #0080FF;
    background: #fff;
  }
  .input-group input[type=password]:focus {
    letter-spacing: 3px;
  }
  .input-group input[type=password]{
    letter-spacing: 3px;
  }

  .logo-button{
    display: inline-block;
    margin-top: 1rem;
    color: #fff;
    background: #3699FF;
    border-radius: .75rem;
    font-weight: 600;
    padding: .9rem 2.2rem;
    font-size: 1rem;
    user-select: none;
  }
  .logo-button:hover{
    background: #0080FF;
  }
</style>
