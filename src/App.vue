<template>
  <div id="app">
    <Navbar> </Navbar>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import navbar from "./components/navbar"
export default {
  components:{
    'Navbar':navbar
  },
  name: 'App'

}
</script>

<style>

</style>
