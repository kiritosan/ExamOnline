<template>
	<div class="team">
		<h1 class="subtitle-1 grey--text">Team</h1>

		<v-container class="my-5">
			<v-row>
				<v-col
					cols="12"
					sm="6"
					md="4"
					lg="3"
					v-for="person in team"
					:key="person.name"
				>
					<v-card
						flat
						class="ma-3 text-center"
					>
						<v-responsive class="pt-4">
							<v-avatar
								size="100"
								class="grey lighten-2"
							>
								<img
									:src="person.avatar"
									alt=""
								>
							</v-avatar>
						</v-responsive>
						<v-card-text>
							<div class="subtitle-1">{{person.name}}</div>
							<div class="grey--text">{{person.role}}</div>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn
								text
								color="grey"
							>
								<v-icon small>mdi-message</v-icon>
								<span class="text-uppercase">message</span>
							</v-btn>
							<v-spacer></v-spacer>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
export default {
	name: 'Team',
	components: {},
	data() {
		return {
			team: [
				{
					name: 'Simon',
					role: 'Web Developer',
					avatar: '/images/avatar-1.jpg',
				},
				{
					name: 'Simon1',
					role: 'Web Developer4',
					avatar: '/images/avatar-2.jpg',
				},
				{
					name: 'Simon2',
					role: 'Web Developer3',
					avatar: '/images/avatar-3.jpg',
				},
				{
					name: 'Simon3',
					role: 'Web Developer2',
					avatar: '/images/avatar-4.jpg',
				},
				{
					name: 'Simon4',
					role: 'Web Developer1',
					avatar: '/images/avatar-5.jpg',
				},
			],
		}
	},
	computed: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>

<style scoped>
</style>
