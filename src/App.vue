<template>
  <div class="main">
    <router-view transition="fade" transition-mode="out-in"></router-view>
  </div>
  <notification></notification>
</template>

<script>
export default {
  components:{
    notification: require("./components/notification.vue")
  }
}
// TODO: remove app.Vue
</script>
