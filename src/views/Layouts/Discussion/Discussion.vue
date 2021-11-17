<template>
	<div>
		<v-container >
			<v-row
				class="mb-2"
				align="center"
			>
				<v-icon
					large
					color="blue darken-2"
				>
					mdi-message-text
				</v-icon>
			<!-- todo 无分隔线 -->
				<v-divider
					class="mx-2"
					vertical
				></v-divider>
				<span>提问交流区</span>
			</v-row>
		</v-container>

		<!-- question and to answer button -->
		<v-card
			class="mx-auto mb-8"
			width="70vw"
			tile
		>
			<v-container>
					<v-row
						align="center"
					>
						<v-col
							:cols="8"
							class="ml-4"
							
						>
							<v-card-text>
								【提问】 lowcode的未来？
							</v-card-text>
						</v-col>
						<v-spacer></v-spacer>
						<v-col
						>
							<v-btn
								depressed
								color="primary"
								@click="jumpToAnswer"
							>
								我要回答
							</v-btn>
						</v-col>
					</v-row>
			</v-container>
		</v-card>
				
		<!-- answer and to answer -->
		<v-card
			class="mx-auto mb-15"
			width="70vw"

			tile
		>
					<!-- answer row -->
					<v-row
						v-for="k in 6"
						:key="k"
					>
						<v-col
							:cols="1"
							class="ml-4 mt-4"
						>
							<v-avatar
								color="primary"
								size="56"
							></v-avatar>
						</v-col>
						<v-col
							cols="10"
						>
							<v-card-text
							>
								<div class="grey--text">name</div>
								<div class="subtitle-1">answer</div>
							</v-card-text>
						</v-col>
						<v-spacer></v-spacer>
						
					</v-row>

					<v-divider
						class="my-2"
					></v-divider>
					<!-- to answer row -->
					<v-row>
						<!-- to answer left column -->
						<v-col
							:cols="1"
							class="ml-4 mt-4"
						>
							<v-avatar
								color="primary"
								size="56"
							></v-avatar>
						</v-col>
						<!-- to answer right column -->
						<v-col
							class="ml-4"
						>
							<v-row
								class="my-2"
							>
								<v-car-text>我来回答这个问题</v-car-text>
							</v-row>
							<v-row
								class="mr-10"
							>
								<v-textarea
									solo
									name="input-7-4"
									label=""
									ref="input"
									filled
									no-resize
									rows="6"
								></v-textarea>
							</v-row>
							<!-- 驗證提交行 -->
							<v-row 
								align="center"
							>
								<v-col
									cols="4"
									class="ml-n15"
								>
									<v-text-field
										label=""
										placeholder=""
										solo
										filled
										class="ml-12"
										prefix="验证码"
									></v-text-field>
								</v-col>
								<v-col
									cols="2"
									class="mt-n8"
								>
									<!-- <v-img
										lazy-src="https://picsum.photos/id/11/10/6"
										max-height="89"
										max-width="120"
										src="https://picsum.photos/id/11/500/300"
									></v-img> -->
									<!-- <Verify @success="alert('success')" @error="alert('error')" :type="1"></Verify> -->
									<ValidCode></ValidCode>
								</v-col>
								<v-spacer></v-spacer>
								<v-col
									cols="3"
									class="mb-8"
								>
									<v-car-text>您还可以输入160个字符</v-car-text>
								</v-col>
								<v-col
									cols="2"
								>
									<v-btn
										depressed
										color="primary"
										class="mb-8"
										@click="submit"
									>
										提交
									</v-btn>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
		</v-card>
	</div>
</template>

<script>
// 只是驗證碼樣式
import ValidCode from '../../../utils/validCode.vue'

export default {
	name:"discussion",
	data() {
		return {
			name: '', //姓名
			answerText:'', //回答内容文本
			avatorCode:'' //头像对应的编码
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