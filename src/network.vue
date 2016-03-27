<template>
<div>
  <h1>Networks</h1>
  <small>This node joined {{networks.length}} network(s).</small>
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
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  data(){
    return {
      networks: []
    }
  },
  route: {
    data(transition){
      transition.next()
      Promise.all([this.$api.listNetwork(), this.$api.listControllerNetwork()]).then(([networks, controlled])=>{
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
