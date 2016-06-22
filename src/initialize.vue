<template>
    <div class="initialize">
      <div class="content">
        <h1>Access Token</h1>
        <form class="ui inverted form">
          <div class="field">
            <label>Access Token</label>
            <input type="text" v-model="token" placeholder="Access Token">
          </div>
          <div class="field">
            <label>API Endpoint</label>
            <input type="text" v-model="host" placeholder="API Endpoint">
          </div>
          <div class="field">
            <button class="ui fluid inverted basic button" @click="testToken" disabled="{{testing}}">
              Test!
            </button>
          </div>
        </form>

        <div class="ui segment">
          Test the connection with <br><code>curl -H "X-ZT1-Auth: {{token}}" {{host}}/version</code>
        </div>
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
          console.log("Start testing")
          this.testing = true
          this.$api.test_token(this.token, this.host).then((ret)=>{
            console.log(ret)
            this.$dispatch("msg", "success", "Auth Success")
            this.$api.set_config(this.token, this.host)
            this.$router.go("/dashboard")
          },(err)=>{
            this.testing = false
            this.$dispatch("msg", "error", "Cannot connect to the server, " + err)
          })
        }
      }
    }
}
</script>

<style scoped>
h1{
  color: white;
  text-align: center;
}
.initialize{
  position: absolute;
  background-color: #2196F3;
  height: 100%;
  width: 100%;
  display: flex;
}
.content{
  width: 300px;
  margin: auto;
}
.segment{
  word-break: break-all;
}
</style>
