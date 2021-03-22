<template>


	<div class="main-container">
		<h3>Communication: {{ username}}</h3>
 <!--   <button v-on:click="hello">call helllo</button>
<input type="file" accept="audio/*" capture>
<audio id="player" controls></audio> -->
<b-container fluid="sm">

 <div id = "channelContainer">
<b-row class="mb-3">

    <b-col md="4" class="rounded p-3 bg-info">

      <h5>FLIGHT</h5>
      <div class="DoubleBtn">
      <button type="button"  @click="removePresence()" class="float-right btninout btn btn-danger">Out</button>
      <button type="button" @click="addPresence()" class="float-right btn btninout btn-success">In</button>
      </div>
      <comBadge id="MA" :speaking="false"/>
    </b-col>

    <b-col md="4" class="rounded p-3 ml-auto bg-info">
      <h5>SCIENCE</h5>
            <div class="DoubleBtn">

      <button type="button" @click="removePresence()" class="float-right btn btn-danger">Out</button>
      <button type="button" @click="addPresence()" class="float-right btn btn-success">In</button>
      </div>
    </b-col>



</b-row>
<b-row class="mb-3">

    <b-col md="4" class="rounded p-3 bg-info">

      <h5>CAP</h5>
            <div class="DoubleBtn">

      <button type="button" @click="removePresence()" class="float-right btn btn-danger">Out</button>
      <button type="button" @click="addPresence()" class="float-right btn btn-success">In</button>
      </div>
      <comBadge id="MA" :speaking="false"/>
    </b-col>

    <b-col md="4" class="rounded p-3 ml-auto bg-info">
      <h5>PRO</h5>
            <div class="DoubleBtn">

      <button type="button" @click="removePresence()" class="float-right btn btn-danger">Out</button>
      <button type="button" @click="addPresence()" class="float-right btn btn-success">In</button>
      </div>
    </b-col>



</b-row>
<b-row class="mb-3">

    <b-col md="4" class="rounded p-3 bg-info">

      <h5>BME</h5>
            <div class="DoubleBtn">

      <button type="button" @click="removePresence()" class="float-right btn btn-danger">Out</button>
      <button type="button" @click="addPresence()" class="float-right btn btn-success">In</button>
      </div>
      <comBadge id="MA" :speaking="false"/>
    </b-col>

    <b-col md="4" class="rounded p-3 ml-auto bg-info">
      <h5>REC</h5>
            <div class="DoubleBtn">

      <button type="button" @click="removePresence()" class="float-right btn btn-danger">Out</button>
      <button type="button" @click="addPresence()" class="float-right btn btn-success">In</button>
      </div>
    </b-col>



</b-row>
<b-row class="mb-3">

    <b-col md="4" class="rounded p-3 bg-info">

      <h5>PLAN</h5>
            <div class="DoubleBtn">

      <button type="button" @click="removePresence()" class="float-right btn btn-danger">Out</button>
      <button type="button" @click="addPresence()" class="float-right btn btn-success">In</button>
            </div>

      <comBadge id="MA" :speaking="false"/>
    </b-col>

    <b-col md="4" class="rounded p-3 ml-auto bg-info">
      <h5>CONTACT</h5>
            <div class="DoubleBtn">

      <button type="button" @click="removePresence()" class="float-right btn btn-danger">Out</button>
      <button type="button" @click="addPresence()" class="float-right btn btn-success">In</button>
      </div>
    </b-col>



</b-row>
  <b-row class=" text-center" align-v="center">
      <b-col>
    <mic />
    </b-col>
</b-row>
 </div>
 <div id="audiosContainer">
   </div>
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
  

<style scoped>

.DoubleBtn {
  margin-left: 30px;
  width: 100px;
  height: 43px;
  float: right;
  margin-top: -40px;
}
</style>
