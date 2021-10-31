<template>
	<div>
		<v-row>
			<v-col
				class=""
				cols="6"
			>
				<v-responsive class="mt-10 d-flex flex-column align-center">
					<v-avatar size="200">
						<img
							src="/images/avatar-1.jpg"
							alt=""
						>
					</v-avatar>
					<p
						class="mt-10"
						style="fontSize:20px"
					></p>
					<div class="ml-10">
						<p>账号：{{account}}</p>
						<p>姓名：{{name}}</p>
						<p>性别：{{sex}}</p>
						<p>学院：{{institute}}</p>
						<p>电话：{{phone}}</p>
						<p>邮箱：{{email}}</p>
					</div>
				</v-responsive>
			</v-col>
			<v-col>
				<v-card
					flat
					max-width="450"
					class="mt-15"
				>
					<v-list three-line>
						<template v-for="(course, index) in courses">
							<v-subheader
								v-if="course.header"
								:key="course.header"
								v-text="course.header"
							></v-subheader>
							<v-divider
								v-else-if="course.divider"
								:key="index"
								:inset="course.inset"
							></v-divider>
							<v-list-item
								v-else
								:key="course.title"
							>
								<v-list-item-avatar>
									<v-img :src="course.avatar"></v-img>
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title v-html="course.name"></v-list-item-title>
									<v-list-item-subtitle v-html="course.des"></v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
						</template>
					</v-list>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import {
	getTeacherInfo,
	getStudentInfo,
	getTeacherClasses,
	getStudentClasses,
} from '@/api/Info'
import { getUserAccount } from '@/api/Login'

export default {
	name: 'Cuifanstatus',
	data() {
		return {
			//用户基础信息
			courses: [{ header: '科目' }],
			sex: '',
			num: '',
			phone: '',
			name: '',
			institute: '', // 学院
			email: '',
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
		}).then((res) => {
			this.sex = res.data[status + 'sex'] === 'm' ? '男' : '女'
			this.phone = res.data[status + 'phone']
			this.name = res.data[status + 'name']
			this.institute = ['信息学院', '植科院', '工学院'][res.data.coid]
			this.email = res.data.email
		})

		// 获取老师/学生课程列表
		let requestsClasses = {
			t: getTeacherClasses,
			s: getStudentClasses,
		}
		requestsClasses[status]({
			[status + 'num']: this.account,
		}).then((res) => {
			res.data.forEach((item, index) => {
				this.courses.push({
					name: item.cname,
					id: item.id,
					avatar:
						'https://cdn.vuetifyjs.com/images/lists/' +
						(index > 4 ? (index % 4 === 0 ? 1 : index % 4) : index + 1) +
						'.jpg',
					des: `<span class="text--primary">${item.cname}</span> &mdash; 是一门有趣的学科。`,
				})
			})
		})
	},
	mounted() {},

	methods: {
		async onPageChange(page) {
			this.page = page
		},
	},
}
</script>

<style lang="scss" scoped>
</style>