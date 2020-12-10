<template>
    <div class="App">

      <Nav v-if="this.$store.state.auth.status.loggedIn"/>

      <router-view />

    </div>
</template>

<script>
  import Nav from './components/Nav.vue';
  import { mapState } from 'vuex';
  export default {
    name: 'app',
    components: {
      Nav
    }, 
    data() {
      return {
      }
    },
    computed: {
      ...mapState(['isLogged'])
    }
  }
</script>

<style>
  .App{
    min-height: 100vh;
    width: 100%;
    height: 100%;

    background: rgb(3,0,38);
    background: linear-gradient(151deg, rgba(3,0,38,1) 7%, rgba(7,45,103,1) 48%, rgba(34,4,77,1) 92%);
    /*background-image: url('../bluenova.jpg');*/
  }
</style>