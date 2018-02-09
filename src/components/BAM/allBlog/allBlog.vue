<template>
	<div class="BAllBlog">
		<div class="allBlogContent">
			<v-article :articleList="articleList" :toEdit="toEdit" :isArticle="isArticle" @lastPage="lastPage" @firstPage="firstPage" @showMessage="showMessage"></v-article>
		</div>
	</div>
</template>

<script>
import Article from '@/components/common/article/article'
import { queryArticleList } from '@/bmob'
export default {
	data() {
		return {
			articleList: [],
			toEdit: true,
			isArticle: true,
		}
  },
  props: {
    userInfo: {
      type: Object,
      default: {}
    }
  },
  watch: {
    // todo 需要获取用户
    userInfo (newVal) {
      this._getArticleList()
    }
  },
	methods: {
		_getArticleList() {
      queryArticleList({'userId': this.userInfo.userId}).then((result) => {
        this.articleList = result
        this.$emit('articleList', result)
      }, (res) => {
        this.$emit('showMessage', res)
      })
		},
		lastPage() {
			this.$emit('showMessage', '已经是尾页了')
		},
		firstPage() {
			this.$emit('showMessage', '已经是首页了')
		},
		showMessage(msg) {
			this.$emit('showMessage', msg)
		}
	},
	components: {
		'v-article': Article
	}
}
</script>

<style lang="less" scoped>
.BAllBlog {
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
