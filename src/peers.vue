<template>
<h1>Peers</h1>
<table class="table">
<thead>
  <td>Address</td>
  <td>Latency</td>
  <td>Role</td>
  <td>Path</td>
  <td>Last Meet</td>
</thead>
<tbody>
  <tr v-for="p in peers">
    <td>{{p.address}}</td>
    <td>{{p.latency}}</td>
    <td>{{p.role}}</td>
    <td>{{p.path}}</td>
    <td>{{Math.min(p.lastUnicastFrame, p.lastMulticastFrame) | timedelta}}</td>
  </tr>
</tbody>
</table>
</template>

<script>
export default {
  data(){
    return {
      peers: []
    }
  },
  filters: {
    timedelta(timestamp){
      if(timestamp == 0){
        return "unreachable"
      }
      let now = Date.now()
      let delta = now - timestamp
      if(delta < 1000){
        return `${delta} ms`
      }else if (delta < 60 * 1000){
        delta = delta / 1000
        return `${delta} sec`
      }else if (delta < 3600 * 1000){
        delta = delta / 60 / 1000
        return `${delta} min`
      }else if (delta < 86400 * 1000){
        delta = delta / 3600 / 1000
        return `${delta} hour`
      }else{
        delta = delta / 86400 / 1000
        return `${delta} day`
      }
    }
  },
  route:{
    data(){
      return this.$api.listPeers().then((ret)=>{
        return {
          peers: ret
        }
      })
    }
  }
}
</script>
