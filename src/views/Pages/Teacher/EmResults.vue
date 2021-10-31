<template>
	<div class="team">

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

							<v-dialog
								v-model="dialog"
								fullscreen
								hide-overlay
								transition="dialog-bottom-transition"
							>
								<template v-slot:activator="{ on, attrs }">
									<v-btn
										text
										color="grey"
									>
										<v-icon small>mdi-message</v-icon>

										<span
											class="text-uppercase"
											@click="examDetails"
											v-bind="attrs"
											v-on="on"
										>考试详情</span>
									</v-btn>
								</template>

								<v-card>
									<v-toolbar
										dark
										color="primary"
									>
										<v-btn
											icon
											dark
											@click="dialog = false"
										>
											<v-icon>mdi-close</v-icon>
										</v-btn>
										<v-toolbar-title>Settings</v-toolbar-title>
										<v-spacer></v-spacer>
										<v-toolbar-items>
											<v-btn
												dark
												text
												@click="dialog = false"
											>
												Save
											</v-btn>
										</v-toolbar-items>
									</v-toolbar>

									<v-row>
										<v-col cols="2"></v-col>
										<v-col>
											<v-sparkline
												:value="value"
												:gradient="gradient"
												:smooth="radius || false"
												:padding="padding"
												:line-width="width"
												:stroke-linecap="lineCap"
												:gradient-direction="gradientDirection"
												:fill="fill"
												:type="type"
												:auto-line-width="autoLineWidth"
												auto-draw
											></v-sparkline>
										</v-col>
										<v-col cols="2"></v-col>

									</v-row>

									<v-row class="mb-5">
										<v-col></v-col>
										<v-col style="text-align:center;">
											<v-chip color="success">
												成绩报表</v-chip>
										</v-col>
										<v-col></v-col>
									</v-row>
									<v-row>
										<v-col cols="2"></v-col>
										<v-col>
											<v-data-table
												:headers="headers"
												:items="desserts"
												:items-per-page="5"
												class="elevation-1"
											></v-data-table>
										</v-col>
										<v-col cols="2"></v-col>

									</v-row>
								</v-card>

							</v-dialog>
							<v-spacer></v-spacer>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
const gradients = [
	['#222'],
	['#42b3f4'],
	['red', 'orange', 'yellow'],
	['purple', 'violet'],
	['#00c6ff', '#F0F', '#FF0'],
	['#f72047', '#ffd200', '#1feaea'],
]
export default {
	name: 'Team',
	components: {},

	data() {
		return {
			headers: [
				{
					text: '试卷编号',
					align: 'start',
					sortable: false,
					value: 'pid',
				},
				{ text: '试卷名称', value: 'pdescribe' },
				{ text: '截至时间', value: 'deadline' },
				{ text: '操作', value: 'action' },
				{ text: '成绩', value: 'score' },
			],
			desserts: [],
			dialog: false,
			notifications: false,
			sound: true,
			widgets: false,

			width: 2,
			radius: 10,
			padding: 8,
			lineCap: 'round',
			gradient: gradients[5],
			value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
			gradientDirection: 'top',
			gradients,
			fill: false,
			type: 'trend',
			autoLineWidth: false,
			team: [
				{
					name: '数据库',
					role: '截至时间',
					avatar: '/images/avatar-1.jpg',
				},
				{
					name: 'Simon1',
					role: '截至时间',
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
	methods: {
		examDetails() {},
	},
}
</script>

<style scoped>
</style>
