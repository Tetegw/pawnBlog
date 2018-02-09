<template>
	<div class="BDraft">
		<div class="allBlogContent">
			<v-article :articleList="articleList" :toEdit="toEdit" :isDraft="true" @lastPage="lastPage" @firstPage="firstPage"></v-article>
		</div>
	</div>
</template>

<script>
import Article from '@/components/common/article/article'
import { queryDrafteList } from '@/bmob'
export default {
	data() {
		return {
			articleList: [],
			toEdit: true
		}
	},
	mounted() {
		this._getArticleList()
	},
	methods: {
		_getArticleList() {
      queryDrafteList().then((res) => {
        	this.articleList = res
			}, function(res) {
				this.emit('showMessage', res)
			})
		},
		lastPage() {
			this.$emit('showMessage', '已经是尾页了')
		},
		firstPage() {
			this.$emit('showMessage', '已经是首页了')
		}
	},
	components: {
		'v-article': Article
	}
}
</script>

<style lang="less" scoped>
.BDraft {
	position: fixed;
	top: 50px;
	bottom: 0;
	left: 200px;
	right: 0;
	background-color: #fff;
	overflow-y: scroll; // overflow-x: hidden;
	padding: 50px 15% 0 8%;
	.article {
		width: 1000px
	}
}
</style>
