<template>
<h1>Network {{$route.params.nwid}}</h1>
<div class="infomation">
  <pre>{{network | json}}</pre>
</div>
<div class="operation">
  <button class="ui red button" type="button" v-on:click="leave">Leave Network</button>
</div>
</template>

<script>
export default {
  data(){
    return {
      network: {}
    }
  },
  methods:{
    leave(){
      this.$api.leaveNetwork(this.$route.params.nwid).then(()=>{
        this.$dispatch("msg", "success", "You have been left " + this.$route.params.nwid)
        this.$router.go('/network')
      }).catch((error)=>{
        this.$dispatch("msg", "error", "Error: " + error)
      })
    },
    update(){
      return this.$api.getNetwork(this.$route.params.nwid).then((network)=>{
        this.network = network
      })
    }
  },
  route:{
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

<style>

</style>
