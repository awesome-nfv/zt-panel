<template>
<div>
  <h1>Peers</h1>
  <small>
    We know {{peers.length}} peers, {{root_peers}} root peers.
  </small>
  <hr>
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
        <td class="mono">{{p.address}}</td>
        <td>{{p.latency | latency}}</td>
        <td>{{p.role}}</td>
        <td>{{p.path}}</td>
        <td>{{Math.min(p.lastUnicastFrame, p.lastMulticastFrame) | timedelta}}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  data(){
    return {
      peers: []
    }
  },
  computed:{
    root_peers(){
      return this.peers.filter((p)=>{
        return p.role == "ROOT"
      }).length
    }
  },
  filters: {
    latency(num){
      if(num){
        return `${num} ms`
      }else{
        return ""
      }
    },
    timedelta(timestamp){
      if(timestamp == 0){
        return ""
      }
      let now = Date.now()
      let delta = now - timestamp
      if(delta < 1000){
        return `${delta.toFixed(2)} ms`
      }else if (delta < 60 * 1000){
        delta = delta / 1000
        return `${delta.toFixed(2)} sec`
      }else if (delta < 3600 * 1000){
        delta = delta / 60 / 1000
        return `${delta.toFixed(2)} min`
      }else if (delta < 86400 * 1000){
        delta = delta / 3600 / 1000
        return `${delta.toFixed(2)} hour`
      }else{
        delta = delta / 86400 / 1000
        return `${delta.toFixed(2)} day`
      }
    }
  },
  methods:{
    update(){
      this.$api.listPeers().then((ret)=>{
        ret.sort((a, b)=>{
          if(a.role == "ROOT" && b.role == "LEAF"){
            return -1
          }
          if(a.role == "LEAF" && b.role == "ROOT"){
            return 1
          }
          if(a.address > b.address){
            return 1
          }
          if(a.address < b.address){
            return -1
          }
          return 0
        })
        this.peers = ret
      })
    }
  },
  route:{
    activate(transition){
      transition.next()
      this.timer = setInterval(this.update.bind(this), 1000)
    },
    deactivate(transition){
      clearInterval(this.timer)
      transition.next()
    }
  }
}
</script>

<style scoped>
  table{
    table-layout: fixed;
  }
  table tr:first-of-type{
    width: 200px;
  }
</style>
