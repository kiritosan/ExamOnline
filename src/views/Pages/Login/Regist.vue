<template>
	<v-app>
		<v-main class="mx-auto mt-10">
			<div v-if="reveal">
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
							考试系统注册
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
								v-model="name"
								:rules="nameRules"
								label="姓名"
								required
							></v-text-field>
							<div>
								<v-row>
									<v-col cols="7">
										<v-radio-group
											v-model="sex"
											row
										>
											<span style="color:#666">性别：</span>
											<v-radio
												label="男"
												value="m"
											></v-radio>
											<v-radio
												label="女"
												value="w"
											></v-radio>
										</v-radio-group>
									</v-col>
									<v-col cols="5">
										<v-select
											style="width:200px"
											:items="institutes"
											v-model="coid"
											label="所在学院"
											class="mt-3"
											dense
											outlined
											max-width="160"
										></v-select>
									</v-col>
								</v-row>
							</div>
							<v-text-field
								v-model="phone"
								:counter="11"
								:rules="phoneRules"
								label="手机号"
								required
							></v-text-field>
							<v-text-field
								v-model="email"
								:rules="emailRules"
								label="邮箱"
								required
							></v-text-field>
							<v-text-field
								v-model="password"
								:append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
								:rules="passwordRules"
								label="密码"
								:type="show ? 'text' : 'password'"
								@click:append="show = !show"
								required
							></v-text-field>
							<v-text-field
								v-model="password1"
								:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
								:rules="passwordRules1"
								label="确认密码"
								:type="show1 ? 'text' : 'password'"
								@click:append="show1 = !show1"
								required
							></v-text-field>
							<v-checkbox
								v-model="agreeTreaty"
								:rules="[v => !!v || '该项必须勾选']"
								label="我同意注册条约"
								required
							>
							</v-checkbox>
							<div class="justify-center d-flex my-4">
								<v-btn
									:disabled="!valid"
									color="success"
									class="mr-4"
									@click="toRegist"
								>
									注册
								</v-btn>
								<v-btn
									color="error"
									class="mr-4"
									@click="$refs.form.reset()"
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
					<v-card-text class="text-center">已有账户？ <a
							href="/login"
							style="color:#58d8cb!important"
						>去登录。</a></v-card-text>
				</v-card>
			</div>
			<div v-else>
				<v-card class="pb-4">
					<v-card-title>为您分配的账号为：<span class="account">{{account}}</span> &nbsp;, 请牢记哦~</v-card-title>
					<v-card-actions class="d-flex justify-center">
						<v-btn
							@click="$router.push('/login')"
							color="success"
							class="mr-4"
						>
							去登录
						</v-btn>
						<v-btn
							color="success"
							class="mr-4"
							@click="router.push('/regist')"
						>
							重新注册
						</v-btn>
					</v-card-actions>
				</v-card>
			</div>
		</v-main>
	</v-app>
</template>

<script>
import { tregist, sregist } from '@/api/Login'
export default {
	data() {
		return {
			// 注册成功账号显示
			reveal: true,
			account: '123456',
			// 注册表单数据
			name: '',
			sex: 'm',
			institutes: ['信息学院', '植科院', '工学院'],
			coid: '信息学院',
			phone: '',
			email: '',
			password: '',
			password1: '',
			agreeTreaty: false,
			// 控制密码框显示与隐藏
			show: false,
			show1: false,
			// 控制tab栏切换
			tab: '我是学生',
			items: ['我是学生', '我是老师'],
			// 验证表单合法性
			valid: true,
			// 表单验证规则
			nameRules: [
				(v) => !!v || '姓名不能为空',
				(v) => /^[\u4e00-\u9fa5a-zA-Z0-9]+$/.test(v) || '姓名不能包含特殊字符',
				(v) => (v && v.length <= 30) || '姓名长度过长',
			],
			phoneRules: [
				(v) => !!v || '电话号码不能为空',
				(v) => /^\d+$/.test(v) || '电话号码必须为数字',
				(v) => (v && v.length === 11) || '电话号码长度为11位',
			],
			emailRules: [
				(v) => !!v || '邮箱不能为空',
				(v) =>
					/^[1-9]\d{4,10}@qq\.com$/.test(v) || '邮箱格式错误，目前仅支持QQ邮箱',
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
	methods: {
		toRegist() {
			// 表单输入不合法
			if (!this.$refs.form.validate()) return
			let status = ['s', 't']
			let regist = [sregist, tregist][this.tab]
			regist({
				[status[this.tab] + 'name']: this.name,
				[status[this.tab] + 'sex']: this.sex,
				[status[this.tab] + 'phone']: this.phone,
				coid: this.institutes.findIndex((institute) => institute === this.coid),
				psw: this.password,
				email: this.email,
			}).then((res) => {
				if (res.data.state === false) return
				this.account = res.data
				this.$message({
					type: 'success',
					message: '注册成功',
				})
				this.reveal = false
			})
		},
	},
}
</script>
<style>
.cuifan {
	color: #4bd5c7 !important;
}
.account {
	color: #4bd5c7;
}
</style>