<template>
	<div class="BAMCom">
		<v-BAMSide :userInfo="userInfo"></v-BAMSide>
		<router-view @showMessage="showMessage" @articleList="articleList" :articleListResult="articleListResult" :draftId="draftId" :articleId="articleId"></router-view>
		<v-Message :messageShow="messageShow" :sendMessage="sendMessage"></v-Message>
	</div>
</template>

<script>
const defaultAvatar = 'http://bmob-cdn-16635.b0.upaiyun.com/2018/02/04/92dedfae40836e9180a3fb55bee97259.gif'
import BAMSide from '@/components/BAM/side/side'
import Message from '@/components/common/Message/Message'
import { currentUser } from '@/bmob'
export default {
	data() {
		return {
			userInfo: {
				avatar: defaultAvatar
			},
			messageShow: false,
			sendMessage: '',
			draftId: 0,
      articleId: 0,
      articleListResult: []
		}
	},
	mounted() {
		this._initUserInfo()
	},
	watch: {
		$route(to, from) {
			if (to.path.indexOf('/BAM/BWriteBolg') > -1) {
				if (to.params.isArticle === true) {
					this.articleId = to.params.id
					this.draftId = 0
				} else if (to.params.isArticle === false) {
					this.draftId = to.params.id
					this.articleId = 0
				} else {
					this.articleId = 0
					this.draftId = 0
				}
			}
		}
	},
	methods: {
    articleList(result) {
      this.articleListResult = result
    },
		showMessage(msg, timeout) {
			var timeout = timeout || 1500
			if (!this.messageShow) {
				const _this = this
				this.messageShow = true;
				this.sendMessage = msg
				setTimeout(function() {
					_this.messageShow = false;
				}, timeout)
			}
		},
		_initUserInfo() {
      currentUser().then((result) => {
        this.userInfo = {
          'avatar': result.get('avatar'),
          'showName': result.get('showName'),
          'singName': result.get('singName')
        }
      }, (res) => {
        //没有session，未登录（未按步骤操作）
				this.$router.push({ path: '/login' })
      })
		}
	},
	components: {
		'v-BAMSide': BAMSide,
		'v-Message': Message
	}
}
</script>

<style scoped>
.BAMCom {
	position: absolute;
	top: 50px;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #fff;
}
</style>



