<template>
	<div id="main">
		<v-header @searchInfo="searchInfo"></v-header>
		<keep-alive>
			<router-view ref="blog"></router-view>
		</keep-alive>
		<v-Message :messageShow="messageShow" :sendMessage="sendMessage"></v-Message>
	</div>
</template>

<script>
import Header from '@/components/common/header/header';
import Message from '@/components/common/Message/Message';
export default {
	data() {
		return {
			messageShow: false,
			sendMessage: '',
			searchKeyword: '',
		}
	},
	created() {
		this._hasUser();
	},
	methods: {
		searchInfo(keyword){
			this.searchKeyword = keyword
			this.$nextTick(() => {
				this.$refs.blog.search(this.searchKeyword)
			})
		},
		_hasUser() {
			const _this = this
			const userId = this.$route.query.userId;
			this.$http.get('/api/hasUser?userId=' + userId).then(function(res) {
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
			}, function(res) {
				console.log(res);
			});
		}
	},
	components: {
		'v-header': Header,
		'v-Message': Message,
	},
}
</script>


