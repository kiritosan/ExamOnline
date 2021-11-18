<template>
	<div>
		<!-- header -->
		<v-container
			fluid
		>
			<!-- header -->
			<v-row
				align="center"
				class="mb-1"
			>
				<!-- blank name -->
				<v-col
					cols="8"
					class="ml-7"
				>
					<v-icon
						large
						color="blue darken-2"
					>
						mdi-message-text
					</v-icon>
				<!-- todo v-row的aligin设置成center后无分隔线 -->
					<v-divider
						class="mx-2"
						vertical
					></v-divider>
					<span>提问交流区</span>
				</v-col>
				<v-spacer></v-spacer>
				<!-- ask button -->
				<v-col
					cols="2"
					class="mr-2"
				>
				  <div class="text-center">
						<v-dialog
							v-model="dialog"
							width="600"
						>
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									color="red lighten-2"
									dark
									v-bind="attrs"
									v-on="on"
								>
									我要提问
								</v-btn>
							</template>
							<v-card>
								<v-row
									class="ma-2"
								>
									<v-card-title class="text-h5 lighten-2">
										我要提问
									</v-card-title>
								</v-row>

								<v-row
									class="mx-2 mt-2"
								>
									<v-select
										:items="items"
										label="课程"
										outlined
									></v-select>
								</v-row>
								<v-textarea
									solo
									name="input-7-4"
									label=""
									ref="input"
									filled
									no-resize
									rows="6"
									class="ma-2"
									placeholder="请输入要提问的内容"
								></v-textarea>
								

								<v-card-actions
									
								>
									<v-spacer></v-spacer>
									<v-btn
										color="primary"
										text
										@click="dialog = false"
									>
										提交
									</v-btn>
								</v-card-actions>
							</v-card>
						</v-dialog>
					</div>
				</v-col>
			</v-row>
		</v-container>

		<router-view>
		</router-view>
		
	</div>
</template>

<script>
import { getStudentInfo, getUserAccount, getTeacherInfo } from '@/api/Login'
// 只是驗證碼樣式
import ValidCode from '../ValidCode/validCode.vue'
export default {
	name:"discussion",
	data() {
		return {
			name: '', //姓名
			answerText:'', //回答内容文本
			avatorCode:'', //头像对应的编码
			dialog: false,
			page: 1,
			items: ['数据库', '编译原理', '操作系统', '计算机组成原理'],
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