<template>
    <div class="App">

      <Nav v-if="this.$store.state.auth.status.loggedIn"/>

      <router-view />

      <b-overlay :show="overlay.show" no-wrap fixed spinner-variant="info">
        <template #overlay>
          <div class="text-center">
            <strong style="font-size: large;">{{ overlay.message }}</strong><br/><br/>
            <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
          </div>
        </template>
      </b-overlay>

    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Nav from './components/Nav.vue';
  export default {
    name: 'app',
    components: {
      Nav
    },
    computed: {
      ...mapState(['overlay'])
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