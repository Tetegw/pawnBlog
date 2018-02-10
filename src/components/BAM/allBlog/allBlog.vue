<template>
	<div class="BAllBlog">
		<div class="allBlogContent">
      <div class="error-wrapper" v-show="!articleList.length">
        <v-ErrorCom></v-ErrorCom>
      </div>
			<v-article :articleList="articleList" :toEdit="true" :isArticle="true" @lastPage="lastPage" @firstPage="firstPage" @showMessage="showMessage"></v-article>
		</div>
	</div>
</template>

<script>
import Article from '@/components/common/article/article'
import ErrorCom from '@/components/common/error/error'
import { queryArticleList, currentUser } from '@/bmob'
export default {
	data() {
		return {
			articleList: [],
      userInfo: {}
		}
  },
  created () {
    this._initUserInfo()
  },
	methods: {
    _initUserInfo() {
      currentUser().then((result) => {
        this.userInfo = {
          'avatar': result.get('avatar'),
          'showName': result.get('showName'),
          'singName': result.get('singName'),
          'userId': result.id
        }
        this._getArticleList()
      }, (res) => {
        //没有session，未登录（未按步骤操作）
				this.$router.push({ path: '/login' })
      })
		},
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
    'v-article': Article,
    'v-ErrorCom': ErrorCom
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
