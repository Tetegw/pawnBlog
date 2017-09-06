<template>
	<div class="Dialog">
		<div v-show="isShow">
			<div class="container">
				<h2 class="title">{{titleInfo}}</h2>
				<p class="DialogInfo">{{DialogInfo}}</p>
				<div class="button">
					<button @click="hideAll">取消</button>
					<button @click="isSure">确定</button>
				</div>
			</div>
			<div class="maskBg" @click="hideAll"></div>
		</div>
		<v-Message :messageShow="messageShow" :sendMessage="sendMessage"></v-Message>
	</div>
</template>

<script>
import Message from '@/components/common/Message/index'
export default {
	data() {
		return {
			titleInfo: '标题',
			DialogInfo: '只有点击确定按钮才可以关闭',
			isShow: true,
			messageShow: false,
			sendMessage: '',
		}
	},
	methods: {
		hideAll() {
			this.isShow = false;
		},
		isSure() {
			var _this = this;
			this.isShow = false;
			this.messageShow = true;
			this.sendMessage = "修改成功";
			setTimeout(function() {
				_this.messageShow = false;
			}, 1500)
		},
	},
	components: {
		'v-Message': Message
	},
	mounted() {
		console.log('header mounted')
	}
}

</script>

<style lang="less" scoped>
@m26a69a : #26a69a;
.Dialog {
	.container {
		position: absolute;
		z-index: 1992;
		left: 50%;
		top: 40%;
		transform: translate(-50%, -50%);
		width: 500px;
		min-height: 170px;
		padding: 24px;
		background-color: #fff;
		box-sizing: border-box;
		box-shadow: 0 5px 15px 7px rgba(0, 0, 0, .24);
		border-left: 10px solid @m26a69a;
		.title {
			line-height: 24px;
			font-weight: bold;
			font-size: 20px;
		}
		.DialogInfo {
			margin: 20px 0 50px;
			line-height: 26px;
			color: rgba(0, 0, 0, .7);
		}
		.button {
			position: absolute;
			bottom: 16px;
			right: 20px;
			button {
				width: 88px;
				height: 36px;
				font-size: 16px;
				line-height: 36px;
				background-color: transparent;
				cursor: pointer;
				color: @m26a69a;
				&:hover {
					background-color: rgba(0, 0, 0, .1);
				}
			}
		}
	}
	.maskBg {
		position: fixed;
		z-index: 1991;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: rgba(0, 0, 15, .4);
	}
	.translate-enter-active,
	.translate-leave-active {}
	.translate-enter,
	.translate-leave-active {
		opacity: 0;
		transform: translate(-50%, -20px);
	}
}
</style>