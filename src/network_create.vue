<template>
  <div>
    <h1>
      Create Network
      <span>{{address}}</span><input type="text" maxlength="6" class="embed" v-model="nwid" placeholder="New id"></input></h1>
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
