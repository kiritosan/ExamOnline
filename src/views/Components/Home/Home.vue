<template>
	<v-app>
		<nav-bar></nav-bar>
		<v-main class="grey lighten-4 ml-4 pr-4">
			<router-view>
			</router-view>
		</v-main>
	</v-app>
</template>

<script>
import NavBar from '../../Layouts/NavBar/Navbar.vue'
export default {
	name: 'CuifanHome',
	components: {
		NavBar,
	},
}
</script>
