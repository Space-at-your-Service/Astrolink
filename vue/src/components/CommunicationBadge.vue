<template>
        <b-col md="4" class="rounded p-3 ">
      
      <div id="contour"><h6>{{id}}</h6></div>
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
  border-radius: 40px;
  border: 2px solid #8df002;
  padding: 6px;
  width: auto;
  height: auto;
  text-align:center;
  background-color: rgba(122, 122, 122, 0)
  
}


</style>