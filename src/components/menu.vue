<template>
<div class="menu-container">
    <div class="menu-item" v-link-active v-for="i in menu">
        <a v-link="i.goto">{{i.name}}</a>
    </div>
</div>
</template>

<script>
export default {
    props: ["menu"]
}
</script>

<style>
  .menu-container::after{
    content: "";
    display: table;
    float: none;
    width: 100%;
  }
  .menu-container{
    margin-left: -20px;
    margin-right: -20px;
  }
  .menu-item{
    display: inline-block;
    float: left;
    margin: 0 20px;
    height: 50px;
    line-height: 50px;
  }
  .menu-item a, .menu-item a:focus, .menu-item{
    text-decoration: none;
    transition: all .5s;
    color: #6b6b6b;
  }
  .menu-item a:active, .menu-item a.active, .menu-item a:hover{
    text-decoration: none;
    color: #0085ff;
  }

</style>
