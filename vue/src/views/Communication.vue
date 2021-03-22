<template>
  <div class="main-container">
    <h3>Communication:</h3>
    <!--   <button v-on:click="hello">call helllo</button>
<input type="file" accept="audio/*" capture>
<audio id="player" controls></audio> -->
    <b-container fluid="sm">
      <div id="channelContainer">
        <b-row>
          <b-col md="15" cols="9" class="rounded p-2">
            <b-row class="mb-3">
              <b-col md="5" class="rounded p-3 bg-info">
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

              <b-col md="5" class="rounded p-3 ml-auto bg-info">
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
              <b-col md="5" class="rounded p-3 bg-info">
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

              <b-col md="5" class="rounded p-3 ml-auto bg-info">
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
              <b-col md="5" class="rounded p-3 bg-info">
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
                <comBadge id="MA" :speaking="false" />
              </b-col>

              <b-col md="5" class="rounded p-3 ml-auto bg-info">
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
              <b-col md="5" class="rounded p-3 bg-info">
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

                <comBadge id="MA" :speaking="false" />
              </b-col>

              <b-col md="5" class="rounded p-3 ml-auto bg-info">
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
                    @click="addPresence()"
                    class="float-right btn btn-success"
                  >
                    In
                  </button>
                </div>
              </b-col>
            </b-row>
            <b-row class="text-center" align-v="center">
              <b-col>
                <VueRecord class="record" @result="onResult">
                  Record
                  <template slot="isInitiating">
                    Grant microphone permissions
                  </template>
                  <template slot="isRecording"> Recording </template>
                  <template slot="isCreating"> Creating Sound... </template>
                </VueRecord>
              </b-col>
            </b-row>
          </b-col>
          <b-col md="15" cols="3" class="rounded ml-auto p-2">
            <div id="audiosContainer"></div>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

  <script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import comBadge from "../components/CommunicationBadge.vue";
import VueRecord from "@loquiry/vue-record-audio";

export default {
  components: {
    VueRecord,
    comBadge,
  },
  computed: {
    ...mapState("user", [
      "permissions",
      "username",
      "firstName",
      "lastName",
      "groups",
    ]),
    ...mapGetters("user", ["permissionsReadable"]),
  },
  methods: {
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

    addPresence() {
      alert("enter");
    },
  },
  mounted() {},
};
</script>
  

<style scoped>
.record {
  width: 200px;
  height: 100px;
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
  width: 400px;
  padding: 45px;
  margin-left: 30px;
  height: 652px;
  border: 2px solid black;
  background-color: rgb(141, 204, 241);
}
</style>
