<template>
	<v-app>
		<v-main class="mx-auto mt-10">
			<v-card
				flat
				min-width="334"
			>
				<v-card-title class="text-center flex-column  align-center">
					<v-avatar size="56">
						<img
							alt="Avatar"
							src="../../../assets/img/avatar.png"
						>
					</v-avatar>
					<h1 class="font-weight-light text-h6 basil--text mt-4 ">
						登陆考试系统
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
						class="mx-6 mt-6"
					>
						<v-text-field
							v-model="account"
							:counter="20"
							:rules="accountRules"
							label="请输入账号"
							required
						></v-text-field>

						<v-text-field
							v-model="password"
							:append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
							:rules="passwordRules"
							label="请输入密码"
							:type="show ? 'text' : 'password'"
							@click:append="show = !show"
							required
						></v-text-field>

						<v-checkbox
							v-model="checkbox"
							label="记住密码"
							required
						></v-checkbox>
						<div class="justify-center d-flex my-4">
							<v-btn
								:disabled="!valid"
								color="success"
								class="mr-4"
								@click="validate"
							>
								登录
							</v-btn>

							<v-btn
								color="error"
								class="mr-4"
								@click="reset"
							>
								重置
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
				<v-card-text class="text-center">没有帐户？ <a href="/regist">现在去创建。</a></v-card-text>
			</v-card>
		</v-main>
	</v-app>

</template>

<script>
import { tlogin, slogin } from '@/api/Login'
export default {
	data() {
		return {
			// tab栏切换
			tab: null,
			items: ['我是学生', '我是老师'],

			// 控制密码显示隐藏
			show: false,
			valid: true,

			// 账号密码
			account: '',
			password: '',

			// 账户合法性校验
			accountRules: [
				(v) => !!v || '账号不能为空',
				(v) => /^[ts]\d+$/.test(v) || '账号格式不正确',
			],
			passwordRules: [
				(v) => !!v || '密码不能为空',
				(v) =>
					/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(v) ||
					'密码至少包含 数字和英文，长度8~20',
			],

			// 记住密码
			checkbox: false,
		}
	},

	methods: {
		validate() {
			this.$refs.form.validate()
			if (this.tab === 0) {
				// 学生登录
				let query = {
					snum: this.account,
					psw: this.password,
				}
				console.log(query)
				slogin(query).then((res) => {
					console.log(res)
				})
			} else if (this.tab === 1) {
				// 老师登录
				let query = {
					tnum: this.account,
					pwd: this.password,
				}
			}
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