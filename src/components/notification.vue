<template>
    <div class="notification-wrapper">
        <div class="notification {{i.status}}" @click="close($index)" v-for="i in notification" transition="slide">
            {{i.content}}
        </div>
    </div>
</template>

<script>
export default {
  created(){
    this.$root.$on("msg", this.add.bind(this))
    if(process.env.NODE_ENV != "production"){
      window.notify = this.add.bind(this)
    } //deleteme
  },
  data: function(){
    return {
      notification: []
    }
  },
  methods: {
    close(id){
      this.notification.splice(id, 1)
    },
    add(type, content, timeout=3000){
      this.notification.unshift({
        status: type,
        content: content
      })
      console.log(this.notification)
      if(timeout != 0){
        setTimeout(()=>{
          this.notification.pop()
        }, timeout)
      }
    }
  },
  destroyed(){
    this.$root.$off("msg", this.add)
  }
}
</script>

<style scoped>
.slide-transition{
  transition: all 1s;
}
.slide-enter{
  opacity: 0;
  transform: translate(100%, 0);
}
.slide-leave{
  opacity: 0;
  transform: translate(0, 100%);
}
.notification-wrapper{
  position: fixed;
  top: 0;
  right: 0;
  width: 220px;
}
.notification{
  width: 200px;
  min-height: 40px;
  border-radius: 10px;
  padding: 10px 20px;
  margin: 10px;
  border-width: 2px;
  border-style: solid;
  color: #333;
}
.success{
  border-color: #45ee7a;
}
.info{
  border-color: #0085ff;
}
.error{
  border-color: #ff0a0a;
}
</style>
