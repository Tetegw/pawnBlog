<template>
	<div class="time">
		<div class="emptyBox"></div>
		<v-timeList :yearList="yearList"></v-timeList>
		<v-sidebar @getColumnArticle="getColumnArticle" @toTag="toTag" :categories="categories" :tags="tags" :currentCategories="currentCategories"></v-sidebar>
	</div>
</template>

<script>
import Sidebar from '@/components/common/sidebar/sidebar'
import TimeList from '@/components/time/timeList/timeList'
import { ripple } from '@/assets/script/common'
export default {
	data() {
		return {
			articleList: [],
			allArticleList: [],
			yearList: {},
			categories: [],
			tags: [],
			currentCategories: 0,
		}
	},
	components: {
		'v-sidebar': Sidebar,
		'v-timeList': TimeList,
	},
	created() {
		this._getArticleList()
	},
	methods: {
		getColumnArticle(columnId) {
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
		toTag(itemTag) {
			var tagList = this.allArticleList.filter((item) => {
				var findItem = item.tags.find((value) => {
					return value === itemTag
				})
				// undefined 或者 上传
				return findItem !== undefined
			})
			console.log(tagList);
			this.articleList = tagList
			this._filterYear()
			// 给一个随机数，传入到栏目里，每次都会变化，每次都会触发监听器
			this.currentCategories = Math.random()
		},
		_getArticleList() {
			const userId = this.$route.query.userId;
			this.$http.get('/api/articleList?userId=' + userId).then(function(res) {
				this.articleList = res.body.list;
				this.allArticleList = res.body.list;
				this._getCategories()
				this._filterYear()
				this._getBlogTags()
			}, function(res) {
				console.log(res);
			});
		},
		_filterYear() {
			const yearList = {}
			this.articleList.forEach(function(item) {
				var year = item.date.substring(0, 4)
				if (yearList['yaer' + year] === undefined) {
					yearList['yaer' + year] = []
				}
				yearList['yaer' + year].push(item)
			}, this);
			this.yearList = yearList
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
			let newList = []
			this.allArticleList.forEach(function(item) {
				item.tags.forEach(function(element) {
					let newObj = {}
					newObj.tag = element
					newList.push(newObj)
				}, this);
			}, this);
			this.tags = newList
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