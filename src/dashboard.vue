<template>
  <div>
    <h1>Dashboard</h1>
    <div class="big_picture">
      <span v-bind:class="{block: true, online: info.online}">{{info.online?'online':'offline'}}</span>
    </div>
    <p>
      Remote Host: <span class="block mono">{{host}}</span>
      Version: <span class="block mono">{{info.version}}</span>
      Node: <span class="block mono">{{info.address}}</span>
      TCP Fallback: <span class="block">{{info.tcpFallbackActive ? "On": "Off"}}</span>
    </p>
    <div v-if="controller">
      <p>
        Controller InstanceID <span class="block mono">{{instanceid}}</span>
      </p>
    </div>
    <div class="text-center" v-else>
      Not A Controller Node
    </div>
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
