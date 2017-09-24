<template>
	<div class="tagsCom">
		<div class="title">tag cloud</div>
		<div class="sep"></div>
		<ul class="tags">
			<li v-for="(item, index) in tags" :key="index" v-show="index <= 10 || isMore" @click="chooseTag(item.tag)">
				<a href="javascript:void(0)">{{item.tag}}</a>
			</li>
		</ul>
		<div class="more" v-if="tags.length > 11 && !isMore" @click="getMore">
			<span>查看更多</span>
			<i>></i>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isMore: false
		}
	},
	props: {
		tags: {
			type: Array,
		}
	},
	methods: {
		chooseTag(itemTag) {
			this.$emit('toTag', itemTag)
		},
		getMore() {
			this.isMore = true
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
		max-height: 204px;
		overflow-y: auto;
		&::-webkit-scrollbar {
			width: 5px;
			height: 5px;
		}

		&::-webkit-scrollbar-track-piece {
			background-color: rgba(0, 0, 0, 0.2);
			-webkit-border-radius: 6px;
		}

		&::-webkit-scrollbar-thumb:vertical {
			height: 5px;
			background-color: rgba(125, 125, 125, 0.5);
			-webkit-border-radius: 6px;
		}

		&::-webkit-scrollbar-thumb:horizontal {
			width: 5px;
			background-color: rgba(125, 125, 125, 0.7);
			-webkit-border-radius: 6px;
		}
		li {
			float: left;
			font-size: 12px;
			padding: 5px 8px;
			margin: 0 6px 10px 0;
			background-color: #00b5a3;
			border-radius: 6px;
			cursor: pointer;
			transition: all .5s;
			&:hover {
				background-color: #e91e63;
			}
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