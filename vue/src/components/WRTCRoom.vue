<template>

      <div id="callBoxId" class="rounded  callBox" >
        <b-col class="col-md-3">
  
            <button type="button" id="joinbn" class="btn btn-primary show joinbtn" :class="roomName+'class'" @click="join(roomName)">Join {{roomName}}</button>
            <button type="button" id="leavebn" class="btn btn-primary hide" @click="onLeave">Leave</button>
            <!--<button type="button" class="btn btn-primary" @click="onCapture">Capture Photo</button>-->
            <button type="button" id="sharebn" class="btn btn-primary hide" @click="onShareScreen">Share Screen</button>

        </b-col>
        <b-col class="col-md-5">
          <vue-webrtc :ref="roomName"
                      width="10%"
                      :roomId="roomName"
                      socketURL="https://rtcmulticonnection.herokuapp.com:443/"
                      :enableVideo="false"
                      v-on:joined-room="logEvent"
                      v-on:left-room="logEvent"
                      v-on:opened-room="logEvent"
                      v-on:share-started="logEvent"
                      v-on:share-stopped="logEvent"
                      @error="onError" />
         
        </b-col>

      </div>
</template>
<script>
import Vue from 'vue'
import WebRTC from 'vue-webrtc'
// ISSUE 5: https://github.com/westonsoftware/vue-webrtc/issues/5
import * as io from 'socket.io-client'
window.io = io
Vue.use(WebRTC);
	export default {
 

        
		name: 'WRTCRoom',
	props: {
    roomName: {
    type: String,
    required: true
  }
},
methods: {

      onCapture() {

        this.img =  this.$refs[this.$props.roomName].capture();
      },
      join() {
          document.getElementById("callBoxId").style.width = "1200px";
        document.getElementById('leavebn').classList.remove('hide');
        document.getElementById('sharebn').classList.remove('hide');
        document.getElementById('joinbn').classList.remove('show');
        document.getElementById('leavebn').classList.add('show');
        document.getElementById('sharebn').classList.add('show');
        document.getElementById('joinbn').classList.add('hide');
        this.$refs[this.$props.roomName].join();
      },
      onLeave() {
        document.getElementById("callBoxId").style.width = "200px";

        document.getElementById('leavebn').classList.remove('show');
        document.getElementById('sharebn').classList.remove('show');
        document.getElementById('joinbn').classList.remove('hide');
        document.getElementById('joinbn').classList.add('show');
        document.getElementById('sharebn').classList.add('hide');
        document.getElementById('leavebn').classList.add('hide');
                this.$refs[this.$props.roomName].leave();
      },
      onShareScreen() {
          
        this.img =   this.$refs[this.$props.roomName].shareScreen();
      },
      onError(error, stream) {
        console.log('On Error Event', error, stream);
      },
      logEvent(event) {
        console.log('Event : ', event);
      },
        }
	};
</script>
<style scoped>
    .callBox {
        border: 2px solid black;
        width: 200px;
        background-color: #F5F5F5;
        border-radius: 30px;
    }
    .joinbtn{
        width: 140px;;
        height: 140px;
        padding: 40px;
        border-radius: 30px;;
    }
    .hide{
display:none;
}

.show{
display:block;
}
</style>