<template>
  <div :id="uuid + 'callBoxId'" class="rounded row callBox">
    <div class="col-xs-2 btndiv">
      <div class="title">
        <h1>{{ roomName }}</h1>
      </div>
      <button
        type="button"
        :id="roomName + 'join'"
        class="btn btn-primary hide joinbtn"
        :class="roomName + 'class'"
        @click="join()"
      >
        Join
        <h3>{{ roomName }}</h3>
      </button>
      <button
        type="button"
        :id="roomName + 'leave'"
        class="btn btn-primary leavebtn hide"
        @click="onLeave"
      >
        Leave
        <h3>{{ roomName }}</h3>
      </button>
      <button
        type="button"
        v-if="muted"
        :id="roomName + 'unmute'"
        class="btn btn-primary mutebtn unmute"
        @click="mute()"
      >
        <h3><img src="../../public/muted.png" width="80" height="80"></h3>
      </button>
      <button
        type="button"
        v-if="!muted"
        :id="roomName + 'mute'"
        class="btn btn-primary mutebtn mute"
        @click="mute()"
      >
        <h3><img src="../../public/notMuted.png" width="80" height="80"></h3>
      </button>

    </div>
    <div class="col-xs-2">
      <vue-webrtc
        :ref="uuid + roomName"
        width="100%"
        :roomId="roomName"
        socketURL="https://rtcmulticonnection.herokuapp.com:443/"
        stunServer='stun:stun.astrolink.earth:3478'
        turnServer='AsclepiosTurn@lQ18dWYmVYBqF^C0P6K%turn:turn.astrolink.earth:3478'
        :enableVideo="videoOn"
        v-on:joined-room="logEvent"
        v-on:left-room="logEvent"
        v-on:opened-room="logEvent"
        v-on:share-started="logEvent"
        v-on:share-stopped="logEvent"
        @error="onError"
      />
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import WebRTC from "../components/vue-webrtc.vue";
// ISSUE 5: https://github.com/westonsoftware/vue-webrtc/issues/5
import * as io from "socket.io-client";
window.io = io;
Vue.component(WebRTC.name, WebRTC);

let uuid = 0;

export default {
  data() {
    return {
      muted: false,
    };
  },
  beforeCreate() {
    this.uuid = uuid.toString();
    uuid += 1;
  },

  name: "WRTCRoom",
  props: {
    roomName: {
      type: String,
      required: true,
    },
    videoOn: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    onCapture() {
      this.img = this.$refs[this.uuid + this.$props.roomName].capture();
    },
    mute() {
      this.muted = this.$refs[this.uuid + this.$props.roomName].muteMyself(
        this.muted
      );
    },
    join() {
      this.muted = false;
      this.$refs[this.uuid + this.$props.roomName].join();
    },
    onLeave() {
      this.$refs[this.uuid + this.$props.roomName].leave();
    },
    onShareScreen() {
      this.img = this.$refs[this.uuid + this.$props.roomName].shareScreen();
    },
    onError(error, stream) {
      console.log("On Error Event", error, stream);
    },
    logEvent(event) {
      console.log("Event : ", event);
    },
  },
  mounted() {
    this.join();
  },
  created() {},
};
</script>
<style scoped>
.title {
  margin-left: 20px;
}
.btndiv {
  margin-right: 60px;
}
.callBox {
  width: 200px;
  border-radius: 30px;
  width: 780px;
}
.mutebtn {
  width: 140px;
  height: 100px;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 30px;
  margin-bottom: 10px;
}

.leavebtn {
  display: none;
  background-color: rgba(255, 0, 0, 0.698);
  width: 140px;
  height: 100px;
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 2px;
  border-radius: 15px;
}
.sharebtn {
  width: 140px;
  height: 38px;
  margin-left: 20px;
  border-radius: 10px;
}
.hide {
  display: none;
}

.show {
  display: block;
}
</style>