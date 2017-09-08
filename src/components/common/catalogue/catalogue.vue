<template>
	<div class="catalogue" id="sideBarRippleWrap">
		<div class="title">gategories</div>
		<div class="sep"></div>
		<ul class="fadeOutList">
			<li class="ripple" v-for="(item, index) in categories" :key="index" @click="getArticle(item.ID)">
				<p></p>
				<i>></i>
				<span class="info">{{item.column}}</span>
				<span class="number">{{item.num}}</span>
				<div class="rippleWrap">
					<span></span>
				</div>
			</li>
		</ul>
		<div class="more">
			<span>查看更多</span>
			<i>></i>
		</div>
	</div>
</template>

<script>
import { ListfadeOut, ripple } from '@/assets/script/common'
export default {
	props: {
		categories: {
			type: Array,
			default: []
		}
	},
	watch: {
		categories() {
			this.$nextTick(() => {
				ListfadeOut();
				ripple('sideBarRippleWrap');
			})
		}
	},
	methods: {
		getArticle(columnId) {
			this.$emit('getColumnArticle', columnId)
		}
	}
}
</script>

<style lang="less">
@import '../../../assets/style/common.less';
@m26a69a : #26a69a;
@mdedede : #dedede;
@m383838: #383838;
.catalogue {
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
	ul {
		.rippleMixin(0px, 32px, rgba(255, 255, 255, .4), 400, catalogue);
		font-size: 0;
		li {
			width: 100%;
			font-size: 14px;
			line-height: 32px;
			color: @m383838;
			p {
				position: absolute;
				height: 32px;
				top: 0;
				left: 0;
				width: 100%;
				background: #4db6ac;
				opacity: 0;
				filter: alpha(opacity=0);
			}
			i {
				position: absolute;
				font-style: normal;
				font-family: sans-serif;
				padding: 0 5px 0 10px;
			}
			.info {
				position: absolute;
				left: 22px;
			}
			.number {
				position: absolute;
				top: 7px;
				right: 0;
				padding: 0 8px;
				height: 18px;
				line-height: 18px;
				font-size: 12px;
				background-color: #4db6ac;
				color: #fff;
				border-radius: 4px;
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