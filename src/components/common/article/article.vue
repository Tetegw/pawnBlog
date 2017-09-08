<template>
	<div class="article" id="articleRippleWrap">
		<ul>
			<li class="item" v-for="(item, index) in articleList" :key="index">
				<p class="mainTitle" @click="toArticlePage(item.ID)">{{item.mainTitle}}</p>
				<p class="subTitle">{{item.subTitle}}</p>
				<ul class="tags">
					<li v-for="(tag, index) in item.tags" :key="index">{{tag}}</li>
				</ul>
				<p class="intro">{{item.intro}}</p>
				<div class="info">
					<div class="date">发表时间：{{item.date}}&nbsp;&nbsp;</div>
					<div class="column">|&nbsp;&nbsp;分类：
						<a href="javascript:void(0)">{{item.column}}</a>
					</div>
					<div class="more">
						<a class="ripple">
							<span class="info">...more</span>
							<div class="rippleWrap">
								<span></span>
							</div>
						</a>
					</div>
				</div>
			</li>
		</ul>
		<div class="pagination">
			<div class="prev">
				<i>&lt;</i>
				上一页
			</div>
			<div class="next">
				下一页
				<i>&gt;</i>
			</div>
		</div>
	</div>
</template>

<script>
import Pagination from '@/components/common/pagination/pagination';
import { ripple } from '@/assets/script/common';

export default {
	props: {
		articleList: {
			type: Array,
			default: []
		}
	},
	watch: {
		articleList() {
			this.$nextTick(() => {
				ripple('articleRippleWrap');
			})
		}
	},
	methods: {
		// 事件监听获取到分页组件的数据
		getPage(activeIndex) {
			console.log(activeIndex)
		},
		toArticlePage(id) {
			const userId = this.$route.query.userId;
			this.$router.push({ path: '/article', query: { userId: userId, articleId: id } })
		},

	},
	components: {
		'v-pagination': Pagination,
	},
}

</script>

<style lang="less">
@import '../../../assets/style/common.less';
@m26a69a : #26a69a;
@m009688 : #009688;
@mdedede : #dedede;
@m383838: #383838;
.article {
	width: 75%;
	float: left;
	position: relative;
	.item {
		padding: 34px 20px 20px;
		border-bottom: 1px solid @mdedede;
		transition: all .3s;
		&:hover {
			box-shadow: 0 5px 10px 2px rgba(0, 0, 0, .1);
		}
	}
	.mainTitle {
		font-size: 20px;
		line-height: 34px;
		color: @m26a69a;
		cursor: pointer;
		&:hover {
			text-decoration: underline;
		}
	}
	.subTitle {
		font-size: 16px;
		line-height: 30px;
		color: @m383838;
	}
	ul.tags {
		.clearfixMixin();
		margin-top: 10px;
		li {
			float: left;
			font-size: 12px;
			padding: 5px 10px;
			margin-right: 10px;
			color: #fff;
			background-color: #00b5a3;
			border-radius: 6px;
			cursor: pointer;
			transition: all .5s;
			&:hover {
				background-color: #e91e63;
			}
		}
	}
	.intro {
		font-family: 'sourcesanspro', 'Helvetica Neue', Arial, sans-serif;
		margin-top: 20px;
		font-size: 14px;
		color: #828282;
		line-height: 24px;
		.txt-cut(3);
	}
	.info {
		font-family: 'sourcesanspro', 'Helvetica Neue', Arial, sans-serif;
		margin-top: 30px;
		font-size: 14px;
		line-height: 20px;
		.clearfixMixin();
		.date,
		.column {
			float: left;
			font-size: 12px;
			color: #828282;
			&:hover a {
				color: @m26a69a;
			}
		}
		.more {
			float: right;
			border-radius: 2px;
			.rippleMixin(0px, 20px, rgba(0, 181, 163, .3), 100, more);
			a {
				color: @m26a69a;
			}
		}
	}
	.pagination {
		margin: 50px 0 80px;
		padding: 0 20px;
		.clearfixMixin();
		.prev,
		.next {
			color: #2e9c92;
			font-size: 14px;
			line-height: 30px;
			padding: 0 10px;
			border-radius: 2px;
			cursor: pointer;
			transition: all .3s;
		}
		.prev:hover,
		.next:hover {
			color: #fff;
			background-color: #2e9c92;
		}
		.prev {
			float: left;
		}
		.next {
			float: right
		}
		i {
			font-family: sans-serif;
			font-style: normal
		}
	}
}
</style>
