<template>
<div>
  <h1>Networks</h1>
  <p>This node joined {{network_controlled.length + network_normal.length}} network(s). <button class="ui button" v-link="'/network/join'">Join a new network</button> <button class="ui button" v-link="'/network/create'">Create a network</button  ></p>
  <table class="ui celled table">
    <thead>
      <td>Name</td>
      <td>Network</td>
      <td>MAC</td>
      <td>Status</td>
      <td>Type</td>
    </thead>
    <tbody>
      <tr v-for="network in network_normal">
        <td>{{network.name}}</td>
        <td class="mono"><a v-link="{name: 'network_detail', params: {nwid: network.nwid}}">{{network.nwid}}</a></td>
        <td class="mono">{{network.mac}}</td>
        <td>{{network.status}}</td>
        <td>{{network.type}}</td>
      </tr>
      <tr v-if="network_controlled.length">
        <td colspan="4">
          <h3>Owned Network</h3>
        </td>
      </tr>
      <tr v-for="network in network_controlled">
        <td>{{network.name}}</td>
        <td class="mono"><a v-link="{name: 'network_detail', params: {nwid: network.nwid}}">{{network.nwid}}</a></td>
        <td class="mono">{{network.mac}}</td>
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
  methods:{
    update(){
      return Promise.all([this.$api.listNetwork(), this.$api.listControllerNetwork()]).then(([networks, controlled])=>{
        console.log(networks, controlled)
        let normal = [], controll = []
        networks.forEach((net)=>{
          if(controlled.indexOf(net.nwid) > -1){
            controll.push(net)
          }else{
            normal.push(net)
          }
        })
        this.network_normal = normal
        this.network_controlled = controll
      })
    }
  },
  route: {
    activate(){
      this.timer = setInterval(this.update.bind(this), 1000)
      return Promise.resolve()
    },
    deactivate(){
      clearInterval(this.timer)
      return Promise.resolve()
    }
  }
}
</script>
