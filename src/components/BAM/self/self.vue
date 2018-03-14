<template>
	<div class="Bself">
		<div class="avatar">
			<div class="imgContent">
				<img :src="avatar" alt="头像">
			</div>
			<input type="file" name="avatar" id="avatar" value="上传头像" accept="image/*" @change="uploadAvatar">
			<label for="avatar">上传头像</label>
		</div>
		<div class="info">
			<div class="username">
				<label for="username">昵称：</label>
				<input type="text" v-model="showName">
			</div>
			<div class="email">
				<label for="username">邮箱：</label>
				<input type="text" v-model="email">
			</div>
		</div>
		<div class="shortInt">
			<p>个人简介：</p>
			<textarea name="shortInt" cols="50" rows="6" maxlength="100" v-model="shortInt" @change="updateShortInt" placeholder="请输入您的个人简介"></textarea>
			<span class="fontNum">剩余可输入{{surplus}}/100字</span>
		</div>
		<div class="button">
			<button @click="updateSelfInfo">确定</button>
		</div>
	</div>
</template>

<script>
const defaultAvatar = 'http://bmob-cdn-16635.b0.upaiyun.com/2018/02/04/92dedfae40836e9180a3fb55bee97259.gif'
import { currentUser, updateUserInfo, bmobLogout } from '@/bmob'
export default {
	data() {
		return {
			avatar: defaultAvatar,
			showName: '',
			email: '',
			shortInt: '',
			imgListObj: {}
		}
	},
	computed: {
		surplus() {
			if (!this.shortInt) {
				return
			}
			if (100 - this.shortInt.length <= 0) {
				return 0;
			}
			return 100 - this.shortInt.length;
		}
	},
	mounted() {
		this._initUserInfo()
	},
	methods: {
		_initUserInfo() {
      currentUser().then((result) => {
        this.userId = result.id
        this.avatar = result.get('avatar') || defaultAvatar
        this.showName = result.get('showName')
        this.email = result.get('email')
        this.shortInt = result.get('singName')
      }, (res) => {
        //没有session，未登录（未按步骤操作）
				this.$router.push({ path: '/login' })
      })
		},
		updateShortInt(event) {
			this.shortInt = event.target.value.substring(0, 100)
		},
		uploadAvatar(e) {
			var imgfile = e.target.files[0]
			if (!imgfile) {
				return
			}
			// 判断大小
			if (imgfile.size > 1 * 1000 * 1000) {
				this.$emit('showMessage', '上传文件大小不允许超过1M')
				return
			}
			// 判断是不是同一个文件
			let lastModified = imgfile.lastModified.toString()
			let size = imgfile.size.toString()
      let tempName = `${lastModified}-${size}`
			if (this.imgListObj[tempName]) {
				// 将图片名字替换掉
        this.avatar = this.imgListObj[tempName]
				return
      }
      // 开始上传
      let bmobFile = new Bmob.File(imgfile['name'], imgfile)
      bmobFile.save().then((res) => {
        console.log(res._url)
        // 存储文件，多次上传同一个文件，直接用存储的
        let lastModified = imgfile.lastModified.toString()
        let size = imgfile.size.toString()
        let tempName = `${lastModified}-${size}`
        this.imgListObj[tempName] = res._url
        this.avatar = res._url
			}, (res) => {
				this.$emit('showMessage', '上传失败')
			})
		},
		updateSelfInfo() {
      let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
      if(!reg.test(this.email)) {
        this.$emit('showMessage', '请输入正确的email格式')
        return
      }
			let data = {
				avatar: this.avatar || defaultAvatar,
        showName: this.showName || `fepawn_${(Math.random() * 100000).toString().substring(0, 4)}`,
        username: this.email,
        email: this.email,
				singName: this.shortInt
      }
      updateUserInfo( this.userId, data).then((res) => {
        this.$emit('showMessage', '更新成功')
        return bmobLogout()
			}, (err) => {
				this.$emit('showMessage', err)
			}).then((result) => {
        if (result.code === '000') {
          this.$router.push({path: '/login'})
        }
      })
      /* this.$http.post('/updateSelfInfo', data).then((res) => {
				// 发布成功
				if (res.body.ret_code === "000") {
					this.$emit('showMessage', '更新成功')
				} else {
					this.$emit('showMessage', '操作失败，请稍微再试')
				}
			}, (err) => {
				this.$emit('showMessage', '操作失败，请稍微再试')
			}) */
			/* this.$http.post('/updateSelfInfo', data).then((res) => {
				// 发布成功
				if (res.body.ret_code === "000") {
					this.$emit('showMessage', '更新成功')
				} else {
					this.$emit('showMessage', '操作失败，请稍微再试')
				}
			}, (err) => {
				this.$emit('showMessage', '操作失败，请稍微再试')
			}) */
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
			overflow: hidden;
			img {
				height: 100px;
			}
		}
		input {
			display: none;
		}
		label {
			display: inline-block;
			vertical-align: bottom;
			margin-left: 20px;
			width: 70px;
			height: 24px;
			border: 1px solid #26a69a;
			border-radius: 2px;
			box-sizing: border-box;
			background-color: transparent;
			line-height: 20px;
			color: #26a69a;
			font-size: 14px;
			text-align: center;
			cursor: pointer;
			&:hover {
				background-color: #26a69a;
				color: #fff;
			}
			&:active {
				background-color: #0e5d56;
				color: #fff;
			}
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
		position: relative;
		textarea {
			width: 500px;
			margin-top: 14px;
			resize: none;
			padding: 10px;
			box-sizing: border-box;
			font-size: 14px;
			line-height: 24px;
			color: #666666;
		}
		.fontNum {
			position: absolute;
			bottom: 15px;
			left: 340px;
		}
	}
	.button {
		margin-top: 40px;
		button {
			width: 80px;
			height: 30px;
			border-radius: 2px;
			margin-right: 10px;
			color: #fff;
			font-size: 16px;
			cursor: pointer;
			background-color: #26a69a;
			&:hover {
				background-color: #1a8a7f;
			}
			&:active {
				background-color: #0e5d56
			}
		}
	}
}
</style>
