<template>
		<b-navbar toggleable="lg" class="bg-white" style="box-shadow: 0px 3px 15px darkred">
			<b-navbar-brand href="https://astrolink.earth/" target="_self">

				<img src="https://i.postimg.cc/2j29FCsF/Astrolink-logo-white.png" alt="Astrolink" width="150px"/>

			</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<b-nav-text>
						{{ missionName }}
						<a href="https://github.com/Space-at-your-Service/Astrolink/issues" target="__blank" class="ml-2">
							<b-icon id="bug" icon="bug-fill"></b-icon>
						</a>
					</b-nav-text>							
				</b-navbar-nav>

				<b-navbar-nav class="ml-auto">
					<b-nav-item to="/flightplan" :class="[{ active : isActive === 'flightplan' }, 'hover-bg-crimson']" @click="isActive = 'flightplan'" v-if="isAllowed('activities.view_task')">Flightplan</b-nav-item>
					<b-nav-item to="/mccPlanning" :class="[{ active : isActive === 'mccPlanning' }, 'hover-bg-crimson']" @click="isActive = 'mccPlanning'" v-if="isAllowed('activities.view_task')">MCC Planning</b-nav-item>
					<!-- <b-nav-item to="/crew" :class="[{ active : isActive === 'crew' }, 'hover-bg-crimson']" @click="isActive = 'crew'" v-if="isAllowed('activities.view_task')">Crew</b-nav-item> -->
					<b-nav-item to="/procedures" :class="[{ active : isActive === 'procedures' }, 'hover-bg-crimson']" @click="isActive = 'procedures'" v-if="isAllowed('activities.view_procedure')">SOPs</b-nav-item>
					<b-nav-item to="/experiments" :class="[{ active : isActive === 'experiments' }, 'hover-bg-crimson']" @click="isActive = 'experiments'" v-if="isAllowed('activities.view_experiment')">Experiments</b-nav-item>
					<b-nav-item to="/inventory" :class="[{ active : isActive === 'inventory' }, 'hover-bg-crimson']" @click="isActive = 'inventory'" v-if="isAllowed('inventory.view_item')">Inventory</b-nav-item>
					<b-nav-item to="/communication" :class="[{ active : isActive === 'communication' }, 'hover-bg-crimson']" @click="isActive = 'communication'" v-if="isAllowed('communication.view_communication')">Communication</b-nav-item>

					<b-nav-item-dropdown right class="ml-lg-5 hover-bg-grey">
						<template #button-content>
							<em>{{ username }}</em>
						</template>
						<b-dropdown-item to="/profile" class="text-center" @click="isActive = 'profile'"><b-icon icon="person-circle"></b-icon> <strong>Profile</strong></b-dropdown-item>
						<b-dropdown-item class="text-center" @click="handleLogout"><b-icon icon="box-arrow-left"></b-icon> <strong>Log Out</strong></b-dropdown-item>
					</b-nav-item-dropdown>

				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
</template>

<script>
	import { mapActions } from 'vuex'
	import { mapState } from 'vuex'
	import { mapGetters } from 'vuex'

	export default {
		data() {
			return {
				loading: false,
				isActive: ''
			}
		},
		computed: {
			...mapState(['missionName']),
			...mapState('user', ['username']),
			...mapGetters('user', ['isAllowed'])
		},
		methods: { 
			...mapActions(['loadAll', 'displayOverlay', 'hideOverlay']),
			...mapActions('auth', ['logout']),
            ...mapActions('user', ['getUserState']),
			handleLogout() {
				this.logout()
				.then(this.$router.push('/login'))
			}
		},
		mounted() {
			this.$store.dispatch('loadAll')
		}
	}
</script>

<style scoped>
	.nav-item {
		font-variant-caps: all-small-caps;
		font-weight: bold;
		font-size: 1.7em;
		margin: 0px 8px 0px 8px;
	}

	.active {
		font-weight: bold;
		text-decoration: underline;
	}

	#bug:hover {
		animation: shake 0.5s;
	}

</style>