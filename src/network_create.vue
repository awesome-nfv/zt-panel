<template>
  <div>
    <h1>
      Create Network
      <span>{{address}}</span><input type="text" maxlength="6" class="embed" v-model="nwid" placeholder="New id"></input>
    </h1>
    <form class="ui form">
      <div class="field">

      </div>
      <zt-input class="input" label="Name" :model.sync="config.name"></zt-input>
      <zt-input class="input" label="Name" :model.sync="config.name"></zt-input>
    </form>
    <div class="action">
      <button class="ui button" type="button" @click="create">Create the network</button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      nwid: "######",
      config: {
        address: "",
        name: "",
        private: true,
        enableBroadcast: true,
        allowPassiveBridging: true,
        v4AssignMode: "zt",
        v6AssignMode: "zt",
        multicastLimit: 10,
        relays: [],
        ipAssignmentPools: [],
        rules: [{ruleNo: 999, action: "accept"}]
      }
    }
  },
  methods:{
    addrelays(address, phyAddress){
      this.config.relays.push({
        address: address,
        phyAddress: phyAddress
      })
    },
    addipAssignmentPools(start, end){
      this.config.relays.push({
        ipRangeStart: start,
        ipRangeEnd: end
      })
    }
  },
  components:{
    "zt-input": require("./components/zt-input.vue")
  },
  route:{
    data(){
      return this.$api.status().then((ret)=>{
        return {
          address: ret.address
        }
      })
    }
  }
}
</script>

<style scoped>
  input[type=text].embed{
    outline: none;
    border: none;
    padding: 0;
    border-bottom: 2px solid #ddd;
    box-sizing: border-box;
    width:4em;
  }
  form .input{
    margin: 1em 0;
  }
</style>
