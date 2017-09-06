<template>
	<header class="header" :class="{BAM: isBAM }" id="headerRippleWrap">
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
				<!--<li class="ripple" :class="{activeType:activeRoute ==='/tags'}" @click="changeHash('tags')">
																					<i class="iconfont icon-biaoqian"></i>
																					<span class="info">标签</span>
																					<div class="rippleWrap">
																						<span></span>
																					</div>
																				</li> -->
			</ul>
		</nav>
		<div class="headerR">
			<div class="search" v-show="searchIsShow">
				<i class="iconfont icon-sousuo_sousuo"></i>
				<input type="text" placeholder="请输入搜索的内容" v-model="searchInfo" @keydown.stop.enter="searchSubmit">
			</div>
			<div class="logout ripple" v-show="logining">
				<i class="iconfont icon-tuichu"></i>
				<div class="rippleWrap">
					<span></span>
				</div>
				<span class="Tooltip">退出</span>
			</div>
			<div class="person" :class="{activeType:activeRoute ==='/BAM'}" @click="changeHash('BAM')">
				<span class="info">
					<img src="./noavatar_small.gif" alt="">
				</span>
				<span class="Tooltip">个人中心</span>
			</div>
		</div>
	</header>
</template>

<script>
import { ripple } from '@/assets/script/common';

export default {
	data() {
		return {
			activeRoute: '/blog',
			searchInfo: '',
			isBAM: false,
			navListIsShow: true,
			searchIsShow: true,
			logining: true,
		}
	},
	watch: {
		$route(to, from) {
			this.activeRoute = to.path;
			if (to.path.indexOf('/BAM') !== -1) {
				this.isBAM = true;
				this.navListIsShow = false;
				this.searchIsShow = false;
			} else {
				this.isBAM = false;
				this.navListIsShow = true;
				this.searchIsShow = true;
			}
		}
	},
	methods: {
		changeHash(type) {
			const userId = this.$route.query.userId;
			this.$router.push({ path: '/' + type, query: { userId: userId } })
		},
		searchSubmit() {
			if (!this.searchInfo) {
				return;
			}
			console.log('提交了')
		}
	},
	mounted() {
		console.log('header mounted')
		if (this.$route.path === '/BAM') {
			this.isBAM = true;
			this.navListIsShow = false;
			this.searchIsShow = false;
		}
		ripple('headerRippleWrap');
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
	&.BAM {
		left: 200px;
		right: 0;
		background-color: #fff;
		color: #2F4050;
	}
	background-color: @m26a69a;
	height:50px;
	color: #fff;
	box-shadow: 0 1px 5px rgba(0, 0, 0, .1);
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
				width: 0px;
				border: 0;
				font-size: 14px;
				height: 26px;
				padding-left: 10px;
				box-sizing: border-box;
				color: #fff;
				background-color: transparent;
				transition: all .5s;
			}

			&:hover {
				width: 200px;
				background-color: @m009688;
				input {
					width: 155px;
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
