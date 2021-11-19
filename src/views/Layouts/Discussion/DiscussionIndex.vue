<template>
	<div>
		<!-- questions -->
		<v-card
			class="mx-auto "
			width="70vw"
			tile
			flat
			color="#f5f5f5"
		>
			<v-row>
				<v-chip
					class="success my-6 px-11 py-5"
					style="font-size:16px;margin-left:7%;cursor: pointer;"
				>问题列表</v-chip>
				<v-spacer></v-spacer>
				<v-chip
					class="success my-6 px-11 py-5 mr-5"
					style="font-size:16px;cursor: pointer;"
				>已解答</v-chip>
				<v-chip
					class="white--text my-6 px-11 py-5"
					color="#697ce7"
					style="font-size:16px;margin-right:7%;cursor: pointer;"
				>未解答</v-chip>

			</v-row>
			<!-- question list -->
			<v-list
				nav
				color="#f5f5f5"
			>
				<v-list-item-group color="primary">
					<v-list-item
						v-for="(question, i) in questionsTitle"
						:key="i"
						to="/home/discussion/answers"
						class="d-flex justify-center"
					>
						<v-chip
							color="white"
							class="ml-4 my-2 lighten-1 chipTag"
							style="width:90%;cursor: pointer; height:7vw"
						>
							<span class="tag bg"></span>
							【{{i+1}}】{{question}}
						</v-chip>
					</v-list-item>
				</v-list-item-group>
			</v-list>
			<!-- paginaiton -->
			<div class="text-center mt-6">
				<v-pagination
					v-model="page"
					:length="10"
					:total-visible="7"
					class="pb-2"
					color="#697ce7"
				></v-pagination>
			</div>
		</v-card>

	</div>
</template>

<script>
import { getUserAccount } from '@/api/Login'
import { getStudentInfo, getTeacherInfo } from '@/api/Info'

// 只是驗證碼樣式
import ValidCode from '../ValidCode/validCode.vue'
export default {
	name: 'discussion-index',
	data() {
		return {
			name: '', //姓名
			answerText: '', //回答内容文本
			avatorCode: '', //头像对应的编码
			dialog: false,
			page: 1,
			items: ['数据库', '编译原理', '操作系统', '计算机组成原理'],
			questionsTitle: [
				'词是否有全球统一的定义？',
				'句是否有全球统一的定义？',
				'是否有全球统一的语法范畴？',
				'词中的元素（语素）与句中的元素（句子成份）是否遵循相同的规则？',
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
		}).then((res) => {
			this.name = res.data[status + 'name']
		})
	},
	mounted() {},
	methods: {
		jumpToAnswer() {
			this.$refs.input.focus()
		},
		// 上传回答
		submit() {},
	},
	components: {
		ValidCode,
	},
}
</script>

<style lang="scss" scoped>
.bg {
	background-color: #697ce7 !important;
}
.tag {
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	width: 8px;
}
.chipTag {
	position: relative !important;
}
</style>