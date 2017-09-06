<template>
	<div id="main">
		<v-header></v-header>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<v-Message :messageShow="messageShow" :sendMessage="sendMessage"></v-Message>
	</div>
</template>

<script>
import Header from '@/components/common/header/index';
import Message from '@/components/common/Message/index';
export default {
	data() {
		return {
			messageShow: false,
			sendMessage: '',
		}
	},
	created() {
		this._hasUser();
	},
	methods: {
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


