<template>
  <div class="main-container">
    <h3 class="section-title">Communication</h3>
    <!--   <button v-on:click="hello">call helllo</button>
<input type="file" accept="audio/*" capture>
<audio id="player" controls></audio> -->
    <b-container fluid="sm">
      <div id="channelContainer">
        <b-row>
          <b-col cols="9" class="rounded p-2">
            <b-row class="mb-3">
              <b-col class="sm-4 rounded p-3 bg-info">
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
              <b-col class="sm-4 rounded p-3 bg-info">
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
              <b-col class="sm-4 rounded p-3 ml-auto bg-info">
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
              <b-col class="sm-4 rounded p-3 bg-info">
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
              <b-col></b-col>
              <b-col class="sm-4 col-sm-offset-4 rounded p-3 ml-auto bg-info">
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
              <b-col class="sm-4 rounded p-3 bg-info">
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
              <b-col></b-col>
              <b-col class="sm-4 col-sm-offset-4 rounded p-3 bg-info">
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
              <b-col class="sm-4 rounded p-3 bg-info">
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
              <b-col class="text-center" align-v="center">
                <VueRecord class="record" @result="onResult">
                  Record
                  <template slot="isInitiating">
                    Grant microphone permissions
                  </template>
                  <template slot="isRecording"> Recording </template>
                  <template slot="isCreating"> Creating Sound... </template>
                </VueRecord>
              </b-col>
              <b-col class="sm-4 rounded p-3 ml-auto bg-info">
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
          </b-col>
          <b-col md="15" cols="3" class="rounded ml-auto p-2">
            <perfect-scrollbar @ps-scroll-y="onScroll" ref="scrollbar">
              <div id="audiosContainer"></div>
            </perfect-scrollbar>
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
import { PerfectScrollbar } from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";
export default {
  data() {
    return {
      rooms_: [
        { key: "name", label: "Room name", sortable: true },
        { key: "users", label: "user list", sortable: false },
      ],
      sortBy: "name",
      hideEmpty: false,
      transProps: {
        name: "flip-list",
      },
      selected: [],
      isBusy: false,
      editedItem: { name: "", users: "" },
    };
  },
  computed: {
    ...mapState("communication", ["rooms"]),
    ...mapGetters("user", ["isAllowed"]),
    sortOptions() {
      return this.rooms_
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  components: {
    VueRecord,
    PerfectScrollbar,
    comBadge,
  },

  methods: {
    onScroll(event) {
      console.log(this.$refs.scrollbar.ps, event);
    },
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
  width: 230px;
  height: 150px;
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
</style>
