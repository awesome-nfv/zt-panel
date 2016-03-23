<template>
  <div class="main">
    <router-view></router-view>
  </div>
  <notification></notification>
</template>

<script>
export default {
  components:{
    notification: require("./components/notification.vue")
  }
}
</script>

<style>
</style>
