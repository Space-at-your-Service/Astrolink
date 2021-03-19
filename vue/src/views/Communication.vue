<template>


	<div class="main-container">
		<h3>Communication: {{ username}}</h3>
 <!--   <button v-on:click="hello">call helllo</button>
<input type="file" accept="audio/*" capture>
<audio id="player" controls></audio> -->
<b-container fluid="sm">

 
<b-row class="mb-3">

    <b-col md="4" class="rounded p-3 bg-info">

      <h5>Cap</h5>
      <button type="button" @click="removePresence()" class="float-right btn btn-danger">Out</button>
      <button type="button" @click="addPresence()" class="float-right btn btn-success">In</button>
      <comBadge id="MA" :speaking="false"/>
    </b-col>

    <b-col md="4" class="rounded p-3 ml-auto bg-info">
      <h5>Flight</h5>
      <button type="button" @click="removePresence()" class="float-right btn btn-danger">Out</button>
      <button type="button" @click="addPresence()" class="float-right btn btn-success">In</button>
    </b-col>



</b-row>
<b-row class="mb-3">
      <b-col>
    <mic />
    </b-col>
</b-row>
</b-container>
  </div>
  </template>

  <script>
  import { mapState } from 'vuex'
  import { mapGetters } from 'vuex'
  import mic from '../components/microphone.vue';
  import comBadge from '../components/CommunicationBadge.vue';

  export default {
  components: {
		comBadge,
    mic,
	},
  computed: {
      ...mapState('user', ['permissions', 'username', 'firstName', 'lastName', 'groups']),
      ...mapGetters('user', ['permissionsReadable'])
    },
    methods: {
        removePresence(){
          alert("exit")
        },
     
      addPresence(){
          alert("enter")
        },
  },
    mounted() {
    }
  }
  </script>
  


