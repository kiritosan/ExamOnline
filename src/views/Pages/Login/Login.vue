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
							src="/images/avatar.png"
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
							v-model.trim="account"
							:rules="accountRules"
							label="请输入账号"
							required
						></v-text-field>
						<v-text-field
							v-model.trim="password"
							:append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
							:rules="passwordRules"
							label="请输入密码"
							:type="show ? 'text' : 'password'"
							@click:append="show = !show"
							required
						></v-text-field>
						<v-checkbox
							v-model="checked"
							label="记住密码"
							required
						></v-checkbox>
						<div class="justify-center d-flex my-4">
							<v-btn
								:disabled="!valid"
								color="success"
								class="mr-4"
								@click="toLogin"
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
				<v-card-text class="text-center"><span class="mx-3"></span> 忘记密码？<a
						href="/updatePsw"
						style="color:#58d8cb!important"
					>去找回。</a>
				</v-card-text>
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
			checked: false,
		}
	},
	created() {
		// 自动读取上次登录用户账户密码
		this.getCookie()
	},
	methods: {
		// 保存用户账户密码到本地
		setCookie(name, psw, days) {
			let exdate = new Date() // 获取时间
			exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * days) // 保存的天数
			// 字符串拼接cookie
			window.document.cookie =
				'userName' + '=' + name + ';path=/;expires=' + exdate.toGMTString()
			window.document.cookie =
				'userPsw' + '=' + psw + ';path=/;expires=' + exdate.toGMTString()
		},
		// 读取用户账户密码
		getCookie() {
			if (!document.cookie) return
			let userDetails = {}
			document.cookie.split(';').forEach((item) => {
				userDetails[item.split('=')[0].trim()] = item.split('=')[1].trim()
			})
			this.account = userDetails.userName
			this.tab = this.account[0] === 't' ? 1 : 0
			this.password = userDetails.userPsw
			this.checked = true
		},
		toLogin() {
			// 输入不合法
			if (!this.$refs.form.validate()) return
			let status = ['s', 't']
			let login = [slogin, tlogin][this.tab]
			login({
				[status[this.tab] + 'num']: this.account,
				psw: this.password,
			})
				.then((res) => {
					if (res.data.token) {
						// 登录成功，保存token
						this.$message({
							type: 'success',
							message: '登录成功',
						})
						// 登录成功保存token
						window.localStorage.setItem('token', res.data.token)
						if (this.checked) {
							// 保存密码
							this.setCookie(this.account, this.password, 7)
						} else {
							this.setCookie('', '', -1)
						}
						this.$router.push('/home')
					}
					// 登录提示信息
					if (!res.data.state) {
						let message = ''
						switch (res.data.msg) {
							case '用户名不存在':
								message = res.data.msg + ',请检查账号或用户类型'
								break
							case '密码错误':
								message = res.data.msg + ',请重新输入'
								break
							default:
								message = '未知错误'
						}
						this.$message({
							type: 'error',
							message: message,
						})
					}
				})
				.catch((err) => {
					this.$message({
						type: 'error',
						message: '服务器故障，请等候！',
					})
				})
		},
		// 重置表单
		reset() {
			this.$refs.form.reset()
		},
	},
}
</script>
<style  scoped>
.cuifan {
	color: #4bd5c7 !important;
}
</style>
