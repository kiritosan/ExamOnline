<template>
	<div class="home">
		<h1 class="subtitle-1 grey--text">Home</h1>
		<v-expansion-panels>
			<v-expansion-panel
				v-for="project in projects"
				:key="project.course"
			>
				<v-expansion-panel-header>{{project.course}}</v-expansion-panel-header>
				<v-expansion-panel-content>
					<v-card flat>
						<v-card-text class="px-4 grey--text">
							<div class="font-weight-bold">{{project.due}}</div>
							<div>{{project.papers}}</div>
						</v-card-text>
					</v-card>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>

	</div>
</template>

<script>
export default {
	name: 'Home',
	components: {},
	data() {
		return {
			projects: [
				{
					course: 'Design a new website.',
					person: 'Simon',
					due: '1st Jan 2022',
					status: 'ongoing',
					papers: 'Hello World',
				},
				{
					course: 'Design a new website1.',
					person: 'Simon3',
					due: '1st Jan 2022',
					status: 'complete',
					papers: 'Hello World1',
				},
				{
					course: 'Design a new website2.',
					person: 'Simon2',
					due: '1st Jan 2022',
					status: 'complete',
					papers: 'Hello World2',
				},
				{
					course: 'Design a new website3.',
					person: 'Simon1',
					due: '1st Jan 2022',
					status: 'overdue',
					papers: 'Hello World3',
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
