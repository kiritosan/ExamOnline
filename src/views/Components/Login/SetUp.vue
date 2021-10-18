<template>
	<v-app>
		<v-main
			class="mx-auto mt-10"
			max-width="344"
		>
			<v-card flat>
				<v-card-title class="text-center flex-column  align-center">
					<v-avatar size="56">
						<img
							alt="Avatar"
							src="../../../assets/img/avatar.png"
						>
					</v-avatar>
					<h1 class="font-weight-light text-h6 basil--text mt-4 ">
						Sign in to OnlineExam
					</h1>
				</v-card-title>
			</v-card>

			<v-card
				flat
				outlined
			>
				<v-tabs
					v-model="tab"
					fixed-tabs
				>
					<v-tabs-slider color="bg_success"></v-tabs-slider>
					<v-tab
						v-for="item in items"
						:key="item"
						active-class="cuifan"
					>
						{{ item }}
					</v-tab>
				</v-tabs>

				<v-tabs-items v-model="tab">
					<v-form
						ref="form"
						v-model="valid"
						lazy-validation
						class="mx-6"
					>
						<v-text-field
							v-model="account"
							:counter="20"
							:rules="accountRules"
							label="Email address"
							required
						></v-text-field>

						<v-text-field
							v-model="password"
							:append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
							:rules="passwordRules"
							label="Password"
							:type="show ? 'text' : 'password'"
							@click:append="show = !show"
							required
						></v-text-field>

						<v-checkbox
							v-model="checkbox"
							:rules="[v => !!v || 'You must agree to continue!']"
							label="Do you agree?"
							required
						></v-checkbox>

						<div class="justify-center d-flex my-4">
							<v-btn
								:disabled="!valid"
								color="success"
								class="mr-4"
								@click="validate"
							>
								Sign in
							</v-btn>

							<v-btn
								color="error"
								class="mr-4"
								@click="reset"
							>
								Reset
							</v-btn>
						</div>
					</v-form>
				</v-tabs-items>
			</v-card>

			<v-card
				flat
				outlined
				class="mt-4"
			>
				<v-card-text>New to OnlineExam? <a href="#">create an account.</a></v-card-text>
			</v-card>
		</v-main>
	</v-app>

</template>

<script>
export default {
	data() {
		return {
			tab: null,
			show: false,
			items: ['student', 'teacher'],
			valid: true,
			account: '',
			accountRules: [
				(v) => !!v || 'account is required',
				(v) => /^.+@.+\.com$/.test(v) || "mailbox's format wrong.",
				(v) => (v && v.length <= 20) || 'length limited to 6~20.',
			],
			password: '',
			passwordRules: [
				(v) => !!v || 'Password is required',
				(v) =>
					(v && v.length >= 6 && v.length <= 20) || 'length limited to 6~20.',
			],
			checkbox: false,
		}
	},

	methods: {
		validate() {
			this.$refs.form.validate()
		},
		reset() {
			this.$refs.form.reset()
		},
	},
}
</script>

<style>
.cuifan {
	color: #2da44e !important;
}
</style>