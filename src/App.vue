<template>
	<div>
		<v-btn
			color="grey"
			@click="handleClick"
		>
			点击
		</v-btn>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'App',
	data: () => ({}),
	methods: {
		handleClick() {
			this.$message({
				type: 'success',
				message: '什么好',
			})
		},
	},
}
</script>
