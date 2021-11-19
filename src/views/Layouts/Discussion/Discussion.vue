<template>
	<div>
		<!-- header -->
		<v-container fluid>
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
					<v-icon color="success darken-2">
						mdi-message-text
					</v-icon>
					<!-- todo v-row的aligin设置成center后无分隔线 -->
					<v-divider
						class="mx-2"
						vertical
					></v-divider>
					<span style="color:#9e9e9e ;font-size:20px">提问交流区</span>
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
							persistent
						>
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									color="success"
									v-bind="attrs"
									v-on="on"
									flat
								>
									我要提问
								</v-btn>

								<v-btn
									color="#697ce7"
									dark
									flat
									class="ml-4"
								>
									我的问题
								</v-btn>
							</template>
							<v-card flat>
								<v-row class="ma-2">
									<v-card-title class="text-h5 lighten-2">
										我要提问
									</v-card-title>
								</v-row>

								<v-row class="mx-2 mt-2">
									<v-select
										:items="items"
										label="请选择课程类别"
										outlined
										class="mx-5"
									></v-select>
								</v-row>
								<v-textarea
									solo
									flat
									outlined
									name="input-7-4"
									label=""
									ref="input"
									filled
									no-resize
									rows="6"
									class="mx-8 mt-4"
									placeholder="请输入您的问题"
								></v-textarea>

								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn
										color="error"
										@click="dialog = false"
										class="my-4"
									>
										取消</v-btn>
									<v-btn
										color="success"
										class="ma-4"
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
import { getUserAccount } from '@/api/Login'
import { getStudentInfo, getTeacherInfo } from '@/api/Info'
// 只是驗證碼樣式
import ValidCode from '../ValidCode/validCode.vue'
export default {
	name: 'discussion',
	data() {
		return {
			name: '', //姓名
			answerText: '', //回答内容文本
			avatorCode: '', //头像对应的编码
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
</style>