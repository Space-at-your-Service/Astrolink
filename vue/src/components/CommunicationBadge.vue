<template>
        
      
      <div id="contour" :style="contourColor" ><h6>{{firstName.slice(0,1).toUpperCase()+lastName.slice(0,1).toUpperCase()}}</h6></div>
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
        'width': '35px',
        'height': '38px',
        'text-align':'center',
        "border": `2px solid ${this.color}`,
      };
    }
  }

  
  }
</script>
<style scoped>
#contour {

  
}


</style>