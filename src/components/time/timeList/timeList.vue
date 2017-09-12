<template>
	<div class="timeList">
		<div v-for="(item, index) in yearList" :key="index">
			<h2>{{index.substring(4)}}</h2>
			<ul>
				<li v-for="(article, idx) in item" :key="idx">
					<div class="date">{{article.date.substring(5, 10)}}</div>
					<div class="title" @click="toArticlePage(article.ID)">{{article.mainTitle}}</div>
					<div class="tags">
						<span class="item" v-for="(tag, i) in article.tags" :key="i">{{tag}}</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		yearList:{
			type: Object
		}
	},
	methods: {
		toArticlePage(id) {
			const userId = this.$route.query.userId;
			if (userId === undefined) {
				this.$router.push({ path: '/article', query: { articleId: id } })
			} else {
				this.$router.push({ path: '/article', query: { userId: userId, articleId: id } })
			}
		},
	}
}

</script>

<style lang="less" scoped>
@import '../../../assets/style/common.less';
@m26a69a : #26a69a;
.timeList {
	width: 75%;
	padding: 34px 0;
	h2 {
		font-size: 22px;
	}
	ul {
		margin: 30px 0 60px 30px;
		li {
			line-height: 30px;
			padding-bottom: 10px;
			font-family: 'sourcesanspro', 'Helvetica Neue', Arial, sans-serif;
			.clearfixMixin();
			.date {
				float: left;
				margin-right: 30px;
				color: #919d9e;
			}
			.title {
				float: left;
				width: 400px;
				height: 30px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				color: #616969;
				cursor: pointer;
				transition: all .3s;
				&:hover {
					color: @m26a69a;
					transform: translateX(8px);
				}
			}
			.tags {
				float: right;
				.item {
					display: inline-block;
					padding: 0 8px;
					margin-right: 5px;
					font-size: 12px;
					line-height: 18px;
					border: 1px solid #5bc2b8;
					color: #5bc2b8;
					border-radius: 10px;
					transition: all .2s;
					cursor: pointer;
					&:hover {
						background-color: #5bc2b8;
						color: #fff;
					}
				}
			}
		}
	}
}
</style>