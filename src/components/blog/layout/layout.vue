<template>
	<div class="container">
		<div class="emptyBox"></div>
		<v-article :articleList="articleList" @lastPage="lastPage" @firstPage="firstPage"></v-article>
		<v-sidebar @getColumnArticle="getColumnArticle" :categories="categories"></v-sidebar>
		<v-Message :messageShow="messageShow" :sendMessage="sendMessage"></v-Message>
	</div>
</template>

<script>
import Article from '@/components/common/article/article';
import Sidebar from '@/components/blog/sidebar/sidebar';
import Message from '@/components/common/Message/Message';

export default {
	data() {
		return {
			articleList: [],
			categories: [],
			messageShow: false,
			sendMessage: '',
			currentPage: 0,
		}
	},
	created() {
		this._getArticleList()
		this._getCategories()
	},
	methods: {
		getColumnArticle(columnId) {
			if (columnId === 'all') {
				const _this = this
				const userId = this.$route.query.userId;
				this.$http.get('/api/articleList?userId=' + userId).then(function(res) {
					this.articleList = res.body.list;
				}, function(res) {
					console.log(res);
				});
			} else {
				this.$http.get('/api/articleList?columnId=' + columnId).then(function(res) {
					this.articleList = res.body.list
				}, function(res) {
					console.log(res);
				})
			}
		},
		firstPage() {
			this._pageErrorMessage('已经是首页了')
		},
		lastPage() {
			this._pageErrorMessage('已经是尾页了')
		},
		_pageErrorMessage(msg) {
			//节流阀
			if (!this.messageShow) {
				const _this = this
				this.messageShow = true;
				this.sendMessage = msg
				setTimeout(function() {
					_this.messageShow = false;
				}, 1500)
			}
		},
		_getArticleList() {
			const _this = this
			const userId = this.$route.query.userId;
			this.$http.get('/api/articleList?userId=' + userId).then(function(res) {
				if (res.body.code === -1) {
					this.messageShow = true;
					this.sendMessage = res.body.message
					setTimeout(function() {
						_this.messageShow = false;
						_this.$router.push({ path: '/blog' })
						window.location.reload()
					}, 1500)
					return;
				}
				this.articleList = res.body.list;
			}, function(res) {
				console.log(res);
			});
		},
		_getCategories() {
			const userId = this.$route.query.userId;
			this.$http.get('/api/categories?userId=' + userId).then(
				function(res) {
					this.categories = res.body.list;
				},
				function(res) {
				}
			);
		}
	},
	mounted() {
		console.log('blog mounted')
	},
	components: {
		'v-article': Article,
		'v-sidebar': Sidebar,
		'v-Message': Message,
	},
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