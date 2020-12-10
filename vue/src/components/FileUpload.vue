<template>
	<div>
		<b-form-file
		v-model="filesWaiting"
		multiple
		accept=".pdf"
		size="lg"
		placeholder="Choose a file or drop it here..."
		drop-placeholder="Drop it !"
		>
		<template slot="file-name" slot-scope="{ names }">
			<b-badge v-for="name in names" :key="name" pill variant="dark">{{ name }}</b-badge>
			({{names.length}} selected)
		</template>

		</b-form-file>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				filesWaiting: []
			}
		}
	}
</script>