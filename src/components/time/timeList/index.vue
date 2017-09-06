<template>
	<div class="timeList">
		<div v-for="(item, index) in yearList" :key="index">
			<h2>{{item}}</h2>
			<ul>
				<li v-for="(item, index) in articleList" :key="index">
					<div class="date">{{item.date.substring(5, 10)}}</div>
					<div class="title" @click="toArticlePage(item.ID)">{{item.mainTitle}}</div>
					<div class="tags">
						<span class="item" v-for="(tag, idx) in item.tags" :key="idx">{{tag}}</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			articleList: [],
			yearList: [],
		}
	},
	created() {
		this._getArticleList()
	},
	methods: {
		toArticlePage(id) {
			this.$router.push({ path: '/article', query: { articleId: id } })
		},
		_getArticleList() {
			this.$http.get('/api/articleList').then(function(res) {
				this.articleList = res.body.list;
				this._filterYear()
			}, function(res) {
				console.log(res);
			});
		},
		_filterYear() {
			const yearList = []
			this.articleList.forEach(function(item) {
				yearList.push(item.date.substring(0, 4))
			}, this);
			this.yearList = [...new Set(yearList)]
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