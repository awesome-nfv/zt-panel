<template>
  <div>
    <h1>Dashboard</h1>
    <div class="big_picture">
      <span v-bind:class="{block: true, online: info.online}">{{info.online?'online':'offline'}}</span>
    </div>
    <div class="ui list">
      <div class="item">
        <p>Remote Host:<p><span class="block mono">{{host}}</span>
      </div>
      <div class="item">
        <p>Version:</p> <span class="block mono">{{info.version}}</span>
      </div>
      <div class="item">
        <p>Node:</p> <span class="block mono">{{info.address}}</span>
      </div>
      <div class="item">
        <p>TCP Fallback:</p> <span class="block">{{info.tcpFallbackActive ? "Active": "Inactive"}}</span>
      </div>
      <div class="item" v-if="controller">
        <p>Controller InstanceID:</p> <span class="block mono">{{instanceid}}</span>
      </div>
    </p>
  </div>
</template>

<script>
export default  {
  data(){
    return {
      info: {},
      host: this.$api.get_config().host,
      controller: undefined,
      instanceid: ''
    }
  },
  route:{
    data(transition){
      this.$api.status().then((ret)=>{
        this.info = ret
      })
      this.$api.controller_status().then((ret)=>{
        this.controller = true
        this.instanceid = ret.instanceId
      }, ()=>{
        this.controller = false
      })
      transition.next()
    }
  }
}

</script>

<style scoped>
.item{
  text-align: center;
}
.item p{
  margin-bottom: .2em;
}
.big_picture .block{
  font-size: 3em;
  background-color: #d50000;
}
.big_picture .block.online{
  background-color: #16A085;
}
.big_picture{
  text-align: center;
  padding: 2em;
}
</style>
