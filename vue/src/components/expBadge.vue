<template>
	<span :class="['badge', {'badge-primary': status === 'planned'}, {'badge-warning': status === 'ongoing'}, {'badge-success': status === 'complete'}, {'badge-danger': status === 'aborted'}]">{{status}}
	</span>
</template>

<script>
	export default {
		name: 'expBadge',
		props: ['status']
	}
</script>