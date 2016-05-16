<template>
  <div :class="{'input-container': true, label: !!model}">
    <label>{{label}}</label>
    <input type="text" :placeholder="label" v-model="model">
  </div>
</template>

<script>
export default {
  props: ["model", "label"],
}
</script>

<style scoped>
.input-container{
  width: 100%;
  position: relative;
  border: .1rem solid #ddd;
  border-radius: .3em;
  overflow: hidden;
}
.input-container label{
  position: absolute;
  z-index: 1;
  top: .3em;
  left: 1.666667em;
  transition: all .4s;
  font-size: .6em;
  transform: translate(0, -1.2em);
  opacity: .5;
}

.input-container.label label{
  transform: translate(0, .2em);
  transform-origin: left top;
}
.input-container input{
  border: none;
  outline: none;
  padding: .75em 1em;
  transition: all .4s;
  width: 100%;
}
.input-container.label input{
  transform: translate(0,.5em);
}
</style>
