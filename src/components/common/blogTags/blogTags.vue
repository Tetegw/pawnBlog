<template>
	<div class="tagsCom">
		<div class="title">tag cloud</div>
		<div class="sep"></div>
		<ul class="tags">
			<li v-for="(item, index) in tags" :key="index" v-if="index <= 14">
				<a href="javascript:void(0)">{{item.tag}}</a>
			</li>
		</ul>
		<div class="more" v-if="tags.length > 15">
			<span>查看更多</span>
			<i>></i>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		tags:{
			type: Array,
		}
	}
}

</script>

<style lang="less" scoped>
@import '../../../assets/style/common.less';
@mdedede : #dedede;
.tagsCom {
	margin-top: 40px;
	padding-left: 60px;
	.title {
		font-size: 16px;
		line-height: 32px;
		color: #aaaaaa;
		text-transform: uppercase;
	}
	.sep {
		width: 100%;
		height: 1px;
		margin: 6px 0 10px;
		background-color: @mdedede;
	}
	ul.tags {
		.clearfixMixin();
		margin-top: 20px;
		li {
			float: left;
			font-size: 12px;
			padding: 5px 8px;
			margin: 0 6px 10px 0;
			background-color: #00b5a3;
			border-radius: 6px;
			cursor: pointer;
			.sliderlight();
			a {
				color: #fff;
			}
		}
	}
	.more {
		line-height: 30px;
		text-align: center;
		border-radius: 2px;
		border: 1px solid #dcdcdc;
		font-size: 14px;
		color: #787878;
		background-color: #f7f7f7;
		margin-top: 15px;
		cursor: pointer;
	}
}
</style>