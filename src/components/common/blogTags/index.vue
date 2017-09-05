<template>
	<div class="tagsCom">
		<div class="title">tag cloud</div>
		<div class="sep"></div>
		<ul class="tags">
			<li><a href="javascript:void(0)">进阶</a></li>
			<li><a href="javascript:void(0)">面向对象</a></li>
			<li><a href="javascript:void(0)">进阶</a></li>
			<li><a href="javascript:void(0)">javascript</a></li>
			<li><a href="javascript:void(0)">面向对象</a></li>
			<li><a href="javascript:void(0)">进阶</a></li>
			<li><a href="javascript:void(0)">面向对象</a></li>
			<li><a href="javascript:void(0)">进阶</a></li>
			<li><a href="javascript:void(0)">进阶</a></li>
			<li><a href="javascript:void(0)">面向对象</a></li>
		</ul>
	</div>
</template>

<script>
export default{

}

</script>

<style lang="less" scoped>
@import '../../../assets/style/common.less';
@mdedede : #dedede;
.tagsCom{
	margin-top: 40px;
	padding-left: 60px;
	.title{
		font-size: 16px;
		line-height: 32px;
		color: #aaaaaa;
		text-transform: uppercase;
	}
	.sep{
		width: 100%;
		height: 1px;
		margin: 6px 0 10px;
		background-color: @mdedede;
	}
	ul.tags{
		.clearfixMixin();
		margin-top: 20px;
		li{
			float: left;
			font-size: 12px;
			padding: 5px 8px;
			margin:0 6px 10px 0;
			background-color: #00b5a3;
			border-radius: 6px;
			cursor:pointer;
			.sliderlight();
			a{
				color: #fff;
			}
		}
	}
}
</style>