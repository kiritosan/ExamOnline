<template>
	<nav>
		<v-app-bar
			app
			flat
		>
			<v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
			<v-app-bar-title class="grey--text text-uppercase">
				<span class="font-weight-light">欢迎登录，</span>
				<span>考试系统</span>
			</v-app-bar-title>
			<v-spacer></v-spacer>
			<v-dialog
				v-model="dialog"
				width="500"
				persistent
			>
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						text
						v-bind="attrs"
						v-on="on"
						class="grey--text"
					>选课</v-btn>

				</template>

				<v-data-table
					:headers="headers"
					:items="desserts"
					:items-per-page="5"
					disable-sort
					class="elevation-1"
				>
					<template v-slot:item.action="{ item }">
						<v-btn
							color="success"
							@click="chooseLesson(item)"
							class="cuifan mr-4"
							:disabled="item.disabled"
						>
							选课
						</v-btn>
						<v-btn
							color="error"
							@click="cancelselectedLesson(item)"
						>
							取消
						</v-btn>

					</template>

				</v-data-table>
				<div style="background-color:white">
					<span class="ml-10">已选课程：{{classList.map(item=>item.cname)}}</span>
				</div>
				<div
					style="background-color:white"
					class="d-flex justify-center py-4"
				>

					<v-btn
						color="error"
						class="mr-4"
						@click="dialog = false"
					>退出</v-btn>
					<v-btn
						@click="chooseCoursesRightly"
						color="success"
					>确认</v-btn>
				</div>
			</v-dialog>

			<v-menu offset-y>
				<template v-slot:activator="{on,attrs}">
					<v-btn
						text
						color="grey"
						v-on="on"
						v-bind="attrs"
					>
						<v-icon left>mdi-menu</v-icon>
						<span class="text-uppercase">菜单</span>
					</v-btn>
				</template>
				<v-list>
					<v-list-item
						v-for="link in links"
						:key="link.route"
						router
						:to="link.route"
					>
						<v-list-item-title>{{link.text}}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
			<v-btn
				text
				color="grey"
				@click="signOut"
			>
				<span>注销</span>
				<v-icon right>mdi-arrow-right-thin-circle-outline</v-icon>
			</v-btn>
		</v-app-bar>
		<v-navigation-drawer
			v-model="drawer"
			app
			class="primary"
		>
			<v-row class="d-flex flex-column align-center">
				<v-dialog max-width="440">
					<template v-slot:activator="{on,attr}">
						<v-responsive class="mt-10">
							<v-avatar size="100">
								<img
									src="/images/avatar-1.jpg"
									class="avatar"
									title="更换头像"
									@click="updateAvatar"
									v-on="on"
									v-bind="attr"
								>
							</v-avatar>
						</v-responsive>
					</template>
					<v-card>
						<v-card-title>更换头像</v-card-title>
						<v-card-text>
							<input
								type="file"
								accept="image/*"
								ref="input_img"
								@change="changeAvatar()"
							>
							<v-btn
								class="success white--text mx-0"
								@click="confirmChange"
							>确认修改</v-btn>
						</v-card-text>
					</v-card>
				</v-dialog>
				<p class="white--text subtitle-1 mt-3">{{name}}</p>
				<popup />
			</v-row>
			<v-list>
				<v-list-item
					v-for="link in links"
					:key="link.route"
					router
					:to="link.route"
					class="d-flex justify-around"
				>
					<v-list-item-action class="ml-12">
						<v-icon class="white--text">{{link.icon}}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title class="white--text">{{link.text}}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
	</nav>
</template>

<script>
import Popup from './Popup.vue'
import { teacherData, studentData } from '@/utils/navData.js'
import {
	getTeacherInfo,
	getStudentInfo,
	uploadAvatar,
	getAvatar,
	getAllColleges,
	chooseTeacherClasses,
	getAllTeacherCanTeach,
} from '@/api/Info'
import { getUserAccount } from '@/api/Login'
export default {
	name: 'NavBar',
	components: {
		Popup,
	},
	data() {
		return {
			drawer: true, // 控制导航条
			links: [], // 导航栏
			dialog: false, // 控制选课对话框隐藏
			// attrs: true,
			// 姓名
			name: '',
			coid: '', //学院

			// 表单规则
			nameRules: [
				(v) => !!v || '姓名不能为空',
				(v) => /^[\u4e00-\u9fa5a-zA-Z0-9]+$/.test(v) || '姓名不能包含特殊字符',
				(v) => (v && v.length <= 30) || '姓名长度过长',
			],
			courses: [], // 还能选的课程
			headers: [
				{
					text: '课程序号',
					align: 'start',
					sortable: false,
					value: 'cid',
				},
				{ text: '课程名称', value: 'cname' },
				{ text: '操作', value: 'action' },
			],
			desserts: [],
			classList: [], //记录选课列表
		}
	},
	created() {
		// 获取老师/学生个人信息 ,status：s学生 t老师
		this.account = getUserAccount()
		let status = this.account[0]
		let requestsInfo = {
			s: getStudentInfo,
			t: getTeacherInfo,
		}
		requestsInfo[status]({
			[status + 'num']: this.account,
		})
			.then((res) => {
				this.coid = res.data.coid
				this.name = res.data[status + 'name']
				// 获取老师能教授的所有课表
				return getAllTeacherCanTeach({
					coid: this.coid,
					tnum: this.account,
				})
			})
			.then((res) => {
				this.desserts = res.data
				this.desserts.forEach((item) => {
					this.$set(item, 'disabled', false)
				})
			})

		// 更新导航栏
		let navLists = {
			t: teacherData,
			s: studentData,
		}
		navLists[status].forEach((nav) => {
			if (nav.name) {
				this.links.push({
					text: nav.meta.text,
					route: '/home/' + nav.name,
					icon: 'mdi-steam',
				})
			}
		})
		
		// willem:给学生和老师添加discussion导航项目
		this.links.push({
			text: '提问交流区',
			route: '/home/discussion',
			icon: 'mdi-steam',
		})
	},

	methods: {
		// 退出,清除token,刷新页面
		signOut() {
			window.localStorage.removeItem('token')
			window.location.reload()
			this.$message({
				type: 'success',
				message: '注销成功',
			})
		},

		updateAvatar() {},
		changeAvatar(data) {
			// 修改头像
			let img = this.$refs.input_img
			this.formData = new FormData()
			if (img.files[0]) {
				this.formData.append('qr_image', img.files[0])
			}
		},

		confirmChange() {
			// 确认修改头像
			uploadAvatar({
				num: this.account,
				file: this.formData,
			}).then(() => {})
		},

		// 老师一门门添加要选的课
		chooseLesson(course) {
			// 禁用选课按钮
			this.desserts.forEach((item) => {
				if (course.cid === item.cid) return (item.disabled = true)
			})
			console.log(this.desserts)
			this.classList.push({
				cid: course.cid,
				cname: course.cname,
			})
			this.$message({
				type: 'success',
				message: '添加课程' + course.cname + '成功',
			})
		},

		cancelselectedLesson(course) {
			// 取消这门课选课按钮的禁用
			this.desserts.forEach((item) => {
				if (course.cid === item.cid) return (item.disabled = false)
			})
			this.classList.forEach((item, index) => {
				if (item.cid === course.cid) {
					this.classList.splice(index, 1)
				}
			})
		},

		// 发送所有选课信息
		chooseCoursesRightly() {
			chooseTeacherClasses({
				tnum: this.account,
				classList: this.classList,
			}).then((res) => {
				this.dialog = false
				this.$message({
					type: 'success',
					message: '选课成功',
				})
				window.location.reload()
			})
		},
	},
}
</script>

<style scoped>
.avatar {
	cursor: pointer;
}
</style>
