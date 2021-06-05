<!--
Audio room component
 -->
<template>
  <b-col :id="id" :class="[((empty)?'channelEmpty':'channel'),'sm-4  rounded p-3']">
    <h5  v-if="helpShortcut && id!='global'">{{ id.toUpperCase() }} ({{ number }})</h5>
    <h5 :class="[((id=='base')? 'baseHeader':'')]" v-if="!helpShortcut && id!='global'">{{ id.toUpperCase() }}</h5>
    <h4 align="center" v-if="helpShortcut && id=='global'">GLOBAL (0)</h4>
    <h4  v-if="!helpShortcut && id=='global'" align="center">GLOBAL</h4>
    <div :class="[((id=='global')? 'DoubleBtnGlobal' : 'DoubleBtn')]">
      <div v-if="!astronaut || id=='base'">
        <button
          type="button"
          @click="removePresence(id.toLowerCase())"
          class="float-right btn btnOut"
        >
          Out
        </button>
        <button
          type="button"
          @click="addPresence(id.toLowerCase())"
          :class="[((id=='global')? 'float-left': 'float-right'),' btn btnIn']"
        >
          In
        </button>
      </div>
    </div>

    <b-row class="badgesRow" v-if="id!='global'">
      <b-col
        class="badgesDiv"
        v-for="person in userList"
        :key="person"
      >
        <comBadge
          :color="computeColor(person)"
          :id="person"
          :speaking="isThisOneSpeaking(person, id.toLowerCase())"
        />
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import comBadge from "../components/CommunicationBadge.vue";
import { Colors } from "../utils/colors.js";
export default {
  data() {
    return {};
  },

  name: "room",
  props: {
    number: {
      type: Number,
      required: true,
    },
    id: { type: String, required: true },
    empty: { type: Boolean, required: true },
    userList: { type: Array, required: true },
    astronaut: { type: Boolean, required: true },
    helpShortcut: {type: Boolean, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},


    rooms: {type: Array, required: true},
  },

  components:{
    comBadge,
  },
  methods: {
      arrayRemove(arr, value) {
        console.log(this.empty)
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
        ascii(a) {
      /**
       *
       * @param {Blob}      a     a char.
       * @return {int}            returns the char code of a char.
       */
      return a.charCodeAt(0);
    },
    computeColor(s) {
      var score = s
        .split("")
        .map(this.ascii)
        .reduce((a, b) => a + b, 0);
      var k = Object.keys(Colors.names)[score % 42];
      return Colors.names[k];
    },
    isThisOneSpeaking(person, roomName) {
      /**
       * returns true if the the user is speaking in a given room
       *
       * @param {String}   person      User in a given room.
       * @param {String}   roomName    Name of the room.
       * @return {Boolean}             True if person is speaking in the room, else false.
       */
      let speaking = this.rooms.find((x) => x.name === roomName).usersSpeaking;
      speaking = speaking.split(",");
      if (speaking.includes(person)) {
        return true;
      }
      return false;
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
  },
 

  computed: {
    contourColor() {
      return {
        "border-radius": "20px",
        padding: "6px",
        width: "50px",
        height: "38px",
        "text-align": "center",
        border: `3px solid ${this.color}`,
      };
    },
  },
};
</script>
<style scoped>
.isSpeaking {
  background: red;
}
.hide {
  display: none;
}
.badgesDiv {
  width: 45px;
}
.badgesRow {
  width: 250px;
}
.contour:hover + .hide {
  display: block;
}
.contour {
  width: 90px;
}
.btn {
  color: white;
}
.channel {
  color: black;
  height: 150px;
  margin-left: 5px;
  margin-right: 5px;
  background-color: #c2c6c8;
}
.baseHeader {
  color: black;
  font-weight: bold;
}
.channelEmpty {

  height: 150px;
  margin-left: 5px;
  margin-right: 5px;
}
.btnIn {
  width: 52.89px;
  background-color: #0f55ca;
}
.btnOut {
  background-color: #ba2525;
}
.DoubleBtn {
  margin-left: 30px;
  width: 106px;
  height: 35px;
  float: right;
  margin-top: -40px;
}
.DoubleBtnGlobal {
  width: auto;;
  height: 35px;
  margin-top:50px;
}
#global {
  height: 100px;
}
</style>