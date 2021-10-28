<template>
	<v-dialog max-width="640">
		<template v-slot:activator="{on,attr}">
			<v-btn
				class="success white--text text-uppercase mb-5"
				v-on="on"
				v-bind="attr"
				text
			>
				add a project
			</v-btn>
		</template>

		<v-card>
			<v-card-title>Add A Project</v-card-title>
			<v-card-text>
				<v-form
					class="px-3"
					ref="form"
				>
					<v-text-field
						label="Title"
						v-model="title"
						prepend-icon="mdi-folder"
						:rules="inputRules"
					></v-text-field>
					<v-textarea
						label="Information"
						v-model="content"
						prepend-icon="mdi-pen"
						:rules="inputRules"
					></v-textarea>

					<v-row>
						<v-col
							cols="12"
							sm="6"
							md="6"
						>
							<v-menu
								min-width="auto"
								max-width="290px"
							>
								<template v-slot:activator="{on,attrs}">
									<v-text-field
										v-on="on"
										label="Due Date"
										v-bind="attrs"
										prepend-icon="mdi-calendar"
										:value="due"
									></v-text-field>
								</template>
								<v-date-picker v-model="due"></v-date-picker>
							</v-menu>

						</v-col>
						<v-col
							cols="12"
							sm="6"
							md="6"
						>
							<v-btn
								class="success white--text mx-0 mt-3"
								@click="submit"
							>submit</v-btn>
						</v-col>
					</v-row>
				</v-form>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'Popup',
	components: {},
	data() {
		return {
			title: '',
			content: '',
			attrs: true,
			due: '2021-07-10',
			inputRules: [(value) => value.length >= 6 || '位数必须大于6'],
		}
	},
	methods: {
		submit() {
			if (this.$refs.form.validate()) {
				console.log(this.title, this.content, this.due)
			}
		},
	},
}
</script>


<style scoped>
</style>
