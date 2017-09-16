<template>
	<header>
		<div class="header" :class="{BAM: isBAM }" id="headerRippleWrap">
			<h1 @click="changeHash('blog')">logo</h1>
			<nav class="nav">
				<ul v-show="navListIsShow">
					<li class="ripple" :class="{activeType:(activeRoute ==='/blog' || activeRoute ==='/article')}" @click="changeHash('blog')">
						<i class="iconfont icon-zhuye"></i>
						<span class="info">博客</span>
						<div class="rippleWrap">
							<span></span>
						</div>
					</li>
					<li class="ripple" :class="{activeType:activeRoute ==='/time'}" @click="changeHash('time')">
						<i class="iconfont icon-riqi"></i>
						<span class="info">归档</span>
						<div class="rippleWrap">
							<span></span>
						</div>
					</li>
				</ul>
			</nav>
			<div class="headerR">
				<div class="search" v-show="searchIsShow"  @mouseenter="showSearch"  :class="{active: slideDown}">
					<i class="iconfont icon-sousuo_sousuo"></i>
					<input type="text" placeholder="请输入搜索的内容" v-model="searchInfo" @keydown.stop.enter="searchSubmit" @blur="hideSearch">
				</div>
				<div class="logout ripple" @click="logout">
					<i class="iconfont icon-tuichu"></i>
					<div class="rippleWrap">
						<span></span>
					</div>
					<span class="Tooltip">退出</span>
				</div>
				<div class="person" :class="{activeType: activeRoute.indexOf('/BAM') > -1}" @click="changeHash('BAM')">
					<span class="info">
						<img src="./noavatar_small.gif" alt="">
					</span>
					<span class="Tooltip">个人中心</span>
				</div>
			</div>
		</div>
		<v-Message :messageShow="messageShow" :sendMessage="sendMessage"></v-Message>
	</header>
</template>

<script>
import { ripple } from '@/assets/script/common';
import Message from '@/components/common/Message/Message';

export default {
	data() {
		return {
			activeRoute: '/blog',
			searchInfo: '',
			isBAM: false,
			navListIsShow: true,
			searchIsShow: true,
			messageShow: false,
			sendMessage: '',
			slideDown: false,
		}
	},
	watch: {
		$route(to, from) {
			this.activeRoute = to.path;
			// 判断是否是后台管理界面
			if (to.path.indexOf('/BAM') > -1) {
				this.isBAM = true;
				this.navListIsShow = false;
				this.searchIsShow = false;
			} else {
				this.isBAM = false;
				this.navListIsShow = true;
				this.searchIsShow = true;
			}
			// 判断是否是login界面
			if(to.path.indexOf('/login') !== -1){
				this.activeRoute = '/BAM'
			}
			// 判断是否是article界面，和博客相同，不需要修改
		}
	},
	methods: {
		logout() {
			var _this = this
			let routeQuery = this.$route.query
			let routePath = this.$route.path
			this.$http.get('/logout').then(function(res) {

				if (res.body.ret_code === "000") {
					//退出成功，重定向
					if (routePath.indexOf('/BAM') > -1) {
						this.$router.push({ path: '/blog', query: routeQuery })
					}
					if (!this.messageShow) {
						this.messageShow = true;
						this.sendMessage = res.body.ret_msg
						setTimeout(function() {
							_this.messageShow = false;
						}, 1500)
					}
				} else if (res.body.ret_code === "001") {
					if (!this.messageShow) {
						this.messageShow = true;
						this.sendMessage = res.body.ret_msg
						setTimeout(function() {
							_this.messageShow = false;
						}, 1500)
					}
				}
			}, function(res) {
				console.log(res);
			})
		},
		changeHash(type) {
			if (type === 'BAM') {
				this.$router.push({ path: '/' + type })
				return
			}
			const userId = this.$route.query.userId
			if (userId === undefined) {
				this.$router.push({ path: '/' + type })
			} else {
				this.$router.push({ path: '/' + type, query: { userId: userId } })
			}
		},
		showSearch(e){
			e.target.children[1].focus()
			this.slideDown = true
		},
		hideSearch(){
			this.searchInfo = ''
			this.slideDown = false
		},
		searchSubmit() {
			// 并且跳转至blog
			const userId = this.$route.query.userId
			if (userId === undefined) {
				this.$router.push({ path: '/blog' })
			} else {
				this.$router.push({ path: '/blog', query: { userId: userId } })
			}
			// 把关键字传递给blog
			this.searchInfo = this.searchInfo.trim()
			this.$emit('searchInfo', this.searchInfo)
		}
	},
	mounted() {
		console.log('header mounted')
		// 判断是否是BAM界面
		if (this.$route.path.indexOf('/BAM') > -1)  {
			this.activeRoute = this.$route.path;
			this.isBAM = true;
			this.navListIsShow = false;
			this.searchIsShow = false;
		}
		// 判断是否是login界面
		if(this.$route.path.indexOf('/login') !== -1){
			this.activeRoute = '/BAM'
		}
		// 判断是否是time界面
		if(this.$route.path.indexOf('/time') !== -1){
			this.activeRoute = '/time'
		}
		ripple('headerRippleWrap');
	},
	components: {
		'v-Message': Message
	}
}
</script>

<style lang="less">
@import '../../../assets/style/common.less';
@m26a69a : #26a69a;
@m009688 : #009688;
.header {
	position: fixed;
	z-index: 990;
	top: 0;
	left: 0;
	right: 0;
	background-color: @m26a69a;
	height: 50px;
	color: #fff;
	box-shadow: 0 1px 5px rgba(0, 0, 0, .1);
	&.BAM {
		left: 200px;
		right: 0;
		background-color: #fff;
		color: #2F4050;
	}
	h1 {
		margin-left: 20px;
		float: left;
		font-size: 20px;
		line-height: 50px;
		padding: 0 10px;
		width: 160px;
		cursor: pointer;
	}
	.nav {
		position: absolute;
		left: 50%;
		top: 0;
		margin-left: -500px;
		.rippleMixin(20px, 50px, rgba(255, 255, 255, .2), 200, nav);
		ul {
			.clearfixMixin();
			li {
				float: left;
				line-height: 50px;
				&.activeType,
				&:hover {
					background-color: rgba(0, 0, 0, .1);
				}
				i {
					display: inline-block;
					margin-right: 3px;
					font-size: 16px;
					line-height: 21px;
					vertical-align: middle;
				}
			}
		}
	}
	.headerR {
		float: right;
		margin-right: 20px;
		.search {
			float: left;
			width: 44px;
			height: 50px;
			overflow: hidden;
			background-color: @m26a69a;
			font-size: 0;
			padding: 12px 10px 0 10px;
			box-sizing: border-box;
			transition: all .5s;
			i {
				float: left;
				line-height: 26px;
				font-size: 18px;
			}
			.placeholder(#fff);
			input {
				float: right;
				width: 0;
				border: 0;
				font-size: 14px;
				height: 26px;
				box-sizing: border-box;
				color: #fff;
				background-color: transparent;
				transition: all .5s;
			}
			&.active{
				width: 200px;
				background-color: @m009688;
				input {
					width: 155px;
					padding-left: 10px;
				}
			} 
		}
		.person {
			float: right;
			height: 50%;
			cursor: pointer;
			position: relative;
			transition: all 1s;
			.Tooltip {
				display: none;
			}
			&:hover {
				.TooltipMixin(70px, -45px, 0, 6px, 6px, 7px);
				.Tooltip {
					display: block;
				}
			}
			.info {
				width: 50px;
				height: 50px;
				padding: 8px;
				display: inline-block;
				box-sizing: border-box;
				overflow: hidden;
				vertical-align: top;
				img {
					width: 100%;
				}
			}
			&.activeType,
			&:hover {
				background-color: rgba(0, 0, 0, .1);
			}
		}
		.rippleMixin(0, 50px, rgba(255, 255, 255, .2), 200, logout);
		.logout {
			float: left;
			width: 50px;
			height: 50px;
			text-align: center;
			cursor: pointer;
			.Tooltip {
				display: none;
			}
			&:hover {
				.Tooltip {
					display: block;
				}
				background-color: rgba(0, 0, 0, .1);
			}
			.iconfont {
				font-size: 18px;
				line-height: 50px;
			}
			.TooltipMixin(50px, -45px, 0, 6px, 6px, 7px)
		}
	}
}
</style>
