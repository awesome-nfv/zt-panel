<template>
  <span v-bind:style="style">
    <span v-click="startedit" v-ref:display v-if="!edit" transition="fade-span">
      {{value}}
    </span>
    <input type="text" v-ref:editing v-on:keypress.enter.prevent="finished"
      v-if="edit" transition="fade-span" :placeholder="placeholder" v-mode="value">
  </span>
</template>

<script>
export default {
  data(){
    return {
      edit: false
    }
  }
  props:{
    value: {
      twoWay: true,
      type: String,
      required: true
    },
    placeholder: {
      type: String
    }
  },
  methods:{
    startedit(){
      this.$refs.editing.width = this.$ref.display.width
      this.edit = true
    }
    finished(){
      this.edit = false
      this.$dispatch("editcomplete")
    }
  }
}
</script>
