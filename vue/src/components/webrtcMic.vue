<template>

      <div :id="uuid+'callBoxId'" class="rounded row     callBox" >
        <div class="col-xs-2 btndiv">
  
            <button type="button" :id="uuid+'join2'" class="float-right btn btn-success" :class="roomName+'class2'" @click="join(roomName)">In</button>
            <button type="button" :id="uuid+'leave2'" class="float-right btn btn-danger hide" @click="onLeave">Out</button>
            <!--<button type="button" class="btn btn-primary" @click="onCapture">Capture Photo</button>-->
            <button type="button" v-if="!muted" :id="uuid+'mute'" class="btn btn-primary mutebtn hide" @click="mute()">Mute</button>
            <button type="button" v-if="muted" :id="uuid+'mute'" class="btn btn-primary mutebtn hide" @click="unmute()">Unmute</button>
        </div>
        <div class="col-xs-2">
          <vue-webrtc class="hide" :ref="uuid+roomName"
                      width="100%"
                      :roomId="uuid+roomName"
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
import WebRTC from './vue-webrtc.vue'
// ISSUE 5: https://github.com/westonsoftware/vue-webrtc/issues/5
import * as io from 'socket.io-client'
window.io = io
  Vue.component(WebRTC.name, WebRTC);
let uuid = 500;

export default {
    data: function() {
        return {
            muted: true
        }
    },
  beforeCreate() {
    this.uuid = uuid.toString();
    uuid += 1;
  },
 
  components: {
    
  },
        
	name: 'webrtcMic',
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
      mute(){
        this.muted=true;
        this.$refs[this.uuid+this.$props.roomName].muteMyself(false);
      },
      unmute(){
          this.muted=false;
        this.$refs[this.uuid+this.$props.roomName].muteMyself(true);
      },
      join() {
        document.getElementById(this.uuid+'join2').classList.remove('show');
        document.getElementById(this.uuid+'mute').classList.remove('hide');
        document.getElementById(this.uuid+'leave2').classList.remove('hide');
        document.getElementById(this.uuid+'leave2').classList.add('show');
        document.getElementById(this.uuid+'mute').classList.add('show');
        document.getElementById(this.uuid+'join2').classList.add('hide');
        this.$refs[this.uuid+this.$props.roomName].join();
        


      },
      onLeave() {

        document.getElementById(this.uuid+'leave2').classList.remove('show');
        document.getElementById(this.uuid+'mute').classList.remove('show');
        document.getElementById(this.uuid+'join2').classList.remove('hide');
        document.getElementById(this.uuid+'join2').classList.add('show');
        document.getElementById(this.uuid+'mute').classList.add('hide');
        document.getElementById(this.uuid+'leave2').classList.add('hide');
        this.$refs[this.uuid+this.$props.roomName].leave();

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
        width: 780px;
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