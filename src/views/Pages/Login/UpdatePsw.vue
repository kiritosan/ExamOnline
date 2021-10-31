<template>
	<div>
		<v-app>
			<v-main class="mx-auto mt-10">
				<v-card
					v-if="showAccount"
					min-width="334"
					class="pb-4"
				>
					<v-card-title>请输入您要找回的账号：</v-card-title>
					<v-form
						ref="form1"
						v-model="valid1"
						lazy-validation
						class="mx-6 mt-6"
					>
						<v-text-field
							outlined
							dense
							class="mx-6"
							v-model="account"
							:rules="accountRules"
						></v-text-field>
					</v-form>
					<v-card-actions class="d-flex justify-center">
						<v-btn
							@click="sendCode"
							color="success"
							class="mr-4"
							:disabled="!valid1"
						>
							发送验证码
						</v-btn>
						<v-btn
							color="success"
							class="mr-4"
							@click="$router.push('/')"
						>
							回到首页
						</v-btn>
					</v-card-actions>
				</v-card>
				<v-card
					v-else
					min-width="334"
					class="pb-4"
				>
					<v-card-title>请按要求输入下面的信息：</v-card-title>
					<v-form
						ref="form"
						v-model="valid"
						lazy-validation
						class="mx-6 mt-6"
					>
						<v-text-field
							v-model="email"
							:rules="emailRules"
							outlined
							dense
							required
							class="mx-6"
							label="邮箱"
						></v-text-field>
						<v-text-field
							v-model="code"
							:rules="codeRules"
							outlined
							dense
							required
							class="mx-6"
							label="验证码"
						></v-text-field>
						<v-text-field
							v-model="password"
							:append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
							:rules="passwordRules"
							label="新密码"
							:type="show ? 'text' : 'password'"
							@click:append="show = !show"
							outlined
							dense
							required
							class="mx-6"
						></v-text-field>
						<v-text-field
							v-model="password1"
							:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
							:rules="passwordRules1"
							label="确认密码"
							:type="show1 ? 'text' : 'password'"
							@click:append="show1 = !show1"
							outlined
							dense
							required
							class="mx-6"
						></v-text-field>
					</v-form>
					<v-card-actions class="d-flex justify-center">
						<v-btn
							@click="findPsw"
							:disabled="!valid"
							color="success"
							class="mr-4"
						>
							找回密码
						</v-btn>
						<v-btn
							color="success"
							class="mr-4"
							@click="$router.push('/')"
						>
							回到首页
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-main>
		</v-app>
	</div>
</template>

<script>
import { getCode, checkCode, updatePsw, getUserAccount } from '@/api/Login'
export default {
	name: 'CuifanUpdatepsw',
	data() {
		return {
			// 控制页面显示隐藏
			showAccount: true,
			// 表单合法性验证
			valid: true,
			valid1: true,
			// 密码显示隐藏
			show: false,
			show1: false,
			// 邮箱和验证码
			code: '',
			email: '',
			//账号密码
			account: '',
			password: '',
			password1: '',
			// 验证规则
			emailRules: [
				(v) => !!v || '邮箱不能为空',
				(v) =>
					/^[1-9]\d{4,10}@qq\.com$/.test(v) || '邮箱格式错误，目前仅支持QQ邮箱',
			],
			accountRules: [
				(v) => !!v || '账号不能为空',
				(v) => /^[ts]520\d+$/.test(v) || '账号格式不正确',
			],
			codeRules: [
				(v) => !!v || '验证码必须输入',
				(v) => /^\d{6}$/.test(v) || '请输入6位合法的验证码',
			],
			passwordRules: [
				(v) => !!v || '密码不能为空',
				(v) =>
					/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(v) ||
					'密码至少包含 数字和英文，长度8~20',
			],
			passwordRules1: [(v) => (v && v === this.password) || '两次密码不一致'],
		}
	},
	created() {
		this.account = getUserAccount()
	},
	methods: {
		// 发送验证码
		sendCode() {
			if (!this.$refs.form1.validate()) return
			getCode({
				num: this.account,
			})
				.then((res) => {
					console.log(res)
					if (res.data.state) {
						this.$message({
							type: 'success',
							message: res.data.msg,
						})
						this.showAccount = false
					}
				})
				.catch(() => {
					this.$message({
						type: 'error',
						message: '验证码发送失败，请稍后再试',
					})
				})
		},

		findPsw() {
			if (!this.$refs.form.validate()) return
			// 接收验证码后校验
			checkCode({
				code: this.code,
				email: this.email,
			})
				.then((res) => {
					if (!res.data.state)
						return this.$message({
							type: 'error',
							message: res.data.msg,
						})
					// 验证码校验成功后更新密码
					return updatePsw({
						num: this.account,
						psw: this.password,
					})
				})
				.then((res) => {
					if (res.data.state) {
						this.$message({
							type: 'success',
							message: res.data.msg,
						})
						this.$router.push('/')
					}
				})
				.catch(() => {
					this.$message({
						type: 'error',
						message: '密码修改失败',
					})
				})
		},
	},
}
</script>