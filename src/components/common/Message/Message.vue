<template>
	<div>
		<transition name="MsgSlide">
			<div class="MessageCom" v-show="messageShow">
				<div class="MessageIcon">i</div>
				<p class="MessageInfo">{{sendMessage}}</p>
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
	.MessageIcon {
		width: 40px;
		line-height: 40px;
		font-size: 24px;
		text-align: center;
		background-color: @m26a69a;
		color: #fff;
		float: left;
	}
	.MessageInfo {
		float: left;
		line-height: 20px;
		padding: 10px 14px;
	}
	&.MsgSlide-enter-active,
	&.MsgSlide-leave-active {
		transition: all .4s;
	}

	&.MsgSlide-enter,
	&.MsgSlide-leave-to {
		opacity: 0;
		transform: translate(-50%, -20px)
	}
}
</style>