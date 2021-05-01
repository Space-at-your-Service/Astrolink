<template>
  <div class="main-container">
    <h3 class="section-title">Communication {{rooms}}</h3>
    
    <!--   <button v-on:click="hello">call helllo</button>
<input type="file" accept="audio/*" capture>
<audio id="player" controls></audio> -->

    <b-container fluid="sm">
      
  <b-tabs content-class="mt-3" fill>
    <b-tab title="Audios" active>
      <!--#####################################AUDIO PART ########################################################################################### -->

      <div id="channelContainer">
        <b-row>
          <b-col cols="9" class="rounded p-2">
            <b-row class="mb-3">
              <b-col id="flight" class="sm-4 channel  rounded p-3">
                <h5>FLIGHT</h5>
                       <div class="DoubleBtn" v-for="group in groups" :key="group.role">
                  
                <div v-if="group.unit !== 'Astronauts'">

                    <button 
                    type="button"
                    @click="removePresence('flight')"
                    class="float-right btn btn-danger" 
                    
                    >
                 <!-- :class={: 'float-right'} -->
                    Out
                  </button>
                  <button 
                    type="button"
                    @click="addPresence('flight')"
                    class="float-right btn btn-success" >
                  
                    In
                  </button>


                </div>
                </div>
                <comBadge id="MA" :speaking="false" />
              </b-col>
              <b-col id="base" class="sm-4 channel  rounded p-3 ">
                <h5>base</h5>
              <div class="DoubleBtn" v-for="group in groups" :key="group.role">
                  
                <div >

                    <button 
                    type="button"
                    @click="removePresence('base')"
                    class="float-right btn btn-danger" >
                 
                    Out
                  </button>
                  <button 
                    type="button"
                    @click="addPresence('base')"
                    class="float-right btn btn-success" >
                  
                    In
                  </button>


                </div>
                </div>
                <comBadge id="MA" :speaking="false" />
              </b-col>
              <b-col id="science" class="sm-4 channel  rounded p-3 ">
                <h5>SCIENCE</h5>
                       <div class="DoubleBtn" v-for="group in groups" :key="group.role">
                  
                <div v-if="group.unit !== 'Astronauts'">

                    <button 
                    type="button"
                    @click="removePresence('science')"
                    class="float-right btn btn-danger" >
                 
                    Out
                  </button>
                  <button 
                    type="button"
                    @click="addPresence('science')"
                    class="float-right btn btn-success" >
                  
                    In
                  </button>


                </div>
                </div>
              </b-col>
            </b-row>
            <b-row class="mb-3">
              <b-col class="sm-4 channel  rounded p-3 " id="cap">
                <h5>CAP</h5>
                       <div class="DoubleBtn" v-for="group in groups" :key="group.role">
                  
                <div v-if="group.unit !== 'Astronauts'">

                    <button 
                    type="button"
                    @click="removePresence('cap')"
                    class="float-right btn btn-danger" >
                 
                    Out
                  </button>
                  <button 
                    type="button"
                    @click="addPresence('cap')"
                    class="float-right btn btn-success" >
                  
                    In
                  </button>


                </div>
                </div>
              </b-col>
              <b-col></b-col>
              <b-col class="sm-4 channel   rounded p-3  " id="pro">
                <h5>PRO</h5>
                       <div class="DoubleBtn" v-for="group in groups" :key="group.role">
                  
                <div v-if="group.unit !== 'Astronauts'">

                    <button 
                    type="button"
                    @click="removePresence('pro')"
                    class="float-right btn btn-danger" >
                 
                    Out
                  </button>
                  <button 
                    type="button"
                    @click="addPresence('pro')"
                    class="float-right btn btn-success" >
                  
                    In
                  </button>


                </div>
                </div>
              </b-col>
            </b-row>
            <b-row class="mb-3">
              <b-col class="sm-4 channel  rounded p-3" id="bme">
                <h5>BME</h5>
                          <div class="DoubleBtn" v-for="group in groups" :key="group.role">
                  
                <div v-if="group.unit !== 'Astronauts'">

                    <button 
                    type="button"
                    @click="removePresence('bme')"
                    class="float-right btn btn-danger" >
                 
                    Out
                  </button>
                  <button 
                    type="button"
                    @click="addPresence('bme')"
                    class="float-right btn btn-success" >
                  
                    In
                  </button>


                </div>
                </div>
              </b-col>
                <b-col id="global" class="sm-4 channel  rounded p-3 ">
                <h5 align="center">GLOBAL</h5>
                <div v-for="group in groups" :key="group.role">
                  <button v-if="group.unit !== 'Astronauts'"
                    type="button"
                    @click="removePresence('global')"
                    class="float-right btn btn-danger"
                  >
                    Out
                  </button>
                  <button v-if="group.unit !== 'Astronauts'"
                    type="button"
                    @click="addPresence('global')"
                    class="float-left btn btn-success"
                  >
                    In
                  </button>
                </div>
                
              </b-col>
              <b-col class="sm-4 channel rounded p-3 " id="rec">
                <h5>REC</h5>
                       <div class="DoubleBtn" v-for="group in groups" :key="group.role">
                  
                <div v-if="group.unit !== 'Astronauts'">

                    <button 
                    type="button"
                    @click="removePresence('rec')"
                    class="float-right btn btn-danger" >
                 
                    Out
                  </button>
                  <button 
                    type="button"
                    @click="addPresence('rec')"
                    class="float-right btn btn-success" >
                  
                    In
                  </button>


                </div>
                </div>
              </b-col>
            </b-row>
            <b-row class="mb-3">
              <b-col class="sm-4 channel   rounded p-3 " id="plan">
                <h5>PLAN</h5>
                            <div class="DoubleBtn" v-for="group in groups" :key="group.role">
                  
                <div v-if="group.unit !== 'Astronauts'">

                    <button 
                    type="button"
                    @click="removePresence('plan')"
                    class="float-right btn btn-danger" >
                 
                    Out
                  </button>
                  <button 
                    type="button"
                    @click="addPresence('plan')"
                    class="float-right btn btn-success" >
                  
                    In
                  </button>


                </div>
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
                <VueRecord class="record" @result="onResult">
                  Global
                  <template slot="isInitiating">
                    Grant microphone permissions
                  </template>
                  <template slot="isRecording"> Recording </template>
                  <template slot="isCreating"> Creating Sound... </template>
                </VueRecord>
              </b-col>
              <b-col class="sm-4 channel    rounded p-3 " id="contact">
                <h5>CONTACT</h5>
                <div class="DoubleBtn" v-for="group in groups" :key="group.role">
                  
                <div v-if="group.unit !== 'Astronauts'">

                    <button 
                    type="button"
                    @click="removePresence('contact')"
                    class="float-right btn btn-danger" >
                 
                    Out
                  </button>
                  <button 
                    type="button"
                    @click="addPresence('contact')"
                    class="float-right btn btn-success" >
                  
                    In
                  </button>


                </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
          <b-col md="15" cols="3" class="rounded ml-auto p-2">
           <!-- <b-tabs  :v-for="room in joinedRooms" :key="room"> 
                    <b-tab > -->
            <perfect-scrollbar @ps-scroll-y="onScroll" ref="scrollbar">
              <div id="audiosContainer">
                  
                
                  
              </div>

            </perfect-scrollbar>
           <!-- </b-tab>

            </b-tabs> -->
          </b-col>
        </b-row>
        
      </div>
      </b-tab>
      <!--#####################################COMMUNICATION PART ################################################################################### -->
    <b-tab title="Communication">



      <b-row  >
    <b-col 
        v-for="(channel, index) in roomsList" :key="index">
                  <WRTCRoom :roomName="channel"/>


    </b-col>
</b-row>

    </b-tab>
    
  </b-tabs>
    </b-container>
  </div>
</template>

  <script>


// template


//
import WRTCRoom from "../components/WRTCRoom.vue";
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import comBadge from "../components/CommunicationBadge.vue";
import VueRecord from "@loquiry/vue-record-audio";
import { PerfectScrollbar } from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";
export default {
  data() {
    return {
      joinedRooms: [],
        img: null,
				fields: [
					{ key: 'id', label: 'Room ID', sortable: true, sortDirection: 'desc' },
					{ key: 'name', label: 'Name', sortable: true },
					{ key: 'users', label: 'users', sortable: false }
				],
      sortBy: "name",
      hideEmpty: false,
      transProps: {
        name: "flip-list",
      },
      selected: [],
      isBusy: false,
      editedRoom: {id: '0',  name: "", users: "" },
      roomsList: ['BME', 'Global','Base','Flight', 'Science', 'Pro', 'Rec', 'Plan', 'Cap' ,'Contact'],
      roomAccessControl: []
    };
  },
  computed: {
      ...mapState('user', ['permissions', 'username', 'firstName', 'lastName', 'groups']),
      ...mapState('communication', ['rooms']),
      ...mapGetters('user', ['isAllowed']),

    },
    sortOptions() {
      return this.rooms_
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
 
  components: {
    WRTCRoom,
    VueRecord,
    PerfectScrollbar,
    comBadge,
  },

  methods: {
 
    onScroll(event) {
      console.log(this.$refs.scrollbar.ps, event);
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

    addPresence(roomName) {
      console.log(this.rooms)
      const editedRoom = {...this.rooms.find(x => x.name === roomName)
};
      console.log(roomName)
      let users =  this.rooms.find(x => x.name === roomName).users;
      users = users.split(",");

      if (!users.includes(this.firstName+':'+this.lastName)){
        users.push(this.firstName+':'+this.lastName)
      }
      editedRoom.users = users.join(',');
      this.$store.dispatch('communication/updateRoom', editedRoom);
    

    },

    removePresence(roomName) {
      const editedRoom = {...this.rooms.find(x => x.name === roomName)};
      let users =  this.rooms.find(x => x.name === roomName).users;
      users = users.split(",");

      if (users.includes(this.firstName+':'+this.lastName)){
        users.pop(this.firstName+':'+this.lastName)
      }
      editedRoom.users = users.join(',');
      this.$store.dispatch('communication/updateRoom', editedRoom);
    

    },
    
    
      onError(error, stream) {
        console.log('On Error Event', error, stream);
      },
      logEvent(event) {
        console.log('Event : ', event);
      },
  },
  mounted() {
    this.$store.dispatch('communication/getRooms')
  },
};
</script>
  

<style scoped>
.vueWRTCBox {
  width: 40px;
}
.record {
  width: 230px;
  height: 76px;
  border-radius: 40px;
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
