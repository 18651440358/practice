<template>
  <div>
    <h1>zc-page-cancer-index</h1>
    <button>发送数据</button>
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <p>{{item.user_code}}</p>
        <p>{{item.user_nick_name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "zc-page-cancer-index",
  data() {
    return {
      list: []
    }
  },
  created() {
    axios.get('http://127.0.0.1:5000/admin/test')
        .then(response => {
          this.list = response.data;
          window.console.log(response)
        })
  }
}
</script>

<style scoped>

</style>
