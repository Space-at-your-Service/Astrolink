<template>
                  <b-col :id="id" class="sm-4 channel rounded p-3">
                    <h3 v-if="helpShortcut">{{id.toUpperCase()}} ({{number}})</h3>
                    <h3 v-else>{{id.toUpperCase()}}</h3>
                    <div
                      class="DoubleBtn"
                      v-for="group in groups"
                      :key="group.role"
                    >
                      <div >
                        <button
                          type="button"
                          @click="removePresence('base')"
                          class="float-right btn btn-danger"
                        >
                          <!-- :class={: 'float-right'} -->
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
</template>

<script>
	export default {
    
    data () { return {
      
      }
    },

    
		name: 'room',
		props: {
            number:{
                type: Number,
                required: true,
            },
            id: {type: String,
              name: String,
              required: true, },
            empty: {type: boolean,
              required: true,
               },
            userlists: {type: List,
              required: true,
               },
            groups: {type: List}
        },
  methods:  {
    computeColor(s) {
      var score = s
        .split("")
        .map(this.ascii)
        .reduce((a, b) => a + b, 0);
      var k = Object.keys(Colors.names)[score % 42];
      return Colors.names[k];
    },
    
    
  },
  created(){


      },

  computed: {
    contourColor() {
      return {
        'border-radius': '20px',
        'padding': '6px',
        'width': '50px',
        'height': '38px',
        'text-align':'center',
        "border": `3px solid ${this.color}`,
      };
    }
  }

  
  }
</script>
<style scoped>
.isSpeaking {
  background:red;
  
}
.hide {
  display: none;
}

.contour:hover + .hide {
  display: block;
  
}
.contour{
  width: 90px;
}


</style>