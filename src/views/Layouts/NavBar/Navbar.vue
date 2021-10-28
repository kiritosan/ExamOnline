<template>
	<nav>
		<v-app-bar
			app
			flat
		>
			<v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
			<v-app-bar-title class="grey--text text-uppercase">
				<span class="font-weight-light">todo</span>
				<span>list</span>
			</v-app-bar-title>
			<v-spacer></v-spacer>

			<v-menu offset-y>
				<template v-slot:activator="{on,attrs}">
					<v-btn
						text
						color="grey"
						v-on="on"
						v-bind="attrs"
					>
						<v-icon left>mdi-menu</v-icon>
						<span class="text-uppercase">menu</span>
					</v-btn>
				</template>

				<v-list>
					<v-list-item
						v-for="link in links"
						:key="link.route"
						router
						:to="link.route"
					>
						<v-list-item-title>{{link.text}}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>

			<v-btn
				text
				color="grey"
				@click="signOut"
			>
				<span>SIGN OUT</span>
				<v-icon right>mdi-arrow-right-thin-circle-outline</v-icon>
			</v-btn>
		</v-app-bar>

		<v-navigation-drawer
			v-model="drawer"
			app
			class="primary"
		>
			<v-row class="d-flex flex-column align-center">
				<v-responsive class="mt-10">
					<v-avatar size="100">
						<img
							src="/images/avatar-1.jpg"
							alt=""
						>
					</v-avatar>
				</v-responsive>
				<p class="white--text subtitle-1 mt-3">Simon</p>
				<popup />
			</v-row>

			<v-list>
				<v-list-item
					v-for="link in links"
					:key="link.route"
					router
					:to="link.route"
				>
					<v-list-item-action>
						<v-icon class="white--text">{{link.icon}}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title class="white--text">{{link.text}}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

	</nav>
</template>

<script>
import Popup from './Popup.vue'
export default {
	name: 'NavBar',
	components: {
		Popup,
	},

	data() {
		return {
			drawer: true,
			links: [
				{ icon: 'mdi-car', text: '首页', route: '/home' },
				{ icon: 'mdi-information', text: '关于', route: '/home/about' },
				{ icon: 'mdi-steam', text: '团队', route: '/home/team' },
			],
			attrs: true,
		}
	},
	methods: {
		// 退出,清除token,刷新页面
		signOut() {
			window.localStorage.removeItem('token')
			window.location.reload()
		},
	},
}
</script>

<style scoped>
</style>
