<template>
<h1>Networks</h1>
<small>This node joined {{networks.length}} network(s).</small>
<hr>
<div v-for="network in networks" class="network">

</div>
<table class="table">
  <thead>
    <td>Network</td>
    <td>MAC</td>
    <td>Name</td>
    <td>Status</td>
    <td>Type</td>
  </thead>
  <tbody>
    <tr v-for="network in networks">
      <td>{{network.nwid}}</td>
      <td>{{network.mac}}</td>
      <td>{{network.name}}</td>
      <td>{{network.status}}</td>
      <td>{{network.type}}</td>
    </tr>
  </tbody>
</table>
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
      this.$api.listNetwork().then((ret)=>{
        this.networks = ret
      })
    }
  }
}
</script>
