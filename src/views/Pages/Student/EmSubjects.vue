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
								</v-col>
							</v-row>
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
								<template v-slot:item.score="{item}">
									<v-chip color="success">最终成绩：{{scores[0]?Math.max(...scores):0}}分</v-chip>
									<v-dialog
										v-model="item.dialog2"
										width="500"
										fullscreen
									>
										<template v-slot:activator="{ on, attrs }">
											<v-chip
												v-bind="attrs"
												v-on="on"
												color="error"
												style="cursor:pointer"
												class="ml-4"
											>查看以往成绩</v-chip>
										</template>
										<v-card
											max-width="400"
											tile
										>
											<v-row style="height:130px"></v-row>
											<v-row>
												<v-col></v-col>
												<v-col>
													<v-subheader>历史成绩</v-subheader>
													<v-list-item
														v-for="(score,index) in scores"
														:key="index"
													>
														<v-list-item-content>
															<v-list-item-title>第{{index+1}}次成绩：{{score}}</v-list-item-title>
														</v-list-item-content>
													</v-list-item>
												</v-col>
												<v-col></v-col>
											</v-row>
										</v-card>

									</v-dialog>
								</template>

								<template v-slot:item.action="{ item }">
									<v-dialog
										v-model="item.dialog"
										fullscreen
										hide-overlay
										transition="dialog-bottom-transition"
									>
										<template v-slot:activator="{ on, attrs }">
											<v-btn
												v-bind="attrs"
												v-on="on"
												color="success"
												class="text-caption my-2 white--text "
												style="border-radius:5px"
												@click="answerPaper(item)"
												:disabled="answer"
											>开始答题</v-btn>
										</template>
										<v-card>
											<v-toolbar
												dark
												color="primary"
											>
												<v-btn
													icon
													dark
													@click="item.dialog = false"
												>
													<v-icon>mdi-close</v-icon>退出
												</v-btn>
												<v-toolbar-title>倒计时:30:00</v-toolbar-title>
												<v-spacer></v-spacer>
												<v-toolbar-items>
													<v-btn
														dark
														text
														@click="submitPaper(item)"
													>
														交卷
													</v-btn>
												</v-toolbar-items>
											</v-toolbar>
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

									<v-dialog
										v-model="item.dialog1"
										fullscreen
										hide-overlay
										transition="dialog-bottom-transition"
									>
										<template v-slot:activator="{ on, attrs }">
											<v-btn
												v-bind="attrs"
												v-on="on"
												color="error"
												class="text-caption my-2 white--text mx-4"
												style="border-radius:5px"
												:disabled="answerAgain"
												@click="answerPaperAgain(item)"
											>重做</v-btn>
										</template>
										<v-card>
											<v-toolbar
												dark
												color="primary"
											>
												<v-btn
													icon
													dark
													@click="item.dialog1 = false"
												>
													<v-icon>mdi-close</v-icon>退出
												</v-btn>
												<v-toolbar-title>倒计时:30:00</v-toolbar-title>
												<v-spacer></v-spacer>
												<v-toolbar-items>
													<v-btn
														dark
														text
														@click="submitPaper(item)"
													>
														交卷
													</v-btn>
												</v-toolbar-items>
											</v-toolbar>
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

									<v-dialog
										v-model="item.dialog3"
										fullscreen
										hide-overlay
										transition="dialog-bottom-transition"
									>
										<template v-slot:activator="{ on, attrs }">
											<v-btn
												v-bind="attrs"
												v-on="on"
												color="primary"
												class="text-caption my-2 white--text"
												style="border-radius:5px"
											>查看试卷</v-btn>

										</template>
										<v-card>
											<v-toolbar
												dark
												color="primary"
											>
												<v-btn
													icon
													dark
													@click="item.dialog3 = false"
												>
													<v-icon>mdi-close</v-icon>退出
												</v-btn>
											</v-toolbar>
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
import { getStudentInfo, getStudentClasses } from '@/api/Info'

import {
	getStudentAllPapers,
	getTime,
	getQuestions,
	getStudentAnswers,
} from '@/api/Paper'
import { getUserAccount } from '@/api/Login'
export default {
	name: 'About',
	components: {},
	data() {
		return {
			name: '', // 学生名字
			account: '', // 学生账号

			// 全部课程
			subjects: [
				{
					course: '数据结构',
					id: 0,
					due: getTime(),
					person: 'simon',
					status: 'ongoing',
					// 该课程下所有的试卷
					papers: [
						{
							pid: 0,
							deadline: getTime(),
							tnum: this.account,
							pdescribe: '默认名称',
						},
					],
					search: '',
				},
				{
					course: '数据库',
					id: 1,
					due: getTime(),
					person: 'cuifan',
					status: 'ongoing',
					papers: [],
					search: '',
				},
			],

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
				{ text: '成绩', value: 'score' },
			],
			questions: JSON.parse(
				'[{"qid":562,"qcontent":"1+1","point":"10","qanswer":"A=1&B=2&C=3&D=4;answer=2","pid":65,"qnum":1},{"qid":563,"qcontent":"1+1","point":"10","qanswer":"A=1&B=2&C=3&D=4;answer=2","pid":65,"qnum":2},{"qid":564,"qcontent":"1+1","point":"10","qanswer":"A=1&B=2&C=3&D=4;answer=2","pid":65,"qnum":3},{"qid":565,"qcontent":"1+1","point":"10","qanswer":"A=1&B=2&C=3&D=4;answer=2","pid":65,"qnum":4},{"qid":566,"qcontent":"1+2","point":"10","qanswer":"A=1&B=2&C=3&D=4;answer=2","pid":65,"qnum":5},{"qid":567,"qcontent":"1+2","point":"10","qanswer":"A=1&B=2&C=3&D=4;answer=2","pid":65,"qnum":6},{"qid":568,"qcontent":"1+2","point":"10","qanswer":"A=1&B=2&C=3&D=4;answer=2","pid":65,"qnum":7},{"qid":569,"qcontent":"1+2","point":"10","qanswer":"A=1&B=2&C=3&D=4;answer=2","pid":65,"qnum":8},{"qid":570,"qcontent":"1+2","point":"10","qanswer":"A=1&B=2&C=3&D=4;answer=2","pid":65,"qnum":9},{"qid":571,"qcontent":"1+2","point":"10","qanswer":"A=1&B=2&C=3&D=4;answer=2","pid":65,"qnum":10}]'
			), // 全部试题内容
			// 控制再次答题按钮
			answer: false,
			answerAgain: true,
			scores: [], // 保存每一次的成绩
		}
	},
	computed: {},
	created() {
		//获取本地试题
		this.questions.forEach((question) => {
			question['select'] = '' // 用户选择的答案
			question['right'] = question.qanswer.split(';')[1].split('=')[1] // 正确的答案
		})
		// 获取学生个人信息
		this.account = getUserAccount()

		getStudentInfo({
			snum: this.account,
		})
			.then((res) => {
				this.name = res.data.sname
				// 获取学生课程列表
				return getStudentClasses({
					snum: this.account,
				})
			})
			.then((res) => {
				// console.log(res)
				// res.data.forEach((item) => {
				// 	this.subjects.push({
				// 		course: item.cname,
				// 		id: item.cid,
				// 		due: getTime(),
				// 		person: this.name,
				// 		status: 'ongoing',
				// 		papers: [],
				// 		search: '',
				// 	})
				// })
				// // 获取学生对应课程下的所有试卷
				// this.subjects.forEach((subject) => {
				// 	getStudentAllPapers({
				// 		cid: subject.id,
				// 		snum: this.account,
				// 	}).then((res) => {
				// if (!res.data.msg) {
				// 	subject.papers = JSON.parse(JSON.stringify(res.data))
				// 	subject.papers.forEach((paper) => {
				// 		paper['paperName'] = paper.pdescribe
				// })
				// }
				// })
				// })
			})
	},

	methods: {
		// 开始答题
		answerPaper(item) {
			this.scores = []
			this.answer = true
			this.answerAgain = !this.answer
			// 根据试卷id获取全部试题
			// getQuestions({
			// 	pid: item.pid,
			// }).then((res) => {
			// 	this.questions = res.data
			// 	this.questions.forEach((question) => {
			// 		question['select'] = '' // 用户选择的答案
			// 		question['right'] = question.qanswer.split(';')[1].split('=')[1] // 正确的答案
			// 	})
			// })
		},
		answerPaperAgain(item) {
			this.questions.forEach((question) => {
				question.select = ''
			})
		},
		submitPaper(item) {
			let scoreNew = 0
			this.questions.forEach((question) => {
				scoreNew += question.point * Number(question.right === question.select)
			})
			if (item.hasOwnProperty('dialog1')) {
				item.dialog1 = false
			} else {
				item.dialog = false
			}
			this.$message({
				type: 'success',
				message: '交卷成功',
			})
			this.scores.push(scoreNew)
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
