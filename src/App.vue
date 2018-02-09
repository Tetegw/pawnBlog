<template>
	<div id="main">
		<v-header @searchInfo="searchInfo"></v-header>
		<router-view ref="blog" :articleList="articleList" :userInfo="userInfo"></router-view>
		<v-Message :messageShow="messageShow" :sendMessage="sendMessage"></v-Message>
	</div>
</template>

<script>
import Header from '@/components/common/header/header'
import Message from '@/components/common/Message/Message'
import { queryOneUser, queryArticleList }from '@/bmob'
export default {
	data() {
		return {
			messageShow: false,
			sendMessage: '',
      searchKeyword: '',
      articleList: [],
      userInfo: {}
		}
	},
	created() {
		this._hasUser();
  },
  watch: {
    $route(to, from) {
      let BAM2Blog = ((from.path.indexOf('/BAM') > -1) && (to.path.indexOf('/BAM') === -1))
      if (BAM2Blog) {
        this._hasUser()
      }
    }
  },
	methods: {
		searchInfo(keyword) {
			// 通过App根组件接收header的数据，调用blog的方法并传递参数
			this.searchKeyword = keyword
			this.$nextTick(() => {
				this.$refs.blog.search(this.searchKeyword)
			})
		},
		_hasUser() {
			const _this = this
      const userId = this.$route.query.userId
      queryOneUser(userId).then((result) => {
        this.userInfo = result
        this.getArticleList()
      }, (res) => {
        this.messageShow = true;
        this.sendMessage = res
        setTimeout(function() {
          _this.messageShow = false;
          _this.$router.push({ path: '/blog' })
          window.location.reload()
        }, 1500)
        return
      })
    },
    getArticleList() {
      const userId = this.$route.query.userId
      queryArticleList({'userId': userId}).then((result) => {
        this.articleList = result
      }, (res) => {
        this.messageShow = true;
        this.sendMessage = res
        setTimeout(function() {
          _this.messageShow = false;
          _this.$router.push({ path: '/blog' })
          window.location.reload()
        }, 1500)
      })
    }
	},
	components: {
		'v-header': Header,
		'v-Message': Message,
	},
}
</script>



