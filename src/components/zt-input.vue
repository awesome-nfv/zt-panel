<template>
  <div :class="{'input-container': true, focus: focus, label: showlabel}">
    <label>{{label}}</label>
    <input v-ref:input type="text" @focus="focus = true" @blur="focus = false" :placeholder="placeholder" v-model="model">
  </div>
</template>

<script>
export default {
  props: ["model", "label", "placeholder"],
  data(){
    return {
      focus: false
    }
  },
  computed: {
    showlabel(){
      console.log(!this.model)
      return !this.model
    }
  }
}
</script>

<style scoped>
.input-container{
  width: 100%;
  position: relative;
}
.input-container.label label{
  transform: scale(1) translate(0rem, .6rem);
}
.input-container label{
  position: absolute;
  top: .2rem;
  left: 1rem;
  transition: all .4s;
  transform: scale(.6);
  transform-origin: left top;
}

.input-container input{
  padding: 1rem 1rem .5rem 1rem;
  border: none;
  border: .1rem solid #ddd;
  border-radius: .3em;
  top: 0;
}
.input-container input:focus{
  outline: none;
}
</style>
