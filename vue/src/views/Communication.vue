<template>
  <div class="main-container">
    <h3 class="section-title">Communication</h3>

    <b-container fluid="sm">
      <b-tabs content-class="mt-3" fill>
        <b-tab title="Audios" active>
          <!--#####################################AUDIO PART ########################################################################################### -->

          <div id="channelContainer">
            <b-row>
              <b-col cols="9" class="rounded p-2">
                <b-row class="mb-3">
                  <b-col id="flight" class="sm-4 channel rounded p-3">
                    <h5>FLIGHT</h5>
                    <div
                      class="DoubleBtn"
                      v-for="group in groups"
                      :key="group.role"
                    >
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
                          class="float-right btn btn-success"
                        >
                          In
                        </button>
                      </div>
                    </div>

                    <b-row class="badgesRow">
                      <b-col
                        class="badgesDiv"
                        v-for="person in userLists['flight']"
                        :key="person"
                      >
                        <comBadge
                          :color="computeColor(person)"
                          :id="person"
                          :speaking="false"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col id="base" class="sm-4 channel rounded p-3">
                    <h5>base</h5>
                    <div
                      class="DoubleBtn"
                      v-for="group in groups"
                      :key="group.role"
                    >
                      <div>
                        <button
                          type="button"
                          @click="removePresence('base')"
                          class="float-right btn btn-danger"
                        >
                          Out
                        </button>
                        <button
                          type="button"
                          @click="addPresence('base')"
                          class="float-right btn btn-success"
                        >
                          In
                        </button>
                      </div>
                    </div>
                    <b-row class="badgesRow">
                      <b-col
                        class="badgesDiv"
                        v-for="person in userLists['base']"
                        :key="person"
                      >
                        <comBadge
                          :color="computeColor(person)"
                          :id="person"
                          :speaking="false"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col id="science" class="sm-4 channel rounded p-3">
                    <h5>SCIENCE</h5>
                    <div
                      class="DoubleBtn"
                      v-for="group in groups"
                      :key="group.role"
                    >
                      <div v-if="group.unit !== 'Astronauts'">
                        <button
                          type="button"
                          @click="removePresence('science')"
                          class="float-right btn btn-danger"
                        >
                          Out
                        </button>
                        <button
                          type="button"
                          @click="addPresence('science')"
                          class="float-right btn btn-success"
                        >
                          In
                        </button>
                      </div>
                    </div>
                    <b-row class="badgesRow">
                      <b-col
                        class="badgesDiv"
                        v-for="person in userLists['science']"
                        :key="person"
                      >
                        <comBadge
                          :color="computeColor(person)"
                          :id="person"
                          :speaking="false"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row class="mb-3">
                  <b-col class="sm-4 channel rounded p-3" id="cap">
                    <h5>CAP</h5>
                    <div
                      class="DoubleBtn"
                      v-for="group in groups"
                      :key="group.role"
                    >
                      <div v-if="group.unit !== 'Astronauts'">
                        <button
                          type="button"
                          @click="removePresence('cap')"
                          class="float-right btn btn-danger"
                        >
                          Out
                        </button>
                        <button
                          type="button"
                          @click="addPresence('cap')"
                          class="float-right btn btn-success"
                        >
                          In
                        </button>
                      </div>
                    </div>
                    <b-row class="badgesRow">
                      <b-col
                        class="badgesDiv"
                        v-for="person in userLists['cap']"
                        :key="person"
                      >
                        <comBadge
                          :color="computeColor(person)"
                          :id="person"
                          :speaking="false"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col id="global" class="sm-4 channel rounded p-3">
                    <h5 align="center">GLOBAL</h5>
                    <div v-for="group in groups" :key="group.role">
                      <button
                        v-if="group.unit !== 'Astronauts'"
                        type="button"
                        @click="removePresence('global')"
                        class="float-right btn btn-danger"
                      >
                        Out
                      </button>
                      <button
                        v-if="group.unit !== 'Astronauts'"
                        type="button"
                        @click="addPresence('global')"
                        class="float-left btn btn-success"
                      >
                        In
                      </button>
                    </div>
                  </b-col>
                  <b-col class="sm-4 channel rounded p-3" id="pro">
                    <h5>PRO</h5>
                    <div
                      class="DoubleBtn"
                      v-for="group in groups"
                      :key="group.role"
                    >
                      <div v-if="group.unit !== 'Astronauts'">
                        <button
                          type="button"
                          @click="removePresence('pro')"
                          class="float-right btn btn-danger"
                        >
                          Out
                        </button>
                        <button
                          type="button"
                          @click="addPresence('pro')"
                          class="float-right btn btn-success"
                        >
                          In
                        </button>
                      </div>
                    </div>
                    <b-row class="badgesRow">
                      <b-col
                        class="badgesDiv"
                        v-for="person in userLists['pro']"
                        :key="person"
                      >
                        <comBadge
                          :color="computeColor(person)"
                          :id="person"
                          :speaking="false"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row class="mb-3">
                  <b-col class="sm-4 channel rounded p-3" id="bme">
                    <h5>BME</h5>
                    <div
                      class="DoubleBtn"
                      v-for="group in groups"
                      :key="group.role"
                    >
                      <div v-if="group.unit !== 'Astronauts'">
                        <button
                          type="button"
                          @click="removePresence('bme')"
                          class="float-right btn btn-danger"
                        >
                          Out
                        </button>
                        <button
                          type="button"
                          @click="addPresence('bme')"
                          class="float-right btn btn-success"
                        >
                          In
                        </button>
                      </div>
                    </div>
                    <b-row class="badgesRow">
                      <b-col
                        class="badgesDiv"
                        v-for="person in userLists['bme']"
                        :key="person"
                      >
                        <comBadge
                          :color="computeColor(person)"
                          :id="person"
                          :speaking="false"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col class="sm-4 channel rounded p-3 text-center">
                    <vue-dictaphone
                      @stop="onResultGlobal($event)"
                      v-slot="{ isRecording, startRecording, stopRecording }"
                      mime-type="audio/mp3"
                    >
                      <button
                        class="recordBtn"
                        v-if="!isRecording"
                        @click="startRecording"
                      >
                        Global
                      </button>
                      <button
                        class="recordBtn recording"
                        v-else
                        @click="stopRecording"
                      >
                        Stop recording
                      </button>
                      <vue-dictaphone-spectrum-analyser
                        class="spectrum"
                        v-if="isRecording"
                      />
                    </vue-dictaphone>
                  </b-col>
                  <b-col class="sm-4 channel rounded p-3" id="rec">
                    <h5>REC</h5>
                    <div
                      class="DoubleBtn"
                      v-for="group in groups"
                      :key="group.role"
                    >
                      <div v-if="group.unit !== 'Astronauts'">
                        <button
                          type="button"
                          @click="removePresence('rec')"
                          class="float-right btn btn-danger"
                        >
                          Out
                        </button>
                        <button
                          type="button"
                          @click="addPresence('rec')"
                          class="float-right btn btn-success"
                        >
                          In
                        </button>
                      </div>
                    </div>
                    <b-row class="badgesRow">
                      <b-col
                        class="badgesDiv"
                        v-for="person in userLists['rec']"
                        :key="person"
                      >
                        <comBadge
                          :color="computeColor(person)"
                          :id="person"
                          :speaking="false"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row class="mb-3">
                  <b-col class="sm-4 channel rounded p-3" id="plan">
                    <h5>PLAN</h5>
                    <div
                      class="DoubleBtn"
                      v-for="group in groups"
                      :key="group.role"
                    >
                      <div v-if="group.unit !== 'Astronauts'">
                        <button
                          type="button"
                          @click="removePresence('plan')"
                          class="float-right btn btn-danger"
                        >
                          Out
                        </button>
                        <button
                          type="button"
                          @click="addPresence('plan')"
                          class="float-right btn btn-success"
                        >
                          In
                        </button>
                      </div>
                    </div>
                    <b-row class="badgesRow">
                      <b-col
                        class="badgesDiv"
                        v-for="person in userLists['plan']"
                        :key="person"
                      >
                        <comBadge
                          :color="computeColor(person)"
                          :id="person"
                          :speaking="false"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col
                    class="sm-4 channel rounded p-3 text-center"
                    align-v="center"
                  >
                    <vue-dictaphone
                      @stop="onResult($event)"
                      v-slot="{ isRecording, startRecording, stopRecording }"
                      mime-type="audio/mp3"
                    >
                      <button
                        class="recordBtn"
                        v-if="!isRecording"
                        @click="startRecording"
                      >
                        Start recording
                      </button>
                      <button
                        class="recordBtn recording"
                        v-else
                        @click="stopRecording"
                      >
                        Stop recording
                      </button>
                      <vue-dictaphone-spectrum-analyser
                        class="spectrum"
                        v-if="isRecording"
                      />
                    </vue-dictaphone>
                  </b-col>
                  <b-col class="sm-4 channel rounded p-3" id="contact">
                    <h5>CONTACT</h5>
                    <div
                      class="DoubleBtn"
                      v-for="group in groups"
                      :key="group.role"
                    >
                      <div v-if="group.unit !== 'Astronauts'">
                        <button
                          type="button"
                          @click="removePresence('contact')"
                          class="float-right btn btn-danger"
                        >
                          Out
                        </button>
                        <button
                          type="button"
                          @click="addPresence('contact')"
                          class="float-right btn btn-success"
                        >
                          In
                        </button>
                      </div>
                    </div>
                    <b-row class="badgesRow">
                      <b-col
                        class="badgesDiv"
                        v-for="person in userLists['contact']"
                        :key="person"
                      >
                        <comBadge
                          :color="computeColor(person)"
                          :id="person"
                          :speaking="false"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-col>

              <b-col md="15" cols="3" class="rounded ml-auto p-2 audiosDiv">
                <b-tabs>
                  <b-tab
                    v-for="room in roomsUserIsIn"
                    :key="room"
                    :title="room"
                  >
                    <vue-custom-scrollbar
                      class="scroll-area"
                      :settings="settings"
                      @ps-scroll-y="scrollHanle"
                    >
                      <div id="audiosContainer">
                        <div
                          class="audios"
                          v-for="audio in audios"
                          :key="audio.id"
                        >
                          <div v-if="audio.rooms.split(',').includes(room)">
                            <i>{{
                              audio.user + " " + toReadable(audio.timestamp)
                            }}</i>
                            <i
                              v-if="
                                audio.seenBy
                                  .split(',')
                                  .includes(firstName + ':' + lastName)
                              "
                              style="color: #42f5ad"
                            >
                              seen</i
                            >
                            <audio controls v-on:play="listenned(audio.id)">
                              <source
                                :src="'http://localhost:8000' + audio.audiofile"
                                type="audio/mp3"
                              />
                              Your browser does not support the audio tag.
                            </audio>
                          </div>
                        </div>
                      </div>
                    </vue-custom-scrollbar>
                  </b-tab>
                </b-tabs>
              </b-col>
            </b-row>
          </div>
        </b-tab>
        <!--#####################################COMMUNICATION PART ################################################################################### -->
        <b-tab title="Communication">
          <div id="comDiv">
            <b-row id="channelMenu">
              <b-col v-for="channel in roomsList" :key="channel">
                <button
                  v-if="!roomsListJoined.includes(channel)"
                  class="btn btn-primary roomSelector"
                  @click="addRoom(channel)"
                >
                  Join {{ channel }}
                </button>
                <button
                  v-if="roomsListJoined.includes(channel)"
                  class="btn btn-danger roomSelector"
                  @click="delRoom(channel)"
                >
                  Leave {{ channel }}
                </button>
              </b-col>
              <b-col
                ><input type="checkbox" id="checkbox" v-model="videoOn" />
                <label for="checkbox">Video: {{ videoOn }}</label></b-col
              >
            </b-row>
            <b-row id="videosRow">
              <b-col v-for="(channel, index) in roomsListJoined" :key="index">
                <WRTCRoom :roomName="channel" :videoOn="videoOn" />
              </b-col>
            </b-row>
          </div>
        </b-tab>
      </b-tabs>
    </b-container>
  </div>
</template>

  <script>
// template

//
import Vue from "vue";
import VueDictaphone from "vue-dictaphone";
Vue.use(VueDictaphone);
import WRTCRoom from "../components/WRTCRoom.vue";
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import comBadge from "../components/CommunicationBadge.vue";
import { Colors } from "../utils/colors.js";
import Audio from "../models/Audio.js";
import vueCustomScrollbar from "vue-custom-scrollbar";
import "vue-custom-scrollbar/dist/vueScrollbar.css";
export default {
  data() {
    return {
      settings: {
        suppressScrollY: false,
        suppressScrollX: false,
        wheelPropagation: false,
      },
      videoOn: true,
      roomsUserIsIn: [],
      createdAudio: new Audio(),
      speaking: false,
      usersColors: {},
      userLists: {
        bme: [],
        global: [],
        base: [],
        flight: [],
        science: [],
        pro: [],
        rec: [],
        plan: [],
        cap: [],
        contact: [],
      },
      splitRooms: [],
      joinedRooms: [],
      img: null,
      fields: [
        { key: "id", label: "Room ID", sortable: true, sortDirection: "desc" },
        { key: "name", label: "Name", sortable: true },
        { key: "users", label: "users", sortable: false },
      ],
      sortBy: "name",
      hideEmpty: false,
      transProps: {
        name: "flip-list",
      },

      selected: [],
      isBusy: false,
      editedRoom: { id: "0", name: "", users: "", usersSpeaking: "" },

      roomsList: [
        "BME",
        "Global",
        "Base",
        "Flight",
        "Science",
        "Pro",
        "Rec",
        "Plan",
        "Cap",
        "Contact",
      ],
      roomsListJoined: [],
    };
  },
  computed: {
    ...mapState("user", [
      "permissions",
      "username",
      "firstName",
      "lastName",
      "groups",
    ]),
    ...mapState("communication", ["rooms"]),
    ...mapState("audio", ["audios"]),

    ...mapGetters("user", ["isAllowed"]),
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
    vueCustomScrollbar,
    comBadge,
  },

  methods: {
    scrollHanle(evt) {
      console.log(evt);
    },
    ascii(a) {
      return a.charCodeAt(0);
    },
    listenned(id) {
      let editedAudio = { ...this.audios.find((x) => x.id === id) };
      let listennedByUsers = this.audios.find((x) => x.id === id).seenBy;
      listennedByUsers = listennedByUsers.split(",");

      if (!listennedByUsers.includes(this.firstName + ":" + this.lastName)) {
        listennedByUsers.push(this.firstName + ":" + this.lastName);
      }
      editedAudio.seenBy = listennedByUsers.join(",");
      this.$store.dispatch("audio/updateAudio", editedAudio);
    },

    toReadable(s) {
      if (s == undefined) {
        return "";
      }
      var news = s.slice(5, 19).replace("T", " ");
      return news;
    },

    onScroll(event) {
      console.log(this.$refs.scrollbar.ps, event);
    },
    addRoom(room) {
      if (!this.roomsListJoined.includes(room)) {
        this.roomsListJoined.push(room);
      }
    },
    delRoom(room) {
      if (this.roomsListJoined.includes(room)) {
        document.getElementById(room + "leave").click();
        this.roomsListJoined = this.arrayRemove(this.roomsListJoined, room);
      }
    },
    startStopRecord() {
      document.getElementById("pttBtn").click();
      for (var i = 0; i < this.roomsUserIsIn.length; ++i) {
        this.startStopSpeaking(this.roomsUserIsIn[i]);
      }
    },
    handleRecording({ blob, src }) {
      this.audioSource = src;
      console.log(blob);
    },
    genId() {
      const current = new Date();
      const date =
        current.getFullYear() +
        "" +
        current.getDate() +
        "" +
        (current.getMonth() + 1);
      const time =
        current.getHours() +
        "" +
        current.getMinutes() +
        "" +
        current.getSeconds();
      const dateTime = date + "" + time;
      const id = dateTime + this.username;
      console.log(id);
      return id;
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async sendBase(audio) {
      await this.sleep(100);
      let editedAudio = { ...this.audios.find((x) => x.id === audio.id) };
      editedAudio.rooms = this.roomsUserIsIn.join(",");
      this.$store.dispatch("audio/updateAudio", editedAudio);
    },
    async onResult(data) {
      if (this.roomsUserIsIn.includes("base")) {
        var noBase = this.arrayRemove(this.roomsUserIsIn, "base");
        this.createdAudio.id = this.genId();
        this.createdAudio.user = this.firstName + ":" + this.lastName;
        this.createdAudio.rooms = noBase.join(",");
        this.createdAudio.seenBy = this.firstName + ":" + this.lastName;
        const myFile = new File([data.blob], "audio.mp3");

        this.createdAudio.audiofile = myFile;

        this.$store.dispatch("audio/createAudio", this.createdAudio);
        this.sendBase(this.createdAudio);
      } else {
        this.createdAudio.id = this.genId();
        this.createdAudio.user = this.firstName + ":" + this.lastName;
        this.createdAudio.rooms = this.roomsUserIsIn.join(",");
        this.createdAudio.seenBy = this.firstName + ":" + this.lastName;
        const myFile = new File([data.blob], "audio.mp3");

        this.createdAudio.audiofile = myFile;
        this.$store.dispatch("audio/createAudio", this.createdAudio);
      }
    },
    onResultGlobal(data) {
      this.createdAudio.id = this.genId();
      this.createdAudio.user = this.firstName + ":" + this.lastName;
      this.createdAudio.rooms = "global";
      this.createdAudio.seenBy = this.firstName + ":" + this.lastName;
      const myFile = new File([data.blob], "audio.wav");

      this.createdAudio.file = myFile;
      this.$store.dispatch("audio/createAudio", this.createdAudio);
    },
    startStopSpeaking(roomName) {
      const editedRoom = { ...this.rooms.find((x) => x.name === roomName) };
      let speaking = this.rooms.find((x) => x.name === roomName).usersSpeaking;

      speaking = speaking.split(",");

      if (!speaking.includes(this.firstName + ":" + this.lastName)) {
        speaking.push(this.firstName + ":" + this.lastName);
      } else {
        speaking = this.arrayRemove(
          speaking,
          this.firstName + ":" + this.lastName
        );
      }
      editedRoom.usersSpeaking = speaking.join(",");
      this.$store.dispatch("communication/updateRoom", editedRoom);
    },
    addPresence(roomName) {
      const editedRoom = { ...this.rooms.find((x) => x.name === roomName) };
      let users = this.rooms.find((x) => x.name === roomName).users;

      users = users.split(",");

      if (!users.includes(this.firstName + ":" + this.lastName)) {
        users.push(this.firstName + ":" + this.lastName);
      }
      editedRoom.users = users.join(",");
      this.$store.dispatch("communication/updateRoom", editedRoom);
    },

    computeColor(s) {
      var score = s
        .split("")
        .map(this.ascii)
        .reduce((a, b) => a + b, 0);
      var k = Object.keys(Colors.names)[score % 42];
      return Colors.names[k];
    },
    splitUsers() {
      for (let room_ in this.userLists) {
        try {
          let users = this.rooms.find((x) => x.name === room_).users;
          if (users == [""]) {
            this.userLists[room_] = [];
          } else {
            users = users.split(",");
            if (users[0] == "") {
              users = users.splice(1);
            }
            this.userLists[room_] = users;
          }
        } catch (error) {
          this.userLists[room_] = [];
          console.error(error);
        }
      }
    },

    arrayRemove(arr, value) {
      return arr.filter(function (ele) {
        return ele != value;
      });
    },

    removePresence(roomName) {
      const editedRoom = { ...this.rooms.find((x) => x.name === roomName) };
      let users = this.rooms.find((x) => x.name === roomName).users;
      users = users.split(",");

      if (users.includes(this.firstName + ":" + this.lastName)) {
        users = this.arrayRemove(users, this.firstName + ":" + this.lastName);
      }
      editedRoom.users = users.join(",");
      this.$store.dispatch("communication/updateRoom", editedRoom);
    },

    onError(error, stream) {
      console.log("On Error Event", error, stream);
    },
    logEvent(event) {
      console.log("Event : ", event);
    },
    actualiseRooms() {
      this.roomsUserIsIn = [];
      for (let room in this.userLists) {
        if (
          this.userLists[room].includes(this.firstName + ":" + this.lastName)
        ) {
          this.roomsUserIsIn.push(room);
        }
      }
    },
    refresh() {
      this.$store.dispatch("communication/getRooms");
      this.$store.dispatch("audio/getAudios");
      this.actualiseRooms();
      this.splitRooms = Object.assign({}, this.rooms);
      this.splitUsers();
    },
  },
  created() {
    setInterval(this.refresh, 1000);
  },
  mounted() {
    this.$store.dispatch("communication/getRooms");
  },
};
</script>
  

<style scoped>
.scroll-area {
  position: relative;
  margin: auto;
  width: 600px;
  height: 400px;
}
#videosRow {
  margin-top: 40px;
}
.vueWRTCBox {
  width: 40px;
}
.recordBtn {
  width: 230px;
  height: 76px;
  border-radius: 40px;
}
.recording {
  background: red;
}
.DoubleBtn {
  margin-left: 30px;
  width: 100px;
  height: 35px;
  float: right;
  margin-top: -40px;
}
#audiosContainer {
  height: 652px;
}
.roomSelector {
  width: 80px;
}
.spectrum {
  width: 200px;
  color: white;
  border-radius: 40px;
}
#channelMenu {
  background-color: rgb(68, 68, 190);
  margin-top: 30px;
  border-radius: 30px;
  padding: 10px;
}
.ps {
  width: 320px;
  padding: 10px;
  height: 600px;

  border-radius: 30px;
}
.badgesDiv {
  width: 45px;
}
.badgesRow {
  width: 250px;
}
#comDiv {
  background-color: rgb(153, 196, 252);
  padding-bottom: 20px;
  height: auto;
  border-radius: 30px;
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
  background-color: rgb(135, 206, 235);
}
#base {
  background-color: rgb(109, 151, 165);
}
#flight {
  background-color: rgb(92, 156, 165);
}
#cap {
  background-color: rgb(96, 182, 236);
}
#pro {
  background-color: rgb(0, 191, 255);
}
#bme {
  background-color: rgb(30, 144, 255);
}
#rec {
  background-color: rgb(100, 149, 237);
}
#plan {
  background-color: rgb(70, 130, 180);
}
#contact {
  background-color: rgb(43, 120, 184);
}
</style>
