<template>
<h1>Dashboard</h1>
<div class="big_picture">
  <span v-bind:class="{block: true, online: info.online}">{{info.online?'online':'offline'}}</span>
</div>
<p>
  Remote Host: <span class="block mono">{{host}}</span> Version: <span class="block mono">{{info.version}}</span> Node: <span class="block mono">{{info.address}}</span>
</p>

<div v-bind:class="{status: true, online: info.online}"></div>
<span class="status">TCP Relay: {{info.tcpFallbackActive ? "On": "Off"}}</span>
<span v-if="controller">Controller</span>
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
    background-color: #00f252;
  }
  .big_picture{
    text-align: center;
    padding: 2em;
  }
</style>
