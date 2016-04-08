<template>
  <div>
    <h1>
      Create Network
      <span>{{address}}</span><input type="text" maxlength="6" class="embed" v-model="nwid" placeholder="New id"></input>
    </h1>
    <zt-input label="姓名"></zt-input>
    <div class="action">
      <button type="button" @click="create">Create the network</button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      address: "",
      nwid: ""
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
</style>
