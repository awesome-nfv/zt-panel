<template>
<h1>Dashboard</h1>
<small>{{host}} zt version: {{info.version}} node: {{info.address}}<small>
<div v-bind:class="{status: true, online: info.online}">{{info.online?'online':'offline'}}</div>
<span class="status">TCP Relay: {{info.tcpFallbackActive ? "On": "Off"}}</span>
<span v-if="controller">Controller</span>
</template>

<script>
export default {
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

<style>

</style>
