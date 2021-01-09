<template>
	<div>
		<b-navbar toggleable="lg" class="bg-white">
			<b-navbar-brand href="https://asclepios.ch/" target="_blank">
				<img src="../assets/img/Astrolink_logo_white_s.png" alt="Astrolink"/>
			</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<b-nav-text>Alpha Version 0.2</b-nav-text>							
				</b-navbar-nav>

				<b-navbar-nav class="ml-auto">
					<b-nav-item to="/home" :class="{ active : isActive === 'home' }" @click="isActive = 'home'">Planning</b-nav-item>
					<b-nav-item to="/procedures" :class="{ active : isActive === 'procedures' }" @click="isActive = 'procedures'" v-if="permissions.includes('activities.view_procedure')">Procedures</b-nav-item>
					<b-nav-item to="/experiments" :class="{ active : isActive === 'experiments' }" @click="isActive = 'experiments'">Experiments</b-nav-item>
					<b-nav-item to="/inventory" :class="{ active : isActive === 'inventory' }" @click="isActive = 'inventory'" v-if="permissions.includes('inventory.view_item')">Inventory</b-nav-item>
					<b-nav-item to="/psyforms" :class="{ active : isActive === 'psyforms' }" @click="isActive = 'psyforms'">Psychological</b-nav-item>

					<b-nav-item-dropdown right class="ml-lg-5">
						<template #button-content>
							{{ username }}
						</template>
						<b-dropdown-item to="/profile" class="text-center" @click="isActive = 'profile'"><b-icon icon="person-circle"></b-icon> <strong>Profile</strong></b-dropdown-item>
						<b-dropdown-item to="/planning" class="text-center" @click="isActive = 'planning'"><b-icon icon="calendar-range"></b-icon> <strong>Planning</strong></b-dropdown-item>
						<b-dropdown-item class="text-center" @click="handleLogout"><b-icon icon="box-arrow-left"></b-icon> <strong>Log Out</strong></b-dropdown-item>
					</b-nav-item-dropdown>

				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import { mapState } from 'vuex'

	export default {
		data() {
			return {
				isActive: ''
			}
		},
		computed: {
			...mapState('user', ['permissions', 'username'])
		},
		methods: { 
			...mapActions(['loadAll']),
			...mapActions('auth', ['logout']),
            ...mapActions('user', ['getUserState']),
			handleLogout() {
				this.logout()
				.then(this.$router.push('/login'))
			}
		},
		created() {
			this.getUserState()
			this.loadAll()
		}
	}
</script>

<style scoped>
	.nav-item {
		font-variant-caps: all-small-caps;
		font-weight: bold;
		font-size: 1.5em;
		margin: 0px 5px 0px 5px;
	}

	.active {
		font-weight: bold;
		text-decoration: underline;
	}


</style>