<template>
	<div class="Bself">
		<div class="avatar">
			<div class="imgContent">
				<img :src="avatar" alt="头像">
			</div>
			<button>上传头像</button>
		</div>
		<div class="info">
			<div class="username">
				<label for="username">昵称：</label>
				<input type="text" v-model="username">
			</div>
			<div class="email">
				<label for="username">邮箱：</label>
				<input type="text" v-model="email">
			</div>
		</div>
		<div class="shortInt">
			<p>个人简介：</p>
			<textarea name="shortInt" cols="50" rows="6" :value="shortInt" @input="updateShortInt" placeholder="请输入您的个人简介"></textarea>
			<span class="fontNum">剩余可输入{{surplus}}/100字</span>
			<span class="fontNum">{{shortInt.length}}</span>
			<span class="fontNum">{{shortInt}}</span>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			avatar: './default.png',
			username: 'Tetegw',
			email: '1151832942@qq.com',
			shortInt: '做一坨烂泥，不要把我扶上墙...',
		}
	},
	computed: {
		surplus() {
			return 100 - this.shortInt.length
		}
	},
	methods: {
		updateShortInt(event) {
			this.shortInt = event.target.value.substring(0, 100)
		}
	}
}
</script>

<style lang="less" scoped>
.Bself {
	position: fixed;
	top: 50px;
	bottom: 0;
	left: 200px;
	right: 0;
	background-color: #fff;
	overflow-y: scroll;
	padding: 80px 15% 0 8%;
	.avatar {
		font-size: 0;
		.imgContent {
			display: inline-block;
			width: 100px;
			height: 100px;
			border-radius: 4px;
			background-color: #a3a3a3;
		}
		button {
			vertical-align: bottom;
			margin-left: 20px;
			width: 70px;
			height: 24px;
			border: 1px solid #26a69a;
			border-radius: 2px;
			box-sizing: border-box;
			background-color: transparent;
			color: #26a69a;
			line-height: 20px;
		}
	}
	.info {
		padding-top: 20px;
		font-size: 16px;
		color: #666666;
		.username,
		.email {
			margin-top: 20px;
			label {
				line-height: 30px;
			}
			input {
				width: 200px;
				border: 1px solid #b1b1b1;
				height: 30px;
				color: #666666;
				padding-left: 8px;
				box-sizing: border-box;
			}
		}
	}
	.shortInt {
		margin-top: 70px;
		textarea {
			margin-top: 14px;
			resize: none;
			padding: 10px;
			box-sizing: border-box;
			font-size: 12px;
			color: #666666;
		}
	}
}
</style>