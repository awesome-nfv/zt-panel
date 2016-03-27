<template>
  <div class="main">
    <router-view transition="fade"></router-view>
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
