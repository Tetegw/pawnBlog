<template>
	<div class="catalogue" id="sideBarRippleWrap">
		<div class="title">gategories</div>
		<div class="sep"></div>
		<ul class="fadeOutList">
			<li class="ripple" @click="getArticle('all')" :class="{active: getArticleActive === 'all'}">
				<p></p>
				<i>></i>
				<span class="info">全部</span>
				<span class="number">{{allLength}}</span>
				<div class="rippleWrap">
					<span></span>
				</div>
			</li>
			<li class="ripple" v-for="(item, index) in categories" :key="index" @click="getArticle(item.ID)" v-show="index <= 3 || isMore" :class="{active: getArticleActive === item.ID}">
				<p></p>
				<i>></i>
				<span class="info">{{item.col}}</span>
				<span class="number">{{item.num}}</span>
				<div class="rippleWrap">
					<span></span>
				</div>
			</li>
		</ul>
		<div class="more" v-if="categories.length > 4 && !isMore" @click="getMore">
			<span>查看更多</span>
			<i>></i>
		</div>

	</div>
</template>

<script>
import { ListfadeOut, ripple } from '@/assets/script/common'
export default {
	data() {
		return {
			getArticleActive: 'all',
			isMore: false,
		}
	},
	props: {
		categories: {
			type: Array,
			default: []
		},
		currentCategories: {
			type: Number,
		}
	},
	computed: {
		allLength() {
			let totalNum = 0;
			this.categories.forEach(function(item) {
				totalNum += item.num
			}, this);
			return totalNum;
		}
	},
	watch: {
		categories() {
			this.$nextTick(() => {
				ListfadeOut();
				ripple('sideBarRippleWrap');
			})
		},
		currentCategories() {
			this.getArticleActive = 'all'
		}
	},
	methods: {
		getArticle(columnId) {
			// 点击置空
			this.getArticleActive = columnId
			this.$emit('getColumnArticle', columnId)
		},
		getMore() {
			this.isMore = true
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
			&.active {
				background: #4db6ac;
				i {
					color: #fff;
				}
				.info {
					color: #fff;
				}
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