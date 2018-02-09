<template>
  <div class="loginCom">
    <div class="loginWrap">
      <div class="avatar iconfont icon-touxiang">
        <img :src="avatar" alt="">
      </div>
      <div class="toggle">
        <div class="wrap">
          <span :class="{active: isLogin}" @click="isLogin = true">登录</span>
          <span :class="{active: !isLogin}" @click="isLogin = false">注册</span>
        </div>
      </div>
      <form @keydown.stop.prevent.enter="loginSubmit">
        <div class="userName">
          <input type="text" v-model="userName" placeholder="请输入您的邮箱">
        </div>
        <div class="userPsw">
          <input type="password" v-model="userPwd" placeholder="请输入密码">
        </div>
        <div class="userPsw" v-show="!isLogin">
          <input type="password" v-model="userPwdAngin" placeholder="请再次确认密码">
        </div>
        <div>
          <button type="submit" @click.stop.prevent="loginSubmit" v-show="isLogin">LOGIN</button>
          <button type="submit" @click.stop.prevent="loginSubmit" v-show="!isLogin">REGISTER</button>
        </div>
      </form>
    </div>
    <div class="bgLeft"></div>
    <div class="bgRight"></div>
    <transition name="translate">
      <v-Message :messageShow="messageShow" :sendMessage="sendMessage"></v-Message>
    </transition>
  </div>
</template>

<script>
import Message from '@/components/common/Message/Message'
import { login, register } from '@/bmob'
export default {
  data () {
    return {
      userName: '',
      userPwd: '',
      userPwdAngin: '',
      messageShow: false,
      sendMessage: '',
      avatar: '',
      isLogin: true
    }
  },
  mounted () {
    this.avatar = window.localStorage.getItem('avatar') || ''
  },
  methods: {
    loginSubmit () {
      let data = {}
      if (this.isLogin) {
        // 登录
        data = { username: this.userName, password: this.userPwd }
        if (!this._verificate(data)) {
          // 用户名或密码不能为空！
          this._showMessage('用户名或密码不能为空！')
          return
        }
        let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        if(!reg.test(this.userName)) {
          this._showMessage(`请输入正确的email格式`)
          return
        }
        login(data).then((result) => {
          if (result.code === '001') {
            let emailFormat = `**${result.email.substring(2)}`
            this._showMessage(`请先验证${emailFormat}邮箱！`)
            return
          } else if (result.code === '000') {
            console.log('登录成功')
            window.localStorage.setItem('avatar', result.avatar)
					  this.$router.push({ path: 'BAM', query: {'userId': result.userId}})
          }
        }, (error) => {
          if (error.code === 101) {
            this._showMessage(`用户名或密码错误！`)
          }
        })
      } else {
        // 注册
        var _this = this
        data = { username: this.userName, password: this.userPwd, email: this.userName }
        if (!this._verificate(data)) {
          this._showMessage(`用户名或密码不能为空！`)
          return
        }
        let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        if(!reg.test(this.userName)) {
          this._showMessage(`请输入正确的email格式`)
          return
        }
        if (this.userPwd.trim() !== this.userPwdAngin.trim()) {
          this._showMessage(`两次输入的密码不一致`)
          return
        }
        register(data).then((result) => {
          console.log(result);
          this._showMessage(`恭喜你，注册成功！`, function () {
            _this.isLogin = true
          })
        }, (res) => {
          if (res.code === 202) {
            this._showMessage(`用户名已经存在`)
          } else if (res.code === 203) {
            this._showMessage(`邮箱已经存在`)
          } else {
            this._showMessage(`${res.message}`)
          }
        })
      }
			/* this.$http.post('/login', data).then(function(res) {
				if (res.body.ret_code === "000") {
					window.localStorage.setItem('avatar', res.body.ret_avatar)
					this.$router.push({ path: 'BAM' })
				} else {
					this.sendMessage = res.body.ret_msg
					this.messageShow = true
					this._hideMessage()
				}
			}, function(res) {
				this.sendMessage = '系统错误！'
				this.messageShow = true
				this._hideMessage()
			}) */
    },
    _verificate (data) {
      for (const key in data) {
        const element = data[key]
        if (!element) {
          return false
        }
      }
      return true
    },
    _showMessage (msg, cb) {
      if (this.messageShow) {
        return
      }
      this.sendMessage = msg
      this.messageShow = true
      this._hideMessage(cb)
    },
    _hideMessage (cb) {
      setTimeout(() => {
        this.messageShow = false
        cb && cb()
      }, 2000)
    }
  },
  components: {
    'v-Message': Message
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/style/common.less";
@m26a69a : #26a69a;
.loginCom {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0; // background-color: @m26a69a;
  background-image: linear-gradient(120deg, #0accba 0%, #228b9c 100%);
  .loginWrap {
    width: 360px;
    border-radius: 4px;
    position: absolute;
    z-index: 10;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fbfbfb;
    padding: 60px 30px 40px;
    box-sizing: border-box;
    box-shadow: rgb(21, 141, 144) 1px 1px, rgb(21, 141, 144) 2px 2px,
      rgb(21, 141, 144) 3px 3px, rgb(21, 141, 144) 4px 4px,
      rgb(21, 141, 144) 5px 5px, rgb(21, 141, 144) 6px 6px,
      rgb(21, 142, 145) 7px 7px, rgb(21, 142, 145) 8px 8px,
      rgb(21, 142, 145) 9px 9px, rgb(21, 142, 145) 10px 10px,
      rgb(21, 142, 145) 11px 11px, rgb(21, 142, 145) 12px 12px,
      rgb(21, 143, 146) 13px 13px, rgb(21, 143, 146) 14px 14px,
      rgb(21, 143, 146) 15px 15px, rgb(21, 143, 146) 16px 16px,
      rgb(21, 143, 146) 17px 17px, rgb(21, 143, 146) 18px 18px,
      rgb(21, 144, 147) 19px 19px, rgb(21, 144, 147) 20px 20px,
      rgb(21, 144, 147) 21px 21px, rgb(21, 144, 147) 22px 22px,
      rgb(21, 144, 147) 23px 23px, rgb(21, 144, 147) 24px 24px,
      rgb(21, 145, 148) 25px 25px, rgb(21, 145, 148) 26px 26px,
      rgb(21, 145, 148) 27px 27px, rgb(21, 145, 148) 28px 28px,
      rgb(21, 145, 148) 29px 29px, rgb(21, 145, 148) 30px 30px,
      rgb(21, 145, 148) 31px 31px, rgb(21, 146, 149) 32px 32px,
      rgb(21, 146, 149) 33px 33px, rgb(21, 146, 149) 34px 34px,
      rgb(21, 146, 149) 35px 35px, rgb(21, 146, 149) 36px 36px,
      rgb(21, 146, 149) 37px 37px, rgb(21, 147, 150) 38px 38px,
      rgb(21, 147, 150) 39px 39px, rgb(21, 147, 150) 40px 40px,
      rgb(21, 147, 150) 41px 41px, rgb(21, 147, 150) 42px 42px,
      rgb(21, 147, 150) 43px 43px, rgb(21, 148, 151) 44px 44px,
      rgb(21, 148, 151) 45px 45px, rgb(21, 148, 151) 46px 46px,
      rgb(21, 148, 151) 47px 47px, rgb(22, 148, 151) 48px 48px,
      rgb(22, 148, 151) 49px 49px, rgb(22, 149, 152) 50px 50px,
      rgb(22, 149, 152) 51px 51px, rgb(22, 149, 152) 52px 52px,
      rgb(22, 149, 152) 53px 53px, rgb(22, 149, 152) 54px 54px,
      rgb(22, 149, 152) 55px 55px, rgb(22, 150, 153) 56px 56px,
      rgb(22, 150, 153) 57px 57px, rgb(22, 150, 153) 58px 58px,
      rgb(22, 150, 153) 59px 59px, rgb(22, 150, 153) 60px 60px,
      rgb(22, 150, 153) 61px 61px, rgb(22, 150, 153) 62px 62px,
      rgb(22, 151, 154) 63px 63px, rgb(22, 151, 154) 64px 64px,
      rgb(22, 151, 154) 65px 65px, rgb(22, 151, 154) 66px 66px,
      rgb(22, 151, 154) 67px 67px, rgb(22, 151, 154) 68px 68px,
      rgb(22, 152, 155) 69px 69px, rgb(22, 152, 155) 70px 70px,
      rgb(22, 152, 155) 71px 71px, rgb(22, 152, 155) 72px 72px,
      rgb(22, 152, 155) 73px 73px, rgb(22, 152, 155) 74px 74px,
      rgb(22, 153, 156) 75px 75px, rgb(22, 153, 156) 76px 76px,
      rgb(22, 153, 156) 77px 77px, rgb(22, 153, 156) 78px 78px,
      rgb(22, 153, 156) 79px 79px, rgb(22, 153, 156) 80px 80px,
      rgb(22, 154, 157) 81px 81px, rgb(22, 154, 157) 82px 82px,
      rgb(22, 154, 157) 83px 83px, rgb(22, 154, 157) 84px 84px,
      rgb(22, 154, 157) 85px 85px, rgb(22, 154, 157) 86px 86px,
      rgb(22, 154, 157) 87px 87px, rgb(22, 155, 158) 88px 88px,
      rgb(22, 155, 158) 89px 89px, rgb(22, 155, 158) 90px 90px,
      rgb(22, 155, 158) 91px 91px, rgb(22, 155, 158) 92px 92px,
      rgb(22, 155, 158) 93px 93px, rgb(22, 156, 159) 94px 94px,
      rgb(22, 156, 159) 95px 95px, rgb(23, 156, 159) 96px 96px,
      rgb(23, 156, 159) 97px 97px, rgb(23, 156, 159) 98px 98px,
      rgb(23, 156, 159) 99px 99px, rgb(23, 157, 160) 100px 100px,
      rgb(23, 157, 160) 101px 101px, rgb(23, 157, 160) 102px 102px,
      rgb(23, 157, 160) 103px 103px, rgb(23, 157, 160) 104px 104px,
      rgb(23, 157, 160) 105px 105px, rgb(23, 158, 161) 106px 106px,
      rgb(23, 158, 161) 107px 107px, rgb(23, 158, 161) 108px 108px,
      rgb(23, 158, 161) 109px 109px, rgb(23, 158, 161) 110px 110px,
      rgb(23, 158, 161) 111px 111px, rgb(23, 159, 162) 112px 112px,
      rgb(23, 159, 162) 113px 113px, rgb(23, 159, 162) 114px 114px,
      rgb(23, 159, 162) 115px 115px, rgb(23, 159, 162) 116px 116px,
      rgb(23, 159, 162) 117px 117px, rgb(23, 159, 162) 118px 118px,
      rgb(23, 160, 163) 119px 119px, rgb(23, 160, 163) 120px 120px,
      rgb(23, 160, 163) 121px 121px, rgb(23, 160, 163) 122px 122px,
      rgb(23, 160, 163) 123px 123px, rgb(23, 160, 163) 124px 124px,
      rgb(23, 161, 164) 125px 125px;
    .avatar {
      position: absolute;
      width: 80px;
      height: 80px;
      left: 50%;
      top: -40px;
      transform: translateX(-50%);
      background-color: #228b9c;
      border: 2px solid #fff;
      font-size: 50px;
      line-height: 70px;
      text-align: center;
      color: #fff;
      border-radius: 50%;
      box-sizing: border-box; // background: url(./images/avatar.jpg) no-repeat;
      background-size: cover;
      overflow: hidden;
      img {
        position: absolute;
        top: -2px;
        left: -2px;
        height: 80px;
      }
    }
    .toggle {
      .wrap {
        width: 100px;
        margin: 0 auto;
        .clearfixMixin();
      }
      span {
        float: left;
        width: 40px;
        height: 30px;
        line-height: 30px;
        border-bottom: 2px solid transparent;
        font-size: 16px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s;
        &:hover,
        &.active {
          border-bottom: 2px solid @m26a69a;
          color: @m26a69a;
        }
      }
      span:last-child {
        float: right;
      }
    }
    .userName,
    .userPsw,
    .userEmail {
      margin-top: 18px;
      .placeholder(#666);
      input {
        width: 100%;
        height: 40px;
        padding: 0 15px;
        font-size: 14px;
        line-height: 30px;
        box-sizing: border-box;
        color: #666;
        background-color: #eeeeee;
        transition: all 0.3s;
        &:focus {
          box-shadow: 0 0 8px 3px rgba(0, 0, 0, 0.08) inset;
        }
      }
    }
    .userName {
      margin-top: 30px;
    }
    button {
      margin-top: 30px;
      width: 100%;
      border: 0;
      font-size: 16px;
      height: 40px;
      line-height: 40px;
      color: #fff;
      background-color: #228b9c;
      cursor: pointer;
    }
    .testDiv {
      margin-top: 20px;
    }
    .test {
      margin-top: 10px;
      color: #666;
    }
  }
  .bgLeft {
    width: 36%;
    height: 36%;
    position: absolute;
    bottom: 20px;
    left: 30px;
    background: url(./Layer_1.png) no-repeat;
    background-size: contain;
  }
  .bgRight {
    width: 36%;
    height: 36%;
    position: absolute;
    z-index: 11;
    bottom: 50px;
    right: 30px;
    background: url(./Layer_2.png) no-repeat;
    background-size: contain;
  }
}
</style>
