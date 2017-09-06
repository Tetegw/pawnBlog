<template>
	<div class="container">
		<div class="emptyBox"></div>
		<v-article></v-article>
		<v-sidebar></v-sidebar>
	</div>
</template>

<script>
import Article from '@/components/common/article/index';
import Sidebar from '@/components/blog/sidebar/index';

export default {
	components: {
		'v-article': Article,
		'v-sidebar': Sidebar,
	},
	mounted() {
		console.log('blog mounted')
	}
}

</script>

<style lang="less" scoped>
@import '../../../assets/style/common.less';
.container {
	width: 1000px;
	position: relative;
	margin: 70px auto 0;
	.clearfixMixin();
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