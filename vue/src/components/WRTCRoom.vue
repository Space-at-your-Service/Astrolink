<template>

      <div :id="uuid+'callBoxId'" class="rounded row     callBox" >
        <div class="col-xs-2 btndiv">
  
            <button type="button" :id="uuid+'join'" class="btn btn-primary show joinbtn" :class="roomName+'class'" @click="join(roomName)">Join <h3>{{roomName}}</h3></button>
            <button type="button" :id="uuid+'leave'" class="btn btn-primary leavebtn hide" @click="onLeave">Leave <h3>{{roomName}}</h3></button>
            <!--<button type="button" class="btn btn-primary" @click="onCapture">Capture Photo</button>-->
            <button type="button" :id="uuid+'share'" class="btn btn-primary sharebtn hide" @click="onShareScreen">Share Screen</button>

        </div>
        <div class="col-xs-2">
          <vue-webrtc :ref="uuid+roomName"
                      width="100%"
                      :roomId="roomName"
                      socketURL="https://rtcmulticonnection.herokuapp.com:443/"
                      :enableVideo="false"
                      v-on:joined-room="logEvent"
                      v-on:left-room="logEvent"
                      v-on:opened-room="logEvent"
                      v-on:share-started="logEvent"
                      v-on:share-stopped="logEvent"
                      @error="onError" />
         
        </div>

      </div>
</template>
<script>
import Vue from 'vue'
import WebRTC from 'vue-webrtc'
// ISSUE 5: https://github.com/westonsoftware/vue-webrtc/issues/5
import * as io from 'socket.io-client'
window.io = io
Vue.use(WebRTC);

let uuid = 0;

export default {
  beforeCreate() {
    this.uuid = uuid.toString();
    uuid += 1;
  },
 

        
	name: 'WRTCRoom',
	props: {
    roomName: {
    type: String,
    required: true
  }
},
methods: {

      onCapture() {

        this.img =  this.$refs[this.uuid+this.$props.roomName].capture();
      },
      join() {
        document.getElementById(this.uuid+'callBoxId').style.width = "1200px";
        document.getElementById(this.uuid+'join').classList.remove('show');
        document.getElementById(this.uuid+'share').classList.remove('hide');
        document.getElementById(this.uuid+'leave').classList.remove('hide');
        document.getElementById(this.uuid+'leave').classList.add('show');
        document.getElementById(this.uuid+'share').classList.add('show');
        document.getElementById(this.uuid+'join').classList.add('hide');
        this.$refs[this.uuid+this.$props.roomName].join();
      },
      onLeave() {

        document.getElementById(this.uuid+'leave').classList.remove('show');
        document.getElementById(this.uuid+'share').classList.remove('show');
        document.getElementById(this.uuid+'join').classList.remove('hide');
        document.getElementById(this.uuid+'join').classList.add('show');
        document.getElementById(this.uuid+'share').classList.add('hide');
        document.getElementById(this.uuid+'leave').classList.add('hide');
        this.$refs[this.uuid+this.$props.roomName].leave();
        document.getElementById(this.uuid+'callBoxId').style.width = "200px";

      },
      onShareScreen() {
          
        this.img =   this.$refs[this.uuid+this.$props.roomName].shareScreen();
      },
      onError(error, stream) {
        console.log('On Error Event', error, stream);
      },
      logEvent(event) {
        console.log('Event : ', event);
      },
        
},
mounted(){
}
}
</script>
<style scoped>
.btndiv{
    margin-right: 40px;
}
    .callBox {
        width: 200px;
        border-radius: 30px;
    }
    .joinbtn{
        width: 140px;;
        height: 140px;
        margin-top: 10px;
        margin-left: 20px;
        margin-right: 20px;
        border-radius: 30px;
        margin-bottom: 10px;
    }
        .leavebtn{
        background-color: rgba(255, 0, 0, 0.698);
        width: 140px;;
        height: 100px;
        margin-left: 20px;
        margin-top: 10px;
        margin-bottom: 2px;
        border-radius: 15px;
    }
            .sharebtn{
        width: 140px;;
        height: 38px;
        margin-left: 20px;
        border-radius: 10px;
    }
    .hide{
display:none;
}

.show{
display:block;
}
</style>