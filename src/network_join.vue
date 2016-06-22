<template>
  <h1>Join Network {{nwid}}</h1>
  <div class="text-center">
    <zt-input @keydown.prevent.enter="submit"  type="text" placeholder="Network ID" :model.sync="nwid">
  </div>
</template>

<script>
import Input from './components/zt-input.vue'
export default {
  components: {
    "zt-input": Input
  },
  data(){
    return {
      nwid: ""
    }
  },
  methods:{
    submit(){
      if(!/^[a-z0-9]{16}$/.test(this.nwid)){
        this.$dispatch("msg", "error", "Using Correct Network ID")
        this.nwid = ""
        return
      }
      this.$api.joinNetwork(this.nwid).then((ret)=>{
        this.$dispatch("msg", "success", `joined ${this.nwid}`)
        // go back to network
        this.$router.go("/network")
      }, (ret)=>{
        this.$dispatch("msg", "error", `failed, ${ret}`)
      })
    }
  }
}
</script>
