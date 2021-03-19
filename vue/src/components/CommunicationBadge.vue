<template>
        <b-col md="4" class="rounded p-3  bg-info">
      
      <div id="contour"><h3>{{id}}</h3></div>
    </b-col>
</template>

<script>
	export default {
		name: 'comBadge',
		props: {
            id: {type: String,
            name: String,
            required: true, },
            speaking: {type: Boolean,
            required: true,
            default: false, },
        },
	};
</script>
<style scoped>
#contour {
  border-radius: 50px;
  border: 2px solid #8df002;
  padding: 5px;
  width: auto;
  height: auto;
  text-align:center;
  
}


</style>