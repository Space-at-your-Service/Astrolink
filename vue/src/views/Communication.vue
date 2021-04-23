<template>
  <div class="main-container">
    <h3 class="section-title">Communication</h3>
    <!--   <button v-on:click="hello">call helllo</button>
<input type="file" accept="audio/*" capture>
<audio id="player" controls></audio> -->

    <b-container fluid="sm">
      
  <b-tabs content-class="mt-3" fill>
    <b-tab title="Audios" active>

      <div id="channelContainer">
        <b-row>
          <b-col cols="9" class="rounded p-2">
            <b-row class="mb-3">
              <b-col id="flight" class="sm-4 channel  rounded p-3">
                <h5>FLIGHT</h5>
                <div class="DoubleBtn">
                  <button
                    type="button"
                    @click="removePresence()"
                    class="float-right btninout btn btn-danger"
                  >
                    Out
                  </button>
                  <button
                    type="button"
                    @click="addPresence()"
                    class="float-right btn btninout btn-success"
                  >
                    In
                  </button>
                </div>
                <comBadge id="MA" :speaking="false" />
              </b-col>
              <b-col id="base" class="sm-4 channel  rounded p-3 ">
                <h5>base</h5>
                <div class="DoubleBtn">
                  <button
                    type="button"
                    @click="removePresence()"
                    class="float-right btninout btn btn-danger"
                  >
                    Out
                  </button>
                  <button
                    type="button"
                    @click="addPresence()"
                    class="float-right btn btninout btn-success"
                  >
                    In
                  </button>
                </div>
                <comBadge id="MA" :speaking="false" />
              </b-col>
              <b-col id="science" class="sm-4 channel  rounded p-3 ">
                <h5>SCIENCE</h5>
                <div class="DoubleBtn">
                  <button
                    type="button"
                    @click="removePresence()"
                    class="float-right btn btn-danger"
                  >
                    Out
                  </button>
                  <button
                    type="button"
                    @click="addPresence()"
                    class="float-right btn btn-success"
                  >
                    In
                  </button>
                </div>
              </b-col>
            </b-row>
            <b-row class="mb-3">
              <b-col class="sm-4 channel  rounded p-3 " id="cap">
                <h5>CAP</h5>
                <div class="DoubleBtn">
                  <button
                    type="button"
                    @click="removePresence()"
                    class="float-right btn btn-danger"
                  >
                    Out
                  </button>
                  <button
                    type="button"
                    @click="addPresence()"
                    class="float-right btn btn-success"
                  >
                    In
                  </button>
                </div>
                <comBadge id="MA" :speaking="false" />
              </b-col>
              <b-col></b-col>
              <b-col class="sm-4 channel   rounded p-3  " id="pro">
                <h5>PRO</h5>
                <div class="DoubleBtn">
                  <button
                    type="button"
                    @click="removePresence()"
                    class="float-right btn btn-danger"
                  >
                    Out
                  </button>
                  <button
                    type="button"
                    @click="addPresence()"
                    class="float-right btn btn-success"
                  >
                    In
                  </button>
                </div>
              </b-col>
            </b-row>
            <b-row class="mb-3">
              <b-col class="sm-4 channel  rounded p-3" id="bme">
                <h5>BME</h5>
                <div class="DoubleBtn">
                  <button
                    type="button"
                    @click="removePresence()"
                    class="float-right btn btn-danger"
                  >
                    Out
                  </button>
                  <button
                    type="button"
                    @click="addPresence()"
                    class="float-right btn btn-success"
                  >
                    In
                  </button>
    
                  
                </div>
              </b-col>
                <b-col id="global" class="sm-4 channel  rounded p-3 ">
                <h5 align="center">GLOBAL</h5>
                <div >
                  <button
                    type="button"
                    @click="removePresence()"
                    class="float-right btn btn-danger"
                  >
                    Out
                  </button>
                  <button
                    type="button"
                    @click="addPresence()"
                    class="float-left btn btn-success"
                  >
                    In
                  </button>
                </div>
                
              </b-col>
              <b-col class="sm-4 channel rounded p-3 " id="rec">
                <h5>REC</h5>
                <div class="DoubleBtn">
                  <button
                    type="button"
                    @click="removePresence()"
                    class="float-right btn btn-danger"
                  >
                    Out
                  </button>
                  <button
                    type="button"
                    @click="addPresence()"
                    class="float-right btn btn-success"
                  >
                    In
                  </button>
                </div>
              </b-col>
            </b-row>
            <b-row class="mb-3">
              <b-col class="sm-4 channel   rounded p-3 " id="plan">
                <h5>PLAN</h5>
                <div class="DoubleBtn">
                  <button
                    type="button"
                    @click="removePresence()"
                    class="float-right btn btn-danger"
                  >
                    Out
                  </button>
                  <button
                    type="button"
                    @click="addPresence()"
                    class="float-right btn btn-success"
                  >
                    In
                  </button>
                </div>

              </b-col>
              <b-col class="text-center" align-v="center">
                <VueRecord class="record" @result="onResult">
                  Push to talk
                  <template slot="isInitiating">
                    Grant microphone permissions
                  </template>
                  <template slot="isRecording"> Recording </template>
                  <template slot="isCreating"> Creating Sound... </template>
                </VueRecord>
              </b-col>
              <b-col class="sm-4 channel    rounded p-3 " id="contact">
                <h5>CONTACT</h5>
                <div class="DoubleBtn">
                  <button
                    type="button"
                    @click="removePresence()"
                    class="float-right btn btn-danger"
                  >
                    Out
                  </button>
                  <button
                    type="button"
                    @click="updateRooms()"
                    class="float-right btn btn-success"
                  >
                    In
                  </button>
                </div>
              </b-col>
            </b-row>
          </b-col>
          <b-col md="15" cols="3" class="rounded ml-auto p-2">
            <perfect-scrollbar @ps-scroll-y="onScroll" ref="scrollbar">
              <div id="audiosContainer">
              
              </div>
              

            </perfect-scrollbar>
          </b-col>
        </b-row>
        
      </div>
      </b-tab>
      <!--#####################################COMMUNICATION PART ################################################################################### -->
    <b-tab title="Communication">

  <div class="container">
    <div class="row">
      <div class="col-md-12 my-3">
        <h2>Rooms</h2>
      </div>
    </div>
    <div class="row">
          <div class="col-md-12">
        <div class="">
          <vue-webrtc ref="webrtc2"
                      width="100%"
                      roomId="Global"
                      v-on:joined-room="logEvent"
                      v-on:left-room="logEvent"
                      v-on:opened-room="logEvent"
                      v-on:share-started="logEvent"
                      v-on:share-stopped="logEvent"
                      @error="onError" />
         
        </div>
        <div class="row">
          <div class="col-md-12 my-3">
            <button type="button" class="btn btn-primary" @click="onJoin2">Join global</button>
            <button type="button" class="btn btn-primary" @click="onLeave2">Leave global</button>
            <button type="button" class="btn btn-primary" @click="onCapture2">Capture Photo</button>
            <button type="button" class="btn btn-primary" @click="onShareScreen2">Share Screen</button>

          </div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="">
          <vue-webrtc ref="webrtc"
                      width="100%"
                      roomId="BME"
                      v-on:joined-room="logEvent"
                      v-on:left-room="logEvent"
                      v-on:opened-room="logEvent"
                      v-on:share-started="logEvent"
                      v-on:share-stopped="logEvent"
                      @error="onError" />
         
        </div>
        <div class="row">
          <div class="col-md-12 my-3">
            <button type="button" class="btn btn-primary" @click="onJoin">Join BME</button>
            <button type="button" class="btn btn-primary" @click="onLeave">Leave BME</button>
            <button type="button" class="btn btn-primary" @click="onCapture">Capture Photo</button>
            <button type="button" class="btn btn-primary" @click="onShareScreen">Share Screen</button>

          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <h2>Captured Image</h2>
        <figure class="figure">
          <img :src="img" class="img-responsive" />
        </figure>
      </div>
    </div>
  </div>
    </b-tab>
    
  </b-tabs>
    </b-container>
  </div>
</template>

  <script>


// template
import Vue from 'vue'
import WebRTC from 'vue-webrtc'

// ISSUE 5: https://github.com/westonsoftware/vue-webrtc/issues/5
import * as io from 'socket.io-client'
window.io = io
//

Vue.use(WebRTC);
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import comBadge from "../components/CommunicationBadge.vue";
import VueRecord from "@loquiry/vue-record-audio";
import { PerfectScrollbar } from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";
export default {
  data() {
    return {
        img: null,
        roomId: "public-room",
      rooms_: [
        { key: "name", label: "Room name", sortable: true },
        { key: "users", label: "user list", sortable: false },
      ],
      sortBy: "name",
      hideEmpty: false,
      transProps: {
        name: "flip-list",
      },
      selected: [],
      isBusy: false,
      editedRoom: {id: '0',  name: "", users: ['pi'] },
    };
  },
  computed: {
    ...mapState("communication", ["rooms"]),
    ...mapGetters("user", ["isAllowed"]),
    sortOptions() {
      return this.rooms_
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  components: {
    VueRecord,
    PerfectScrollbar,
    comBadge,
  },

  methods: {
    updateRooms() {
				
				alert("room edited")
				this.$store.dispatch('communication/updateRoom', this.editedRoom)	
			},
    onScroll(event) {
      console.log(this.$refs.scrollbar.ps, event);
    },
    removePresence() {
      alert("exit");
    },
    onResult(data) {
      console.log("record button data:", data);
      console.log("Sound in ms:", data.duration);
      console.log(URL.createObjectURL(data.blob));
      var div = document.getElementById("audiosContainer");
      var link = document.createElement("link");
      link.rel = "stylesheet";

      link.href = URL.createObjectURL(data.blob);
      div.innerHTML +=
        '<audio controls  name="media"><source src="' +
        link.href +
        '" type="audio/wav"></audio>';
    },

    addPresence(room) {
      alert("entering " + room);
    },
    onCapture() {
        this.img = this.$refs.webrtc.capture();
      },
      onJoin() {
        this.$refs.webrtc.join();
      },
      onLeave() {
        this.$refs.webrtc.leave();
      },
      onShareScreen() {
        this.img = this.$refs.webrtc.shareScreen();
      },
      onCapture2() {
        this.img = this.$refs.webrtc2.capture();
      },
      onJoin2() {
        this.$refs.webrtc2.join();
      },
      onLeave2() {
        this.$refs.webrtc2.leave();
      },
      onShareScreen2() {
        this.img = this.$refs.webrtc2.shareScreen();
      },
      onError(error, stream) {
        console.log('On Error Event', error, stream);
      },
      logEvent(event) {
        console.log('Event : ', event);
      },
  },
  mounted() {},
};
</script>
  

<style scoped>
.record {
  width: 230px;
  height: 150px;
  border-radius: 100px;
}
.record.active {
  background: red;
}
.DoubleBtn {
  margin-left: 30px;
  width: 100px;
  height: 43px;
  float: right;
  margin-top: -40px;
}
#audiosContainer {
  height: 652px;
}
.ps {
  width: 320px;
  padding: 10px;
  margin-left: 30px;
  height: 650px;
  border: 2px solid black;

  border-radius: 30px;
  background-color: rgb(141, 204, 241);
}
.channel {
  height: 150px;
  margin-left: 5px;
  margin-right: 5px;
  }
  #global {
    height: 100px;
    margin-top: 50px;
    
  }
  #science {
    background-color: rgb(135,206,235);
  }
  #base {
    background-color: rgb(109, 151, 165);
  }
  #flight{
    background-color: rgb(92, 156, 165);
  }
  #cap {
    background-color: rgb(96, 182, 236);
  }
  #pro {
    background-color: rgb(0,191,255);
  }
  #bme 
  {
    background-color: rgb(30,144,255);
  }
  #rec {
    background-color: rgb(100,149,237);
  }
  #plan {
    background-color: rgb(70,130,180);

  }
  #contact {
  background-color: rgb(43, 120, 184);}
</style>
