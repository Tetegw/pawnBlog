<template>
	<div class="BAMCom">
		<v-BAMSide :userInfo="userInfo"></v-BAMSide>
		<router-view @showMessage="showMessage" @articleList="articleList" :articleListResult="articleListResult" :draftId="draftId" :articleId="articleId" :userInfo="userInfo"></router-view>
		<v-Message :messageShow="messageShow" :sendMessage="sendMessage"></v-Message>
	</div>
</template>

<script>
import defaultAvatar from "@/assets/img/defaultIcon.gif";
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
	created () {
		this._initUserInfo()
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
          'singName': result.get('singName'),
          'userId': result.id
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

<style scoped lang="less">
.BAMCom {
	position: absolute;
	top: 50px;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #fff;
}
</style>



