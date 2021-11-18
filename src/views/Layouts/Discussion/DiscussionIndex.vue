<template>
	<div>
		<!-- questions -->
		<v-card
			class="mx-auto mb-8"
			width="70vw"
			tile
		>
			<v-card-text>问题列表</v-card-text>
			<!-- question list -->
			<v-list
				nav
			>
				<v-list-item-group
					color="primary"
				>
					<v-list-item
						v-for="(question, i) in questionsTitle"
						:key="i"
						to="/home/discussion/answers"
					>
						<v-list-item-title v-text="question"></v-list-item-title>
					</v-list-item>
				</v-list-item-group>
			</v-list>
			<!-- paginaiton -->
			<div class="text-center">
				<v-pagination
					v-model="page"
					:length="15"
					:total-visible="7"
					class="pb-2"
				></v-pagination>
			</div>
		</v-card>
				
	</div>
</template>

<script>
// 只是驗證碼樣式
import ValidCode from '../../../utils/validCode.vue'

export default {
	name:"discussion-index",
	data() {
		return {
			name: '', //姓名
			answerText:'', //回答内容文本
			avatorCode:'', //头像对应的编码
			dialog: false,
			page: 1,
			items: ['数据库', '编译原理', '操作系统', '计算机组成原理'],
			questionsTitle: [
				'词是否有全球统一的定义？',
				'句是否有全球统一的定义？',
				'是否有全球统一的语法范畴？',
				'词中的元素（语素）与句中的元素（句子成份）是否遵循相同的规则？',
				'单向函数存在吗？',
				'指数时间假说是真的吗？',
				'K-服务器问题'
			],
		}
	},
	created() {
		// todo 根据帐号获取老师或学生的信息
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
				this.name = res.data[status + 'name']
			})
	},
	mounted() {},

	methods: {
		jumpToAnswer(){
			this.$refs.input.focus()
		},
		// 上传回答
		submit(){
			
		},
		


	},
	components: {
		ValidCode
  }
}
</script>

<style lang="scss" scoped>
</style>