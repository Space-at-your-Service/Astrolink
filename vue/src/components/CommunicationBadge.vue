<template>
        
      <div>
      <div class="contour" :class="{isSpeaking: speaking}" :style="contourColor" ><h6>{{firstName.slice(0,2).toUpperCase()+lastName.slice(0,1).toUpperCase()}}</h6></div>
      <div class="hide">{{firstName + ' ' + lastName}}</div>
      </div>
</template>

<script>
  import {Colors} from '../utils/colors.js';
	export default {
    
    data () { return {
      firstName : "",
      lastName : "",
      key:3,
      custumColor: {
        border: '2px solid '+Colors.names[this.key],
      }
    }

    },
		name: 'comBadge',
		props: {
            id: {type: String,
              name: String,
              required: true, },
            speaking: {type: Boolean,
              required: true,
              default: false, },
            color: {type: String,
              required: true,
               },
        },

  created(){

    let arrayName = this.id.split(':');
    this.firstName = arrayName[0];
    this.lastName = arrayName[1];
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
  background:#BA2525;
  
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