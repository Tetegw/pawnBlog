<template>
	<div class="time">
		<div class="emptyBox"></div>
		<v-timeList :articleList="articleList" :yearList="yearList"></v-timeList>
		<v-sidebar  @getColumnArticle="getColumnArticle" :categories="categories" :tags="tags"></v-sidebar>
	</div>
</template>

<script>
import Sidebar from '@/components/common/sidebar/sidebar'
import TimeList from '@/components/time/timeList/timeList'
import { ripple } from '@/assets/script/common'
export default {
	data () {
		return {
			articleList: [],
			yearList: {},
			categories: [],
			tags:[]
		}
	},
	components: {
		'v-sidebar': Sidebar,
		'v-timeList': TimeList,
	},
	created () {
		this._getArticleList()
		this._getCategories()
		this._getBlogTags()
	},
	methods: {
		getColumnArticle(columnId){
			if (columnId === 'all') {
				this._getArticleList()
			} else {
				this.$http.get('/api/articleList?columnId=' + columnId).then(function(res) {
					this.articleList = res.body.list
					this._filterYear()
				}, function(res) {
					console.log(res);
				})
			}
		},
		_getArticleList() {
			const userId = this.$route.query.userId;
			this.$http.get('/api/articleList?userId=' + userId).then(function(res) {
				this.articleList = res.body.list;
				this._filterYear()
			}, function(res) {
				console.log(res);
			});
		},
		_filterYear() {
			const yearList = {}
			this.articleList.forEach(function(item) {
				var year = item.date.substring(0, 4)
				if (yearList['yaer'+year] === undefined) {
					yearList['yaer'+year] = []
				}
				yearList['yaer'+year].push(item)
			}, this);
			this.yearList = yearList
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
		},
		_getBlogTags(){
			const userId = this.$route.query.userId;
			this.$http.get('/api/tags?userId=' + userId).then(
				function(res) {
					this.tags = res.body.list;
				},
				function(res) {
				}
			);
		}
	},
	mounted() {
		console.log('time mounted')
	}
}
</script>

<style lang="less" scoped>
.time {
	width: 1000px;
	margin: 90px auto 0;
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