<template>
	<v-dialog
		max-width="440"
		class="ml-4"
		persistent
		v-model="dialog"
	>
		<template v-slot:activator="{on,attr}">
			<div>
				<v-btn
					class="success white--text text-uppercase mb-5 ml-1"
					v-on="on"
					v-bind="attr"
					text
				>
					修改个人信息
				</v-btn>
			</div>
		</template>
		<v-card>
			<v-card-title>修改个人信息</v-card-title>
			<v-card-text>
				<v-form
					class="px-3"
					ref="form"
				>
					<v-text-field
						v-model="name"
						:rules="nameRules"
						outlined
						dense
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
						:rules="phoneRules"
						:counter="11"
						label="手机号"
						outlined
						dense
						required
					></v-text-field>
					<v-text-field
						v-model="email"
						:rules="emailRules"
						label="邮箱"
						required
						outlined
						dense
					></v-text-field>
					<v-row>
						<v-col>
							<v-btn
								class="info white--text mx-0"
								@click="dialog = false"
							>取消</v-btn>
							<v-btn
								color="error"
								class=" white--text   mx-4"
								@click="reset"
							>
								重置
							</v-btn>
							<v-btn
								class="success white--text mx-0"
								@click="submit"
							>提交</v-btn>
						</v-col>
					</v-row>
				</v-form>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
import {
	getTeacherInfo,
	getStudentInfo,
	updateTeacherInfo,
	updateStudentInfo,
} from '@/api/Info'
import { getUserAccount } from '@/api/Login'

export default {
	name: 'Popup',
	components: {},
	data() {
		return {
			// 修改个人信息的表单属性
			account: '',
			name: '',
			sex: 'm',
			institutes: ['信息学院', '植科院', '工学院'],
			coid: '信息学院',
			phone: '',
			email: '',
			// 控制卡片弹出隐藏
			dialog: false,
			// 表单属性匹配规则
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
		}
	},

	created() {
		// 获取老师/学生个人信息填入表单, flag：s学生,t老师
		this.account = getUserAccount()
		let flag = this.account[0]
		let requestsInfo = {
			s: getStudentInfo,
			t: getTeacherInfo,
		}
		requestsInfo[flag]({
			[flag + 'num']: this.account,
		}).then((res) => {
			this.sex = res.data[flag + 'sex']
			this.phone = res.data[flag + 'phone']
			this.name = res.data[flag + 'name']
			this.institute = ['信息学院', '植科院', '工学院'][res.data.coid]
			this.email = res.data.email
		})
	},

	methods: {
		// 修改老师/学生的个人信息
		submit() {
			if (!this.$refs.form.validate()) return
			let flag = this.account[0]
			let updateInfo = {
				s: updateStudentInfo,
				t: updateTeacherInfo,
			}
			updateInfo[flag]({
				coid: this.institutes.findIndex((institute) => institute === this.coid),
				email: this.email,
				[flag + 'num']: this.account,
				[flag + 'name']: this.name,
				[flag + 'phone']: this.phone,
				[flag + 'sex']: this.sex,
			}).then((res) => {
				if (res.data.state) {
					this.$message({
						type: 'success',
						message: res.data.msg,
					})
					this.dialog = false
				}
			})
		},
		reset() {
			this.$refs.form.reset()
		},
	},
}
</script>
