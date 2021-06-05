<template>
  <div class="main-container">
    <h3 class="section-title">
      Communication
      <b-button class="helpShortcut" @click="helpShortcut = !helpShortcut"
        >Shortcut help</b-button
      >
    </h3>

    <b-container fluid="sm">
      <b-tabs content-class="mt-3" fill>
        <b-tab id="audiosTab" title="Audios" active>
          <!--##################################### AUDIO PART ########################################################################################### -->

          <div id="channelContainer">
            <b-row>
              <b-col cols="9" class="rounded p-2">
                <b-row class="mb-3">
                  <room
                    id="base"
                    :rooms="rooms"
                    :firstName="firstName"
                    :lastName="lastName"
                    :empty="false"
                    :helpShortcut="helpShortcut"
                    :number="1"
                    :userList="userLists['base']"
                    :astronaut="isAstronaut"
                  />
                  <room
                    id="flight"
                    :rooms="rooms"
                    :firstName="firstName"
                    :lastName="lastName"
                    :empty="false"
                    :helpShortcut="helpShortcut"
                    :number="2"
                    :userList="userLists['flight']"
                    :astronaut="isAstronaut"
                  />
                  <room
                    id="cap"
                    :rooms="rooms"
                    :firstName="firstName"
                    :lastName="lastName"
                    :empty="false"
                    :helpShortcut="helpShortcut"
                    :number="3"
                    :userList="userLists['cap']"
                    :astronaut="isAstronaut"
                  />
                </b-row>
                <b-row class="mb-3">
                  <room
                    id="plan"
                    :rooms="rooms"
                    :firstName="firstName"
                    :lastName="lastName"
                    :empty="false"
                    :helpShortcut="helpShortcut"
                    :number="4"
                    :userList="userLists['plan']"
                    :astronaut="isAstronaut"
                  />
                  <room
                    id="global"
                    :rooms="rooms"
                    :firstName="firstName"
                    :lastName="lastName"
                    :empty="true"
                    :helpShortcut="helpShortcut"
                    :number="0"
                    :userList="userLists['global']"
                    :astronaut="isAstronaut"
                  />
                  <room
                    id="science"
                    :rooms="rooms"
                    :firstName="firstName"
                    :lastName="lastName"
                    :empty="false"
                    :helpShortcut="helpShortcut"
                    :number="5"
                    :userList="userLists['science']"
                    :astronaut="isAstronaut"
                  />
                </b-row>
                <b-row class="mb-3">
                  <room
                    id="pro"
                    :rooms="rooms"
                    :firstName="firstName"
                    :lastName="lastName"
                    :empty="false"
                    :helpShortcut="helpShortcut"
                    :number="6"
                    :userList="userLists['pro']"
                    :astronaut="isAstronaut"
                  />

                  <b-col v-if="!isAstronaut" class="sm-4 channelEmpty rounded p-3 text-center">
                    <vue-dictaphone
                      @stop="onResult($event, (isGlobal = true))"
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
                        <h4 v-if="helpShortcut">Global (keep AltGR pressed)</h4>
                        <h4 v-else>Global</h4>
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
                  <b-col v-else class="sm-4 channelEmpty rounded p-3 text-center"></b-col>

                  <room
                    id="rec"
                    :rooms="rooms"
                    :firstName="firstName"
                    :lastName="lastName"
                    :empty="false"
                    :helpShortcut="helpShortcut"
                    :number="7"
                    :userList="userLists['rec']"
                    :astronaut="isAstronaut"
                  />
                </b-row>
                <b-row class="mb-3">
                  <room
                    id="bme"
                    :rooms="rooms"
                    :firstName="firstName"
                    :lastName="lastName"
                    :empty="false"
                    :helpShortcut="helpShortcut"
                    :number="8"
                    :userList="userLists['bme']"
                    :astronaut="isAstronaut"
                  />

                  <b-col
                    class="sm-4 channelEmpty rounded p-3 text-center"
                    align-v="center"
                  >
                    <vue-dictaphone
                      @stop="onResult($event, (isGlobal = false))"
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
                        <h4 v-if="helpShortcut">ALl (keep Space pressed)</h4>
                        <h4 v-else>ALL</h4>
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
                  <room
                    id="contact"
                    :rooms="rooms"
                    :firstName="firstName"
                    :lastName="lastName"
                    :empty="false"
                    :helpShortcut="helpShortcut"
                    :number="9"
                    :userList="userLists['contact']"
                    :astronaut="isAstronaut"
                  />
                </b-row>
              </b-col>

              <b-col
                id="audiosCol"
                md="15"
                cols="3"
                class="rounded ml-auto p-2"
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
                      @ps-scroll-up="scrolled = false"
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
                              style="color: white"
                            >
                              <img
                                class="vu"
                                src="../../public/vu.png"
                                width="12.77"
                                height="15"
                            /></i>
                            <audio
                              :class="audio.id + 'media'"
                              controls
                              v-on:play="listenned(audio.id)"
                            >
                              <source
                                :class="audio.id + 'media_src'"
                                :src="audioList[audio.id]"
                              />
                              Your browser does not support the audio tag.
                            </audio>
                          </div>
                        </div>
                      </div>
                    </vue-custom-scrollbar>
                    <button
                      v-if="scrolled"
                      @click="scrolled = !scrolled"
                      type="button"
                      class="btn btnScroll btn-secondary"
                    >
                      Automatic scrolldown ON
                    </button>
                    <button
                      v-else
                      @click="scrolled = !scrolled"
                      type="button"
                      class="btn btnScroll btn-secondary"
                    >
                      Automatic scrolldown OFF
                    </button>
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
                  v-if="!commRoomsJoined.includes(channel)"
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
                  v-if="commRoomsJoined.includes(channel)"
                  class="btn btn-danger roomSelectorLeave"
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
            <button
              v-if="videoOn"
              @click="videoOn = !videoOn"
              type="button"
              class="btn checkboxVideo btn-secondary"
            >
              Video ON
            </button>
            <button
              v-else
              @click="videoOn = !videoOn"
              type="button"
              class="btn checkboxVideo btn-secondary"
            >
              Video OFF
            </button>

            <b-row id="videosRow">
              <b-col
                v-for="(channel, index) in roomsList"
                :key="index"
                :class="{ hide: !commRoomsJoined.includes(channel) }"
              >
                <WRTCRoom
                  v-if="commRoomsJoined.includes(channel)"
                  :roomName="channel"
                  :videoOn="videoOn"
                />
                <hr />
              </b-col>
            </b-row>
          </div>
        </b-tab>
      </b-tabs>
    </b-container>
  </div>
</template>
<script>
import AudioService from "../services/AudioService";
import Vue from "vue";
import VueDictaphone from "vue-dictaphone";
Vue.use(VueDictaphone);
import WRTCRoom from "../components/WRTCRoom.vue";
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import room from "../components/Room.vue";
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
      helpShortcut: false,
      scrolled: true,
      userIsRecording: false,
      videoOn: true,
      roomsUserIsIn: [],
      createdAudio: new Audio(),
      speaking: false,
      isAstronaut: false,
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
        "Base",
        "Flight",
        "Cap",
        "Plan",
        "Science",
        "Pro",
        "Rec",
        "Bme",
        "Contact",
      ],
      commRoomsJoined: [],
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
    room,
  },

  methods: {
    scrollHanle() {},

    listenned(id) {
      /**
       * Triggered when the user listens to an audio.
       * Checks if a given audio has been listenned by user. If not, send the modifying request to
       * add the user to the seenBy field of the audio.
       *
       * @param {String}   id          Id of the audio
       */
      let editedAudio = { ...this.audios.find((x) => x.id === id) };
      let listennedByUsers = this.audios.find((x) => x.id === id).seenBy;
      listennedByUsers = listennedByUsers.split(",");

      if (!listennedByUsers.includes(this.firstName + ":" + this.lastName)) {
        listennedByUsers.push(this.firstName + ":" + this.lastName);
      }
      editedAudio.seenBy = listennedByUsers.join(",");
      this.$store.dispatch("audio/updateAudio", editedAudio);
    },

    toReadable(timestamp) {
      /**
       * Returns the timestamp in a more readable format.
       *
       * @param {String}   timestamp   Timestamp of an audio.
       * @return {String}              Returns new readable timestamp.
       */
      if (timestamp == undefined) {
        return "";
      }
      var news = timestamp.slice(5, 19).replace("T", " ");
      return news;
    },

    onScroll(event) {
      console.log(this.$refs.scrollbar.ps, event);
    },
    addRoom(room) {
      /**
       * Add a room to the communication rooms joined list.
       *
       * @param {String}   room        room to add to the commRoomsJoined list.
       */
      if (!this.commRoomsJoined.includes(room)) {
        this.commRoomsJoined.push(room);
      }
    },
    delRoom(room) {
      /**
       * Delete a room from the communication rooms joined list.
       *
       * @param {String}   room        room to delete from the commRoomsJoined list.
       */
      if (this.commRoomsJoined.includes(room)) {
        document.getElementById(room + "leave").click();
        this.commRoomsJoined = this.arrayRemove(this.commRoomsJoined, room);
      }
    },
    startRecord(ind) {
      /**
       * Triggered when user starts speaking.
       *
       * @param {String}   ind        button index (1 for global 2 for All).
       */
      this.userIsRecording = true;
      document.getElementById("realRecordBtn" + ind).click();
      for (var i = 0; i < this.roomsUserIsIn.length; ++i) {
        this.startSpeaking(this.roomsUserIsIn[i]);
      }
    },
    stopRecord(ind) {
      /**
       * Triggered when user stops speaking.
       *
       * @param {String}   ind        button index (1 for global 2 for All).
       */
      this.userIsRecording = false;
      document.getElementById("realStopBtn" + ind).click();
      for (var i = 0; i < this.roomsUserIsIn.length; ++i) {
        this.stopSpeaking(this.roomsUserIsIn[i]);
      }
    },
    stopSpeaking(roomName) {
      /**
       * Triggered when user stops speaking. This function will update the usersspeaking field of a given room.
       *
       * @param {String}   roomName    name of the room where user should appear as non-speaking.
       */
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
      /**
       * Triggered when user starts speaking. This function will update the usersspeaking field of a given room.
       *
       * @param {String}   roomName    name of the room where user should appear as speaking.
       */
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
      console.log(blob);
      this.audioSource = src;
    },
    genId() {
      /**
       * This funtion will generate an id for an audio. The id will be the date/hour/minutes/seconds/milliseconds/username
       * concatenated.
       *
       * @return {String} id for the audio
       */
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
        current.getSeconds() +
        "" +
        current.getMilliseconds();
      const dateTime = date + "" + time;
      const id = dateTime + this.username;
      return id;
    },

    dlAudio(title) {
      /**
       * This function will download an audio from the backend server using a GET request.
       *
       * @param {String}   title    title of the audio to get.
       * @return {Blob}             returns an mp3 audio blob.
       */
      AudioService.getAudio(title)
        .then((response) => {
          const fileURL = URL.createObjectURL(response.data);
          this.audioList[title] = fileURL;
          for (
            var i = 0;
            i < document.getElementsByClassName(title + "media").length;
            ++i
          ) {
            document.getElementsByClassName(title + "media_src")[
              i
            ].src = fileURL;
            document.getElementsByClassName(title + "media")[i].load();
          }

          return fileURL;
        })
        .catch(() => {});
    },
    async onResult(data, globalRoom) {
      /**
       * This function is triggered when a user stops recording. It will send the audio to the backend server.
       *
       * @param {Blob}      data          audio blob.
       * @param {Boolean}   globalRoom    true if record button was the global room button.
       */
      this.createdAudio.id = this.genId();
      this.createdAudio.user = this.firstName + ":" + this.lastName;
      if (globalRoom) {
        this.createdAudio.rooms = "global";
      } else {
        this.createdAudio.rooms = this.roomsUserIsIn.join(",");
      }
      this.createdAudio.seenBy = this.firstName + ":" + this.lastName;
      const myFile = new File([data.blob], "audio.mp3");

      this.createdAudio.audiofile = myFile;
      this.$store.dispatch("audio/createAudio", this.createdAudio);
    },

    splitUsers() {
      /**
       * This function will update the users list 'userList' in every room at each refresh function call.
       *
       */
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
      /**
       * Removes the value value from the array arr
       *
       * @param   {Array}    arr       array to delete a value from.
       * @param   {String}   value     value to delete from an array.
       * @return  {Array}              resulting array
       */
      return arr.filter(function (e) {
        return e != value;
      });
    },

    addPresence(roomName) {
      /**
       * add user presence in a given room by sending a PUT request.
       *
       * @param   {String}   roomName  room
       */
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
      /**
       * removes user presence in a given room by sending a PUT request.
       *
       * @param   {String}   roomName  room
       */
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
    refreshRooms() {
      /**
       * Refreshes the list containing all the rooms the user has joined.
       *
       */
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
      /**
       * if the automatic scrolldown is selected, will scroll down every scrollbar.
       *
       */
      var element = document.getElementsByClassName("scrollingClass");
      for (var i = 0; i < element.length; i++) {
        element[i].scrollTop = element[i].scrollHeight;
      }
    },

    updateAudioList() {
      /**
       * update the audio list by downloading the audios that haven't been dowloaded.
       *
       */
      for (var i = 0; i < this.audios.length; i++) {
        if (!(this.audios[i].id in this.audioList)) {
          this.dlAudio(this.audios[i].id);
        }
      }
    },
    refresh() {
      /**
       * Refresh function, actualise all the userlists in rooms, the rooms user are in, the audios and the scrollbars scrolldown.
       */
      this.$store.dispatch("communication/getRooms");
      this.$store.dispatch("audio/getAudios");
      this.updateAudioList();
      this.refreshRooms();
      this.splitRooms = Object.assign({}, this.rooms);
      this.splitUsers();
      if (this.scrolled) {
        this.updateScroll();
      }
    },
    onDown(e) {
      /**
       * When user presses a given key, launches a function.
       *
       * @param   {Object}   e  key that has been pressed
       */
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
      /**
       * When user releases a given key, launches a function.
       *
       * @param   {Object}   e  key that has been pressed
       */
      if (
        document.getElementsByClassName("active")[0].id.slice(0, 9) ==
        "audiosTab"
      ) {
        if (e.key == " " && this.userIsRecording) {
          this.stopRecord("1");
        }
        if (e.key == "AltGraph" && this.userIsRecording) {
          this.stopRecord("2");
        }
      }

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
      /**
       * If user has joined a live communication room, it will remove him, and inversively.
       *
       * @param   {String}   room  room to join/leave
       */
      if (!this.commRoomsJoined.includes(room)) {
        this.addRoom(room);
      } else {
        this.delRoom(room);
      }
    },
    leaving() {
      /**
       * This function is launched whenever the user leaves the page without quitting all rooms.
       * It will make the user leave all the rooms in the communication and audio tab.
       */
      var length = this.commRoomsJoined.length;
      for (let i = 0; i < this.roomsUserIsIn.length; i++) {
        this.removePresence(this.roomsUserIsIn[i]);
      }
      for (let i = 0; i < length; i++) {
        this.delRoom(this.commRoomsJoined[0]);
      }
    },
    addRemove(room) {
      /**
       * If user has joined a audio room, it will remove him, and inversively.
       *
       * @param   {String}   room  room to join/leave
       */
      if (!this.roomsUserIsIn.includes(room)) {
        this.addPresence(room);
      } else {
        this.removePresence(room);
      }
    },
    onPressed(e) {
      /**
       * If user presses a key, he will join/leave a room depending which tab he is using.
       *
       * @param   {Object}  e  key pressed
       */
      if (
        document.getElementsByClassName("active")[0].id.slice(0, 9) ==
        "audiosTab"
      ) {
        switch (e.key) {
          case "1":
            this.addRemove("base");
            break;

          case "2":
            this.addRemove("flight");
            break;

          case "3":
            this.addRemove("cap");
            break;

          case "4":
            this.addRemove("plan");
            break;

          case "5":
            this.addRemove("science");
            break;

          case "6":
            this.addRemove("pro");
            break;

          case "7":
            this.addRemove("rec");
            break;

          case "8":
            this.addRemove("bme");
            break;

          case "9":
            this.addRemove("contact");
            break;

          case "0":
            this.addRemove("global");
            break;
        }
      }
      if (
        document.getElementsByClassName("active")[0].id.slice(0, 6) == "comTab"
      ) {
        switch (e.key) {
          case "1":
            this.addDel("Base");
            break;
          case "2":
            this.addDel("Flight");
            break;

          case "3":
            this.addDel("Cap");
            break;

          case "4":
            this.addDel("Plan");
            break;

          case "5":
            this.addDel("Science");
            break;

          case "6":
            this.addDel("Pro");
            break;

          case "7":
            this.addDel("Rec");
            break;

          case "8":
            this.addDel("Bme");
            break;

          case "9":
            this.addDel("Contact");
            break;

          case "0":
            this.addDel("Global");
            break;
        }
      }
    },
  },

  beforeRouteLeave(to, from, next) {
    /**
     * If user leaves the page without quitting the rooms, triggers a warning.
     */
    var answer = true;
    if (this.commRoomsJoined.length > 0 || this.roomsUserIsIn.length > 0) {
      answer = window.confirm("Do you really want to leave all rooms ?");
    }

    if (answer) {
      this.leaving();
      next();
    } else {
      next(false);
    }
  },
  created() {
    window.addEventListener("keydown", this.onDown);
    window.addEventListener("keyup", this.onUp);
    window.addEventListener("keypress", this.onPressed);

    setInterval(this.refresh, 1000);
  },

  mounted() {
    this.$store.dispatch("communication/getRooms");
    for(var i=0;i<this.groups.length;++i){
      if(this.groups[i].unit=='Astronauts'){
        this.isAstronaut=true;
      }
    }
  },
};
</script>
  

<style scoped>
.checkboxVideo {
  margin: 5px;
  float: right;
}
.btnScroll {
  background-color: #a1a7ac;
  margin-top: 2px;
  margin-right: 6px;
  float: right;
}
.hide {
  display: none;
}
.scroll-area {
  position: relative;
  margin: auto;
  width: 600px;
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
  background: #ba2525;
}

.helpShortcut {
  float: right;
  background-color: #0f55ca;
}

#audiosContainer {
  height: 12px;
}
.vu {
  margin-left: 5px;
}
.roomSelector {
  background-color: #0f55ca;
  width: 95px;
}
.roomSelectorLeave {
  background-color: #ba2525;
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
  background-color: rgb(88, 88, 100);
  margin-top: 30px;
  border-radius: 30px;
  padding: 10px;
}
.btn {
  color: white;
}
.ps {
  width: 320px;
  padding: 10px;
  height: 570px;

  border-radius: 30px;
}
#audiosCol {
  width: 50px;
}

#comDiv {
  background-color: #c2c6c8;
  padding-bottom: 20px;
  height: auto;
  border-radius: 30px;
}
.channelEmpty {
  height: 150px;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
