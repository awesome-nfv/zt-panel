<template>
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
<p>

</span>
<div v-if="controller">
  <h2>Controller Status</h2>
</div>
<div class="text-center" v-else>
  Not A Controller Node
</div>
</template>

<script>
export default  {
  data(){
    return {
      info: {},
      host: this.$api.get_config().host,
      controller: undefined
    }
  },
  route:{
    data(transition){
      this.$api.status().then((ret)=>{
        this.info = ret
      })
      this.$api.controller_status().then((ret)=>{
        this.controller = true
      }, ()=>{
        this.controller = false
      })
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
