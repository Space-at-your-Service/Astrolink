<template>
  <div class="main-container">
    <h3 class="section-title">
      Communication 
      <b-button
        class="helpShortcut"
        @click="helpShortcut = !helpShortcut"
        variant="outline-info"
        >Shortcut help</b-button
      >
    </h3>

    <b-container fluid="sm">
      <b-tabs content-class="mt-3" fill>
        <b-tab id="audiosTab" title="Audios" active>
          <!--#####################################AUDIO PART ########################################################################################### -->

          <div id="channelContainer">
            <b-row>
              <b-col cols="9" class="rounded p-2">
                <b-row class="mb-3">
                  <b-col id="flight" class="sm-4 channel rounded p-3">
                    <h5 v-if="helpShortcut">FLIGHT (1)</h5>
                    <h5 v-else>FLIGHT</h5>
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
                          :speaking="isThisOneSpeaking(person, 'flight')"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col id="base" class="sm-4 channel rounded p-3">
                    <h5 v-if="helpShortcut">BASE (2)</h5>
                    <h5 v-else>BASE</h5>
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
                          :speaking="isThisOneSpeaking(person, 'base')"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col id="science" class="sm-4 channel rounded p-3">
                    <h5 v-if="helpShortcut">SCIENCE (3)</h5>
                    <h5 v-else>SCIENCE</h5>
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
                          :speaking="isThisOneSpeaking(person, 'science')"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row class="mb-3">
                  <b-col class="sm-4 channel rounded p-3" id="cap">
                    <h5 v-if="helpShortcut">CAP (4)</h5>
                    <h5 v-else>CAP</h5>
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
                          :speaking="isThisOneSpeaking(person, 'cap')"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col id="global" class="sm-4 channel rounded p-3">
                    <h5 align="center" v-if="helpShortcut">GLOBAL (0)</h5>
                    <h5 v-else align="center">GLOBAL</h5>
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
                    <h5 v-if="helpShortcut">PRO (5)</h5>
                    <h5 v-else>PRO</h5>
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
                          :speaking="isThisOneSpeaking(person, 'pro')"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row class="mb-3">
                  <b-col class="sm-4 channel rounded p-3" id="bme">
                    <h5 v-if="helpShortcut">BME (6)</h5>
                    <h5 v-else>BME</h5>
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
                          :speaking="isThisOneSpeaking(person, 'bme')"
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
                        id="realRecordBtn2"
                        class="hide"
                        v-if="true"
                        @click="startRecording"
                      ></button>
                      <button
                        class="recordBtn"
                        v-if="!isRecording"
                        @click="startRecord('2')"
                      >
                        <h6 v-if="helpShortcut">Global (keep AltGR pressed)</h6>
                        <h6 v-else>Global</h6>
                      </button>
                      <button
                        id="realStopBtn2"
                        class="hide"
                        @click="stopRecording"
                      ></button>
                      <button
                        class="recordBtn recording"
                        v-if="isRecording"
                        @click="stopRecord('2')"
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
                    <h5 v-if="helpShortcut">REC (7)</h5>
                    <h5 v-else>REC</h5>
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
                          :speaking="isThisOneSpeaking(person, 'rec')"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <b-row class="mb-3">
                  <b-col class="sm-4 channel rounded p-3" id="plan">
                    <h5 v-if="helpShortcut">PLAN (8)</h5>
                    <h5 v-else>PLAN</h5>
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
                          :speaking="isThisOneSpeaking(person, 'plan')"
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
                        id="realRecordBtn1"
                        class="hide"
                        v-if="true"
                        @click="startRecording"
                      ></button>
                      <button
                        v-cloak
                        @keyup.enter="startRecord('1')"
                        class="recordBtn"
                        v-if="!isRecording"
                        @click="startRecord('1')"
                      >
                        <h6 v-if="helpShortcut">ALl (keep Space pressed)</h6>
                        <h6 v-else>ALL</h6>
                      </button>
                      <button
                        id="realStopBtn1"
                        class="hide"
                        @click="stopRecording"
                      ></button>
                      <button
                        class="recordBtn recording"
                        v-if="isRecording"
                        @click="stopRecord('1')"
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
                    <h5 v-if="helpShortcut">CONTACT (9)</h5>
                    <h5 v-else>CONTACT</h5>
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
                          :speaking="isThisOneSpeaking(person, 'contact')"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-col>

              <b-col
                id="audiosCol"
                md="15"
                cols="3"
                class="rounded ml-auto p-2 audiosDiv"
              >
                <b-tabs>
                  <b-tab
                    v-for="room in roomsUserIsIn"
                    :key="room"
                    :title="room"
                  >
                    <vue-custom-scrollbar
                      class="scroll-area scrollingClass"
                      :settings="settings"
                      @ps-scroll-y="scrollHanle"
                      @ps-scroll-up="scrolling()"
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
                           <audio :id="audio.id+'media'" controls v-on:play="listenned(audio.id)">
                              <source :id="audio.id+'media_src'"
                                :src="audioList[audio.id]"
                                
                              />
                              Your browser does not support the audio tag.
                            </audio>
                          </div>
                        </div>
                      </div>
                    </vue-custom-scrollbar>
                    <input type="checkbox" id="checkbox" v-model="scrolled" />
                    <label for="checkbox"
                      >Automatic scrolldown: {{ scrolled }}</label
                    >
                  </b-tab>
                </b-tabs>
              </b-col>
            </b-row>
          </div>
        </b-tab>
        <!--#####################################COMMUNICATION PART ################################################################################### -->
        <b-tab id="comTab" title="Communication">
          <div id="comDiv">
            <b-row id="channelMenu">
              <b-col
                class="roomSelectorCol"
                v-for="(channel, index) in roomsList"
                :key="channel"
              >
                <button
                  v-if="!roomsListJoined.includes(channel)"
                  class="btn btn-primary roomSelector"
                  @click="addRoom(channel)"
                >
                  <h5 v-if="helpShortcut">
                    Join {{ channel }}
                    <h5>({{ index }})</h5>
                  </h5>
                  <h5 v-else>Join {{ channel }}</h5>
                </button>
                <button
                  v-if="roomsListJoined.includes(channel)"
                  class="btn btn-danger roomSelector"
                  @click="delRoom(channel)"
                >
                  <h5 v-if="helpShortcut">
                    Leave {{ channel }}
                    <h5>({{ index }})</h5>
                  </h5>
                  <h5 v-else>Leave {{ channel }}</h5>
                </button>
              </b-col>
            </b-row>
            <input type="checkbox" class="checkboxVideo" v-model="videoOn" />
            <label class="checkboxVideo" for="checkbox"
              >Video: {{ videoOn }}
            </label>
            <b-row id="videosRow">
              <b-col v-for="(channel, index) in roomsList" :key="index" :class="{'hide': !roomsListJoined.includes(channel)}">
                <WRTCRoom v-if="roomsListJoined.includes(channel)"  :roomName="channel" :videoOn="videoOn" />
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
import AudioService from '../services/AudioService'

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
import Notif from '../utils/Notif.js'

export default {
  data() {
    return {
      settings: {
        suppressScrollY: false,
        suppressScrollX: false,
        wheelPropagation: false,
      },
      helpShortcut: false,
      scrolled: true,
      userIsRecording: false,
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
      audioList: {},
      roomsList: [
        "Global",
        "Flight",
        "Base",
        "Science",
        "Cap",
        "Pro",
        "Bme",
        "Rec",
        "Plan",
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
    isThisOneSpeaking(person, roomName) {
      let speaking = this.rooms.find((x) => x.name === roomName).usersSpeaking;
      speaking = speaking.split(",");
      if (speaking.includes(person)) {
        return true;
      }
      return false;
    },
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
        console.log(this.roomsListJoined )
      }
    },
    delRoom(room) {
      if (this.roomsListJoined.includes(room)) {
        document.getElementById(room + "leave").click();
        this.roomsListJoined = this.arrayRemove(this.roomsListJoined, room);
      }
    },
    startRecord(ind) {
      this.userIsRecording = true;
      document.getElementById("realRecordBtn" + ind).click();
      for (var i = 0; i < this.roomsUserIsIn.length; ++i) {
        this.startSpeaking(this.roomsUserIsIn[i]);
      }
    },
    stopRecord(ind) {
      this.userIsRecording = false;
      document.getElementById("realStopBtn" + ind).click();
      for (var i = 0; i < this.roomsUserIsIn.length; ++i) {
        this.stopSpeaking(this.roomsUserIsIn[i]);
      }
    },
    stopSpeaking(roomName) {
      const editedRoom = { ...this.rooms.find((x) => x.name === roomName) };
      let speaking = this.rooms.find((x) => x.name === roomName).usersSpeaking;

      speaking = speaking.split(",");

      if (speaking.includes(this.firstName + ":" + this.lastName)) {
        speaking = this.arrayRemove(
          speaking,
          this.firstName + ":" + this.lastName
        );
      }
      editedRoom.usersSpeaking = speaking.join(",");
      this.$store.dispatch("communication/updateRoom", editedRoom);
    },
    startSpeaking(roomName) {
      const editedRoom = { ...this.rooms.find((x) => x.name === roomName) };
      let speaking = this.rooms.find((x) => x.name === roomName).usersSpeaking;

      speaking = speaking.split(",");

      if (!speaking.includes(this.firstName + ":" + this.lastName)) {
        speaking.push(this.firstName + ":" + this.lastName);
      }
      editedRoom.usersSpeaking = speaking.join(",");
      this.$store.dispatch("communication/updateRoom", editedRoom);
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
      const dateTime = date + "" + time + Math.round(Math.random() * 100);
      const id = dateTime + this.username;
      console.log(id);
      return id;
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    dlAudio(title) {
				AudioService.getAudio(title)
				.then(response => {

          const fileURL = URL.createObjectURL(response.data)
          console.log("downalasdfj" + fileURL)
          this.audioList[title]=fileURL
          document.getElementById(title+"media_src").src=fileURL;
          document.getElementById(title+"media").load();
          console.log("reloaded")
					return fileURL
				})
				.catch(() => {
					Notif.toastError(this, 'Could not find audio', 'Could not find audio you are looking for.')
				})
			},
    async onResult(data) {

        this.createdAudio.id = this.genId();
        this.createdAudio.user = this.firstName + ":" + this.lastName;
        this.createdAudio.rooms = this.roomsUserIsIn.join(",");
        this.createdAudio.seenBy = this.firstName + ":" + this.lastName;
        const myFile = new File([data.blob], "audio.mp3");

        this.createdAudio.audiofile = myFile;
        this.$store.dispatch("audio/createAudio", this.createdAudio);
      
    },
    onResultGlobal(data) {
      this.createdAudio.id = this.genId();
      this.createdAudio.user = this.firstName + ":" + this.lastName;
      this.createdAudio.rooms = "global";
      this.createdAudio.seenBy = this.firstName + ":" + this.lastName;
      const myFile = new File([data.blob], "audio.wav");

      this.createdAudio.audiofile = myFile;
      this.$store.dispatch("audio/createAudio", this.createdAudio);
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
    updateScroll() {
      var element = document.getElementsByClassName("scrollingClass");
      for (var i = 0; i < element.length; i++) {
        element[i].scrollTop = element[i].scrollHeight;
      }
    },
    scrolling() {
      this.scrolled = false;
    },
    updateAudioList(){
      for (var i=0; i<this.audios.length; i++){
        if(!(this.audios[i].id in this.audioList)){
          this.dlAudio(this.audios[i].id)
          
        }
      }


    },
    refresh() {
      this.$store.dispatch("communication/getRooms");
      this.$store.dispatch("audio/getAudios");
      this.updateAudioList();
      this.actualiseRooms();
      this.splitRooms = Object.assign({}, this.rooms);
      this.splitUsers();
      if (this.scrolled) {
        this.updateScroll();
      }
    },
    onDown(e) {
      if (
        document.getElementsByClassName("active")[0].id.slice(0, 9) ==
        "audiosTab"
      ) {
        if (e.key == " " && !this.userIsRecording) {
          this.startRecord("1");
        }
        if (e.key == "AltGraph" && !this.userIsRecording) {
          this.startRecord("2");
        }
      }



      if (
        document.getElementsByClassName("active")[0].id.slice(0, 6) == "comTab"
      ) {
        if (e.key == " ") {
          let openRooms = document.getElementsByClassName("unmute");
          for (var i = 0; i < openRooms.length; ++i) {
            openRooms[i].click();
          }
        }
      }
    },
    onUp(e) {
      if (
        document.getElementsByClassName("active")[0].id.slice(0, 9) ==
        "audiosTab"
      ) {
      if (e.key == " " && this.userIsRecording) {
        this.stopRecord("1");
      }
      if (e.key == "AltGraph" && this.userIsRecording) {
        this.stopRecord("2");
      }}


      if (
        document.getElementsByClassName("active")[0].id.slice(0, 6) == "comTab"
      ) {
        if (e.key == " ") {
          let openRooms = document.getElementsByClassName("mute");
          for (var i = 0; i < openRooms.length; ++i) {
            openRooms[i].click();
          }
        }
      }
    },
    addDel(room) {
      if (!this.roomsListJoined.includes(room)) {
        this.addRoom(room);
      } else {
        this.delRoom(room);
      }
    },
    addRemove(room) {
      if (!this.roomsUserIsIn.includes(room)) {
        this.addPresence(room);
      } else {
        this.removePresence(room);
      }
    },
    onPressed(e) {
      switch (e.key) {
        case "1":
          if (
            document.getElementsByClassName("active")[0].id.slice(0, 9) ==
            "audiosTab"
          ) {
            this.addRemove("flight");
          }
          if (
            document.getElementsByClassName("active")[0].id.slice(0, 6) ==
            "comTab"
          ) {
            this.addDel("Flight");
          }
          break;
        case "2":
          if (
            document.getElementsByClassName("active")[0].id.slice(0, 9) ==
            "audiosTab"
          ) {
            this.addRemove("base");
          }
          if (
            document.getElementsByClassName("active")[0].id.slice(0, 6) ==
            "comTab"
          ) {
            this.addDel("Base");
          }
          break;
        case "3":
          if (
            document.getElementsByClassName("active")[0].id.slice(0, 9) ==
            "audiosTab"
          ) {
            this.addRemove("science");
          }
          if (
            document.getElementsByClassName("active")[0].id.slice(0, 6) ==
            "comTab"
          ) {
            this.addDel("Science");
          }
          break;
        case "4":
          if (
            document.getElementsByClassName("active")[0].id.slice(0, 9) ==
            "audiosTab"
          ) {
            this.addRemove("cap");
          }
          if (
            document.getElementsByClassName("active")[0].id.slice(0, 6) ==
            "comTab"
          ) {
            this.addDel("Cap");
          }
          break;
        case "5":
          if (
            document.getElementsByClassName("active")[0].id.slice(0, 9) ==
            "audiosTab"
          ) {
            this.addRemove("pro");
          }
          if (
            document.getElementsByClassName("active")[0].id.slice(0, 6) ==
            "comTab"
          ) {
            this.addDel("Pro");
          }
          break;
        case "6":
          if (
            document.getElementsByClassName("active")[0].id.slice(0, 9) ==
            "audiosTab"
          ) {
            this.addRemove("bme");
          }
          if (
            document.getElementsByClassName("active")[0].id.slice(0, 6) ==
            "comTab"
          ) {
            this.addDel("Bme");
          }
          break;
        case "7":
          if (
            document.getElementsByClassName("active")[0].id.slice(0, 9) ==
            "audiosTab"
          ) {
            this.addRemove("rec");
          }
          if (
            document.getElementsByClassName("active")[0].id.slice(0, 6) ==
            "comTab"
          ) {
            this.addDel("Rec");
          }
          break;
        case "8":
          if (
            document.getElementsByClassName("active")[0].id.slice(0, 9) ==
            "audiosTab"
          ) {
            this.addRemove("plan");
          }
          if (
            document.getElementsByClassName("active")[0].id.slice(0, 6) ==
            "comTab"
          ) {
            this.addDel("Plan");
          }
          break;
        case "9":
          if (
            document.getElementsByClassName("active")[0].id.slice(0, 9) ==
            "audiosTab"
          ) {
            this.addRemove("contact");
          }
          if (
            document.getElementsByClassName("active")[0].id.slice(0, 6) ==
            "comTab"
          ) {
            this.addDel("Contact");
          }
          break;
        case "0":
          if (
            document.getElementsByClassName("active")[0].id.slice(0, 9) ==
            "audiosTab"
          ) {
            this.addRemove("global");
          }
          if (
            document.getElementsByClassName("active")[0].id.slice(0, 6) ==
            "comTab"
          ) {
            this.addDel("Global");
          }
          break;

        default:
      }
    },
  },
  created() {
    window.addEventListener("keydown", this.onDown);
    window.addEventListener("keyup", this.onUp);
    window.addEventListener("keypress", this.onPressed);

    setInterval(this.refresh, 1000);
  },
  mounted() {
    this.$store.dispatch("communication/getRooms");
  },
};
</script>
  

<style scoped>
.checkboxVideo {
  float: right;
}
.hide {
  display: none;
}
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
.helpShortcut {
  float: right;
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
  width: 95px;
}
.roomSelectorCol {
  width: 95px;
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
  height: 570px;

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
