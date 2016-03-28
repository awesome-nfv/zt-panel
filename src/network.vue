<template>
<div>
  <loading v-if="$loadingRouteData" transition="loading"></loading>
  <h1>Networks</h1>
  <small>This node joined {{network_controlled.length + network_normal.length}} network(s). <a v-link="'/network/join'">Join a new network</a> <a href="'/network/create'">Create a network</a></small>
  <hr>
  <table class="table">
    <thead>
      <td>Network</td>
      <td>MAC</td>
      <td>Name</td>
      <td>Status</td>
      <td>Type</td>
    </thead>
    <tbody>
      <tr v-for="network in network_normal">
        <td class="mono">{{network.nwid}}</td>
        <td class="mono">{{network.mac}}</td>
        <td>{{network.name}}</td>
        <td>{{network.status}}</td>
        <td>{{network.type}}</td>
      </tr>
      <tr v-if="network_controlled.length">
        <td colspan="4">
          <h3>Owned Network</h3>
        </td>
      </tr>
      <tr v-for="network in network_controlled">
        <td class="mono"><a v-link="{path:'/'+network.nwid, append: true}">{{network.nwid}}</a></td>
        <td class="mono">{{network.mac}}</td>
        <td>{{network.name}}</td>
        <td>{{network.status}}</td>
        <td>{{network.type}}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  data(){
    return {
      network_controlled: [],
      network_normal: []
    }
  },
  route: {
    data(transition){
      return Promise.all([this.$api.listNetwork(), this.$api.listControllerNetwork()]).then(([networks, controlled])=>{
        console.log(networks, controlled)
        let normal = [], controll = []
        networks.forEach((net)=>{
          if(controlled.contains(net.nwid)){
            controll.append(net)
          }else{
            normal.append(net)
          }
        })
        this.network_normal = normal
        this.network_controlled = controll
      })
    }
  }
}
</script>
