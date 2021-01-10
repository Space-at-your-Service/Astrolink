<template>
	<b-tooltip :target="target" triggers="hover" :delay="{show: 800, hide: 50}" variant="light">
		{{ msg }}
	</b-tooltip>
</template>

<script>
	export default {
		name: 'tooltip',
		props: ['target', 'msg']
	}
</script>