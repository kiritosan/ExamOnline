<template>
	<div class="about">
		<v-container>
			<v-expansion-panels>
				<v-expansion-panel
					v-for="subject in subjects"
					:key="subject.course"
				>
					<v-expansion-panel-header>
						<v-card flat>
							<v-row :class="`ma-0 subject ${subject.status}`">
								<v-col
									cols="12"
									md="6"
								>
									<h1 class="text-caption grey--text mb-2">课程名称</h1>
									<p>{{subject.course}}</p>
								</v-col>
								<v-col
									cols="6"
									sm="4"
									md="2"
								>
									<h1 class="text-caption grey--text mb-2">出题人</h1>
									<p>{{subject.person}}</p>
								</v-col>
								<v-col
									cols="6"
									sm="4"
									md="2"
								>
									<h1 class="text-caption grey--text mb-2">截止时间</h1>
									<p>{{subject.due}}</p>
								</v-col>
								<v-col
									cols="2"
									sm="4"
									md="2"
								>
									<div class="float-right">
										<v-dialog
											v-model="subject.dialog"
											persistent
											max-width="440"
										>
											<template v-slot:activator="{ on, attrs }">
												<v-chip
													:class="`${subject.status}  text-caption my-2 white--text`"
													style="cursor:pointer"
													@click="addPaper(subject)"
													v-bind="attrs"
													v-on="on"
												>添加试卷</v-chip>
											</template>
											<v-card
												flat
												outlined
												min-height="600"
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
														class="mx-6  py-2"
														v-if="tab==0"
													>
														<v-card-title class="mb-3">{{qnum}}. 请输入题目:</v-card-title>
														<v-row class="px-2 pr-4 ml-9 mr-3 mb-3">
															<v-text-field
																v-model="qcontent"
																:rules="optionRules"
																required
																dense
															></v-text-field>
														</v-row>
														<v-row class="px-2 pr-4">
															<span
																style="color:#666"
																class="mt-2 mx-2"
															>A选项:</span>
															<v-text-field
																v-model="optionA"
																:rules="optionRules"
																required
																outlined
																dense
															></v-text-field>
														</v-row>
														<v-row class="px-2 pr-4">
															<span
																style="color:#666"
																class="mt-2 mx-2"
															>B选项:</span>
															<v-text-field
																v-model="optionB"
																:rules="optionRules"
																required
																outlined
																dense
															></v-text-field>
														</v-row>
														<v-row class="px-2 pr-4">
															<span
																style="color:#666"
																class="mt-2 mx-2"
															>C选项:</span>
															<v-text-field
																v-model="optionC"
																:rules="optionRules"
																required
																outlined
																dense
															></v-text-field>
														</v-row>
														<v-row class="px-2 pr-4">
															<span
																style="color:#666"
																class="mt-2 mx-2"
															>D选项:</span>
															<v-text-field
																v-model="optionD"
																:rules="optionRules"
																required
																outlined
																dense
															></v-text-field>
														</v-row>
														<v-row class="px-2 pr-4">
															<span
																style="color:#666"
																class="mt-2 mx-2"
															>正确答案:</span>
															<v-text-field
																v-model="qanswer"
																:rules="optionRules"
																required
																outlined
																dense
															></v-text-field>
														</v-row>
														<div class="justify-center d-flex my-4">
															<v-btn
																color="success"
																class="mr-4"
																@click="exit(subject)"
															>
																退出
															</v-btn>
															<v-btn
																color="error"
																class="mr-4"
																@click="reset"
															>
																重置
															</v-btn>
															<v-btn
																color="success"
																class="mr-4"
																@click="addAgain"
																:disabled="!valid"
															>
																继续添加
															</v-btn>
															<v-btn
																color="error"
																class="mr-4"
																:disabled="confirm"
																@click="addAgain(subject)"
															>
																确认
															</v-btn>
														</div>
													</v-form>
												</v-tabs-items>
											</v-card>
										</v-dialog>
									</div>
								</v-col>
							</v-row>
							<v-divider></v-divider>
						</v-card>
					</v-expansion-panel-header>
					<v-expansion-panel-content>
						<v-card flat>
							<v-row>
								<v-col>
									<v-card-title>{{subject.course}}</v-card-title>
								</v-col>
								<v-col>
									<v-text-field
										v-model="subject.search"
										append-icon="mdi-magnify"
										label="输入试卷名称"
										single-line
										hide-details
									></v-text-field>
								</v-col>
							</v-row>
							<v-data-table
								:headers="headers"
								:items="subject.papers"
								:search="subject.search"
							>
								<template v-slot:item.action="{ item }">

									<v-dialog
										v-model="item.dialog"
										persistent
										max-width="420"
									>
										<template v-slot:activator="{ on, attrs }">
											<v-chip
												v-bind="attrs"
												v-on="on"
												color="success"
												class="text-caption my-2 white--text "
												style="cursor:pointer"
											>编辑</v-chip>
										</template>
										<v-card>
											<v-card-title class="text-h5">
												编辑试卷【{{item.paperName}}】
											</v-card-title>
											<v-card-text>
												<v-form
													ref="item.pid"
													v-model="valid1"
													lazy-validation
													class="mt-8 mx-4 mr-8"
												>
													<v-row>
														<p
															style="font-size:16px"
															class="mt-3"
															:rules="pdescribeRules"
														>试卷名称：</p>
														<v-text-field
															outlined
															dense
															v-model="item.pdescribe"
															:rules="pdescribeRules"
														></v-text-field>
													</v-row>
													<v-row>
														<p
															style="font-size:16px"
															class="mt-3"
														>截止日期：</p>
														<v-text-field
															outlined
															dense
															v-model="item.deadline"
															:rules="pdescribeRules"
														></v-text-field>
													</v-row>
												</v-form>
											</v-card-text>
											<v-card-actions>
												<v-spacer></v-spacer>
												<v-btn
													color="error darken-1"
													@click="item.dialog = false"
												>
													取消
												</v-btn>
												<v-btn
													color="success darken-1"
													@click="editPaper(item)"
													:disabled="!valid1"
												>
													确认
												</v-btn>
											</v-card-actions>
										</v-card>
									</v-dialog>

									<v-dialog
										v-model="item.dialog1"
										persistent
										max-width="420"
									>
										<template v-slot:activator="{ on, attrs }">
											<v-chip
												v-bind="attrs"
												v-on="on"
												color="error"
												class="text-caption my-2 white--text mx-4"
												style="cursor:pointer"
											>删除</v-chip>
										</template>
										<v-card>
											<v-card-title class="text-h5">
												确认要删除试卷【{{item.pdescribe}}】吗？
											</v-card-title>
											<v-card-actions>
												<v-spacer></v-spacer>
												<v-btn
													color="error darken-1"
													@click="item.dialog1 = false"
												>
													取消
												</v-btn>
												<v-btn
													color="success darken-1"
													@click="deletePaper(item)"
												>
													确认
												</v-btn>
											</v-card-actions>
										</v-card>
									</v-dialog>
									<v-dialog
										v-model="item.dialog2"
										fullscreen
										hide-overlay
										transition="dialog-bottom-transition"
									>
										<template v-slot:activator="{ on, attrs }">
											<v-chip
												v-bind="attrs"
												v-on="on"
												color="primary"
												class="text-caption my-2 white--text "
												style="cursor:pointer"
												@click="checkPaper(item)"
											>查看试卷</v-chip>
										</template>
										<v-card>
											<v-row>
												<v-col cols="3"></v-col>
												<v-col>
													<v-radio-group
														v-for="(question,index) in questions"
														:key="question.qid"
														v-model="question.select"
													>
														<v-card-title>{{index+1}}. {{question.qcontent}}</v-card-title>
														<v-radio
															class="ml-2"
															v-for="option in question.qanswer.split(';')[0].split('&')"
															:key="option[0]"
															:label="option[0]+'. '+ option.split('=')[1]"
															:value="option.split('=')[1]"
														></v-radio>
													</v-radio-group>
												</v-col>
											</v-row>
										</v-card>
									</v-dialog>
								</template>
							</v-data-table>
						</v-card>
					</v-expansion-panel-content>
				</v-expansion-panel>
			</v-expansion-panels>
		</v-container>
	</div>
</template>

<script>
import { getTeacherInfo, getTeacherClasses } from '@/api/Info'
import {
	getTeacherAllPapers,
	updatePaperInfo,
	getTime,
	createOnePaper,
	updateQuestion,
	getQuestions,
	deleteOnePaper,
} from '@/api/Paper'
import { getUserAccount } from '@/api/Login'
export default {
	name: 'About',
	data() {
		return {
			name: '', // 老师名字
			account: '',
			subjects: [],
			// attrs: true,
			// 验证表单输入合法性
			valid: false,
			valid1: false,
			notifications: false,
			sound: true,
			widgets: false,
			confirm: true, //添加题目确认按钮
			// 试卷表格头部
			headers: [
				{
					text: '试卷编号',
					align: 'start',
					sortable: false,
					value: 'pid',
				},
				{ text: '试卷名称', value: 'pdescribe' },
				{ text: '截至时间', value: 'deadline' },
				{ text: '操作', value: 'action' },
			],
			// 试卷名称验证规则
			pdescribeRules: [(v) => !!v || '试卷名称不能为空！'],
			// 试卷选项内容
			optionA: '',
			optionB: '',
			optionC: '',
			optionD: '',
			optionRules: [(v) => !!v || '内容不能为空'],
			// 添加试题
			tab: 0,
			items: ['选择题', '填空题'],
			// 题目
			qcontent: '',
			// 答案
			qanswer: '',
			// 序号
			qnum: 1,
			// 试卷id
			pid: '',
			// 全部试题
			questions: [],
		}
	},
	created() {
		// 获取老师个人信息
		this.account = getUserAccount()
		getTeacherInfo({
			tnum: this.account,
		})
			.then((res) => {
				this.name = res.data.tname
				// 获取老师课程列表
				return getTeacherClasses({
					tnum: this.account,
				})
			})
			.catch(() => {
				this.$message({
					type: 'error',
					message: '获取用户信息失败',
				})
			})
			.then((res) => {
				res.data.forEach((item) => {
					this.subjects.push({
						course: item.cname,
						id: item.cid,
						due: getTime(),
						person: this.name,
						status: 'ongoing',
						papers: [],
						search: '',
					})
				})

				// 获取老师所有试卷
				this.subjects.forEach((subject) => {
					getTeacherAllPapers({
						cid: subject.id,
						tnum: this.account,
					}).then((res) => {
						if (!res.data.msg) {
							subject.papers = JSON.parse(JSON.stringify(res.data))
							subject.papers.forEach((paper) => {
								paper['paperName'] = paper.pdescribe
							})
						}
					})
				})
			})
	},
	methods: {
		// 创建空白试卷
		addPaper(subject) {
			createOnePaper({
				cid: subject.id,
				tnum: this.account,
			}).then((res) => {
				if (res.data.state) {
					this.pid = res.data.pid
					subject.papers.push({
						pid: res.data.pid,
						deadline: getTime(),
						tnum: this.account,
						pdescribe: '默认名称',
					})
				}
			})
		},
		//向试卷添加题目
		addAgain(subject) {
			if (!this.validate()) {
				return this.$message({
					type: 'error',
					message: '请完整输入试题！',
				})
			}
			this.valid = false
			updateQuestion({
				qcontent: this.qcontent,
				qanswer:
					'A=' +
					this.optionA +
					'&B=' +
					this.optionB +
					'&C=' +
					this.optionC +
					'&D=' +
					this.optionD +
					';answer=' +
					this.qanswer,
				qnum: this.qnum,
				pid: this.pid,
			}).then((res) => {
				if (res.data.state) {
					if (this.qnum <= 9) {
						this.$message({
							type: 'success',
							message: '成功添加第' + this.qnum + '道试题！',
						})
					}
					if (this.qnum === 9) {
						// 第九道题发送成功
						this.valid = false
						this.confirm = false
					} else {
						this.valid = true
					}
					if (this.qnum === 10) {
						this.$message({
							type: 'success',
							message: '试卷添加成功',
						})
						this.exit(subject)
						this.confirm = true
						return
					}
					this.qnum++
				}
			})
		},
		// 重置添加试卷卡片
		reset() {
			;['A', 'B', 'C', 'D'].forEach((item) => {
				this['option' + item] = ''
				this.qcontent = ''
				this.qanswer = ''
			})
		},
		// 退出添加试卷卡片
		exit(subject) {
			subject.dialog = false
			this.qnum = 1
		},
		// 校验添加卡片表单
		validate() {
			let again = true
			;['A', 'B', 'C', 'D'].forEach((item) => {
				if (!this['option' + item]) {
					return (again = false)
				}
				again = this.qcontent && this.qanswer
			})
			return again
		},
		// 编辑试卷
		editPaper(item) {
			updatePaperInfo({
				pdescribe: item.pdescribe,
				pid: item.pid,
				deadline: getTime(),
			}).then((res) => {
				if (!res.data.state) return
				this.$message({
					type: 'success',
					message: '试卷信息更新成功',
				})
				item.dialog = false
			})
		},
		// 删除试卷
		deletePaper(item) {
			deleteOnePaper({
				pid: item.pid,
			})
				.then((res) => {
					console.log(res)
					if (res.data.state)
						this.$message({
							type: 'success',
							message: res.data.msg,
						})
					item.dialog1 = false
					window.location.reload()
				})
				.catch((error) => {
					this.$message({
						type: 'error',
						message: error.data.msg,
					})
				})
		},
		// 查看试卷
		checkPaper(item) {
			getQuestions({
				pid: item.pid,
			}).then((res) => {
				this.questions = res.data
				console.log(JSON.stringify(this.questions))
				this.questions.forEach((question) => {
					question['select'] = '' // 用户选择的答案
					question['right'] = question.qanswer.split(';')[1].split('=')[1]
					console.log(question['right'])
				})
			})
		},
	},
}
</script>

<style scoped>
.ongoing {
	border-left: 4px solid #3cd1c2;
}
.subject.complete {
	border-left: 4px solid orange;
}
.subject.overdue {
	border-left: 4px solid tomato;
}
.v-chip.v-chip--no-color.ongoing {
	background-color: #3cd1c2;
}
.v-chip.v-chip--no-color.complete {
	background-color: orange;
}
.v-chip.v-chip--no-color.overdue {
	background-color: tomato;
}
</style>
