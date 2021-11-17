<template>
	<div>
		<v-container>
			<v-row
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


		<v-card
			class="mx-auto"
			width="70vw"
			height="15vh"
			tile
		>
			<v-container>
					<v-row>
						<v-col
							:cols="8"
						>
							【提问】 lowcode的未来？
						</v-col>
						<v-spacer></v-spacer>
						<v-col
							:cols="2"
						>
							<v-btn
								depressed
								color="primary"
							>
								我要回答
							</v-btn>
						</v-col>
					</v-row>
			</v-container>
		</v-card>
				
		<v-card
			class="mx-auto"
			width="70vw"

			tile
		>
					<!-- answer row -->
					<v-row>
						<v-col
							:cols="1"
							
						>
							<v-avatar
								color="primary"
								size="56"
							></v-avatar>
						</v-col>
						<v-col :cols="11">
							<v-card-text>
								<div class="grey--text">name</div>
								<div class="subtitle-1">answer</div>
							</v-card-text>
						</v-col>
					</v-row>
					<!-- to answer row -->
					<v-row>
						<!-- to answer left column -->
						<v-col
							:cols="1"
						>
							<v-avatar
								color="primary"
								size="56"
							></v-avatar>
						</v-col>
						<!-- to answer right column -->
						<v-col>
							<v-car-text>我来回答这个问题</v-car-text>
							<v-textarea
								solo
								name="input-7-4"
								label=""
							></v-textarea>
							<!-- 驗證提交行 -->
							<v-row>
								<v-col
									:cols="2"
								>
									<v-car-text>验证码</v-car-text>
								</v-col>
								<v-col
									:cols="4"
								>
									<v-text-field
										label=""
										placeholder=""
										solo
									></v-text-field>
								</v-col>
								<v-col
									:cols="4"
								>
									<v-car-text>您还可以输入160个字符</v-car-text>
								</v-col>
								<v-col
									:cols="2"
								>
									<v-btn
										depressed
										color="primary"
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
		
	},
	mounted() {},

	methods: {
		
	},
}
</script>

<style lang="scss" scoped>
</style>