<template>
	<div>
		<b-navbar toggleable="lg" class="bg-white">
			<b-navbar-brand href="https://asclepios.ch/" target="_blank">
				<img src="../assets/Astrolink_logo_white_s.png" alt="Astrolink"/>
			</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<b-nav-text>Alpha Version 0.2</b-nav-text>
				</b-navbar-nav>

				<b-navbar-nav class="ml-auto">
					<b-nav-item to="/home" :class="{ active : isActive === 'home' }" @click="isActive = 'home'">Planning</b-nav-item>
					<b-nav-item to="/procedures" :class="{ active : isActive === 'procedures' }" @click="isActive = 'procedures'">Procedures</b-nav-item>
					<b-nav-item to="/experiments" :class="{ active : isActive === 'experiments' }" @click="isActive = 'experiments'">Experiments</b-nav-item>
					<b-nav-item to="/inventory" :class="{ active : isActive === 'inventory' }" @click="isActive = 'inventory'">Inventory</b-nav-item>
					<b-nav-item to="/psyforms" :class="{ active : isActive === 'psyforms' }" @click="isActive = 'psyforms'">Psychological</b-nav-item>

					<b-nav-item-dropdown right class="ml-lg-5">
						<template #button-content>
							<strong>admin</strong>
						</template>
						<b-dropdown-item to="/profile" @click="isActive = 'profile'">Profile</b-dropdown-item>
						<b-dropdown-item to="/login" @click="isActive = 'login'"><strong>Log Out</strong></b-dropdown-item>
					</b-nav-item-dropdown>

				</b-navbar-nav>
			</b-collapse>

				<!-- <ul class="nav navbar-nav flex-row float-right" style="font-size:larger;g">
					<li class="nav-item">
						<span :class='{ "selected": selected === "home" }' @click='changeSelected("home")'>
							<router-link class="nav-link pr-3" to="/home">Planning</router-link>
						</span>
					</li>
					<li class="nav-item">
						<span :class='{ "selected": selected === "procedures" }' @click='changeSelected("procedures")'>
							<router-link class="nav-link pr-3" to="/procedures">Procedures</router-link>
						</span>
					</li>
					<li class="nav-item">
						<span :class='{ "selected": selected === "experiments" }' @click='changeSelected("experiments")'>
							<router-link class="nav-link pr-3" to="/experiments">Experiments</router-link>
						</span>
					</li>
					<li class="nav-item">
						<span :class='{ "selected": selected === "inventory" }' @click='changeSelected("inventory")'>
							<router-link class="nav-link pr-3" to="/inventory">Inventory</router-link>
						</span>
					</li>
					<li class="nav-item">
						<span :class='{ "selected": selected === "psyforms" }' @click='changeSelected("psyforms")'>
							<router-link class="nav-link pr-3" to="/psyforms">Psychological forms</router-link>
						</span>
					</li>
					<li class="nav-item">
						<span :class='{ "selected": selected === "profile" }' @click='changeSelected("profile")'>
							<router-link class="nav-link pr-3" to="/profile">Profile</router-link>
						</span>
					</li>
					<li class="nav-item">
						<span :class='{ "selected": selected === "logout" }' @click='changeSelected("logout")'>
							<router-link class="btn btn-outline-primary" to="/login">Log out</router-link>
						</span>
					</li>
				</ul>
			</div> -->
		</b-navbar>
	</div>
</template>

<script>

	export default {
		data() {
			return {
				isActive: ''
			}
		},
		methods: {
		}
	}
</script>

<style>
	.nav-item {
		font-variant-caps: all-small-caps;
		font-size: 1.5em;
		margin: 0px 5px 0px 5px;
	}

	.active {
		font-weight: bold;
		text-decoration: underline;
	}


</style>