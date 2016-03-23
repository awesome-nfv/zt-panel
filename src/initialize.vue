<template>
    <div class="initialize">
      <div class="content">
        <h1>Access Token</h1>
        <div class="input-wrapper">
          <input type="text" v-model="token" placeholder="Access Token">
          <input type="text" v-model="host" placeholder="Host">
        </div>
        <div class="button" @click="testToken" disabled="{{testing}}">
          Test!
        </div>
        <!-- <small>You can get the access_token at the <pre>/var/lib/zerotier-one/authtoken.secret</pre></small> -->
      </div>
    </div>
</template>

<script>
export default {
    data(){
      var local_data = this.$api.get_config()
      return {
        token: local_data.token,
        host: local_data.host,
        testing: false
      }
    },
    methods: {
      testToken(){
        if(this.host){
          this.testing = true
          this.$api.test_token(this.token, this.host).then((ret)=>{
            console.log(ret)
            this.$dispatch("msg", "success", "Correct Token, jump to dashboard")
            this.$api.set_config(this.token, this.host)
            this.$router.go("/dashboard")
          },()=>{
            this.testing = false
            this.$dispatch("msg", "error", "Cannot connect to the server")
          })
        }
      }
    }
}
</script>

<style scoped>
h1{
  color: white
}
.initialize{
  position: absolute;
  background-color: #00badb;
  height: 100%;
  width: 100%;
}
.content{
  width: 300px;
  margin: auto;
  text-align: center;
}
input[type=text]{
  color: #666;
  outline: none;
  width: 100%;
  transition: all .4s;
  margin-bottom: 1em;
}
input[type=text]:hover, input[type=text]:focus{
  background-color: white;
}
.button{
  background-color: white;
  margin-top: 1em;
  width: 100%;
  padding: 1em;
  cursor: pointer;
}
</style>
