<template>
    <div class="App">

      <Nav v-if="status.loggedIn"/>

      <b-alert
      :variant="alert.variant"
      dismissible
      fade
      :show="alert.show"
      @dismissed="this.$store.dispatch('hideAlert')"
      >
      {{ alert.msg }}
      </b-alert>

      <router-view />

      <b-overlay :show="overlay.show" no-wrap fixed spinner-variant="info">
        <template #overlay>
          <div class="text-center">

            <img :src="overlay.img" alt="[Loading]" width="50px" v-if="overlay.img"/><br/><br/>
            <strong style="font-size: large;" v-if="overlay.msg">{{ overlay.msg }}</strong><br/><br/>
            <b-spinner variant="primary" type="grow" label="Spinning" v-if="!overlay.hideSpinner"></b-spinner>
            <!-- <rocketSpinner/> -->
          </div>
        </template>
      </b-overlay>

    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Nav from './components/Nav.vue';
  // import rocketSpinner from './components/rocketSpinner.vue'

  export default {
    name: 'app',
    components: {
      Nav,
      // rocketSpinner
    },
    computed: {
      ...mapState(['overlay', 'alert']),
      ...mapState('auth', ['status'])
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