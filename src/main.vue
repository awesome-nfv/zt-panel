<template>
  <div class="wrapper">
    <menu :menu="menu_map">
    </menu>
    <router-view transition="fade"></router-view>
  </div>
</template>

<script>
export default {
    data(){
        return {
            menu_map: [
                {name: "Dashboard", goto: {name: "dashboard"}},
                {name: "Network", goto: {name: "network"}},
                {name: "Peers", goto: {name: "peers"}},
                {name: "About & Help", goto: {name: "about"}},
            ]
        }
    },
    components: {
        menu: require("./components/menu.vue")
    }
}
</script>

<style>
  .wrapper{
    max-width: 800px;
    margin: auto;
  }
</style>
