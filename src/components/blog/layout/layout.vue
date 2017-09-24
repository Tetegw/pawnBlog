<template>
	<div class="container">
		<div class="emptyBox"></div>
		<v-article :articleList="articleList" @lastPage="lastPage" @firstPage="firstPage"></v-article>
		<v-sidebar @getColumnArticle="getColumnArticle" @toTag="toTag" :categories="categories" :tags="tags" :currentCategories="currentCategories"></v-sidebar>
		<v-Message :messageShow="messageShow" :sendMessage="sendMessage"></v-Message>
	</div>
</template>

<script>
import Article from '@/components/common/article/article';
import Sidebar from '@/components/common/sidebar/sidebar';
import Message from '@/components/common/Message/Message';

export default {
	data() {
		return {
			articleList: [],
			allArticleList: [],
			categories: [],
			tags: [],
			messageShow: false,
			sendMessage: '',
			currentPage: 0,
			currentCategories: 0,
		}
	},
	watch: {

	},
	created() {
		this._getArticleList()
		this._getBlogTags()
	},
	methods: {
		getColumnArticle(columnId) {
			if (columnId === 'all') {
				this.articleList = this.allArticleList
			} else {
				this.$http.get('/api/articleList?columnId=' + columnId).then(function(res) {
					this.articleList = res.body.list
				}, function(res) {
					console.log(res);
				})
			}
		},
		toTag(itemTag) {
			var tagList = this.allArticleList.filter((item) => {
				var findItem = item.tags.find((value) => {
					return value === itemTag
				})
				// undefined 或者 上传
				return findItem !== undefined
			})
			this.articleList = tagList
			// 给一个随机数，传入到栏目里，每次都会变化，每次都会触发监听器
			this.currentCategories = Math.random()
		},
		search(searchKeyword) {
			// 变化currentCategories，触发栏目回到all
			this.currentCategories = Math.random()
			if (!searchKeyword) {
				this.articleList = this.allArticleList
			} else {
				this.$http.get('/api/search?searchKeyword=' + searchKeyword).then(function(res) {
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
				//将所有的数据先存起来
				this.allArticleList = res.body.list;
				this._getCategories()
			}, function(res) {
				console.log(res);
			});
		},
		_getCategories() {
			let colListObj = {}
			this.allArticleList.forEach(function(item) {
				if (!colListObj[item.columnId]) {
					colListObj[item.columnId] = {
						"col": item.col,
						"num": 1
					}
				} else {
					++colListObj[item.columnId]["num"]
				}
			}, this);
			let newList = []
			for (var k in colListObj) {
				newList.push({
					"ID": k,
					"col": colListObj[k]["col"],
					"num": colListObj[k]["num"]
				})
			}
			this.categories = newList
		},
		_getBlogTags() {
			const userId = this.$route.query.userId;
			this.$http.get('/api/tags?userId=' + userId).then(
				function(res) {
					//对象去重
					this.tags = res.body.list
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