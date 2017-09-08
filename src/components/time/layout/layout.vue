<template>
	<div class="time">
		<div class="emptyBox"></div>
		<v-timeList></v-timeList>
		<v-sidebar></v-sidebar>
	</div>
</template>

<script>
import Sidebar from '@/components/time/sidebar/sidebar'
import TimeList from '@/components/time/timeList/timeList'
import { ripple } from '@/assets/script/common'
export default {
	components: {
		// 'v-article': Article,
		'v-sidebar': Sidebar,
		'v-timeList': TimeList,
	},
	mounted() {
		console.log('time mounted')
	}
}
</script>

<style lang="less" scoped>
.time {
	width: 1000px;
	margin: 90px auto 0;
	.emptyBox {
		height: 90px;
		width: 100%;
		position: fixed;
		z-index: 989;
		background-color: #fff;
		top: 0;
		left: 0;
	}
}
</style>