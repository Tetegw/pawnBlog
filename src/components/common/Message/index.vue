<template>
	<div>
		<transition name="slide">
			<div class="MessageCom" v-show="messageShow">
				<div class="icon">i</div>
				<p class="info">{{sendMessage}}</p>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	props: {
		sendMessage: {
			type: String
		},
		messageShow: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
		}
	},

}
</script>

<style lang="less" scoped>
@m26a69a: #26a69a;
.MessageCom {
	position: fixed;
	z-index: 1993;
	top: 80px;
	left: 50%;
	transform: translate(-50%, 0);
	min-width: 300px;
	overflow: hidden;
	background-color: #fff;
	box-shadow: 0 2px 4px rgba(0, 0, 0, .2), 0 6px rgba(0, 0, 0, .04);
	.icon {
		width: 40px;
		line-height: 40px;
		font-size: 24px;
		text-align: center;
		background-color: @m26a69a;
		color: #fff;
		float: left;
	}
	.info {
		float: left;
		line-height: 20px;
		padding: 10px 14px;
	}
	&.slide-enter-active,
	&.slide-leave-active {
		transition: all .4s;
	}

	&.slide-enter,
	&.slide-leave-to {
		opacity: 0;
		transform: translate(-50%, -20px)
	}
}
</style>