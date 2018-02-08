<template>
	<div class="BAMSide" id="BAMRippleWrap">
		<div class="BAMheader">
			<div class="avatar">
				<img :src="userInfo.avatar" alt="">
			</div>
			<p class="userName">{{userInfo.showName}}</p>
			<p class="introduce">{{userInfo.singName}}</p>
		</div>
		<ul class="navList">
			<li class="ripple" @click="toSelfPage">
				<span class="info">我的主页</span>
			</li>
			<li class="ripple" :class="{active: activeItem === 'BAllBlog'}" @click="changeItem('BAllBlog')">
				<span class="info">全部博客</span>
			</li>
			<li class="ripple" :class="{active: activeItem === 'BWriteBolg'}" @click="changeItem('BWriteBolg')">
				<span class="info">发布博客</span>
			</li>
			<li class="ripple" :class="{active: activeItem === 'BDraft'}" @click="changeItem('BDraft')">
				<span class="info">草稿箱</span>
			</li>
			<li class="ripple" :class="{active: activeItem === 'BSelf'}" @click="changeItem('BSelf')">
				<span class="info">个人资料</span>
			</li>
		</ul>
	</div>
</template>

<script>
import { ripple } from '@/assets/script/common';
export default {
	props: {
		userInfo: {
			type: Object
		}
	},
	data() {
		return {
			activeItem: 'Barticle',
		}
	},
	watch: {
		$route(to, from) {
			var index = to.path.indexOf('/BAM')
			this.activeItem = to.path.substring(index + 5)
		}
	},
	mounted() {
		console.log('BAMSide mounted')
		var index = this.$route.path.indexOf('/BAM')
		if (index > -1) {
			this.activeItem = this.$route.path.substring(index + 5)
		}
	},
	methods: {
		changeItem(item) {
			this.activeItem = item;
			var pathName = '/BAM/' + item;
			this.$router.push({ path: pathName })
		},
		toSelfPage() {
			this.$router.push({ path: '/blog', query: { userId: this.userInfo.userId } })
		}
	}

}
</script>

<style lang="less" scoped>
@import '../../../assets/style/common.less';
@m26a69a : #26a69a;
.BAMSide {
	width: 200px;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	background-color: #2f4050; // background-image:linear-gradient(180deg,#21909E 0%, #233645  100%);
	.BAMheader {
		margin: 50px 26px 0 26px;
		.avatar {
			width: 50px;
			height: 50px;
			border-radius: 5px;
			overflow: hidden;
			background-color: @m26a69a;
			img {
				height: 50px;
			}
		}
		.userName {
			margin-top: 15px;
			font-size: 16px;
			color: #ffffff;
		}
		.introduce {
			margin-top: 12px;
			font-size: 12px;
			line-height: 20px;
			color: #c5cad0;
			height: 60px;
			.txt-cut(3)
		}
	}
	.navList {
		margin-top: 80px;
		color: #9EB4C9;
		line-height: 46px;
		li {
			width: 100%;
			padding-left: 30px;
			border-left: 4px solid transparent;
			box-sizing: border-box;
			cursor: pointer;
			transition: all 0.4s;
			font-size: 16px;
			color: #9eb4c9;
		}
		li:hover,
		li.active {
			border-left: 4px solid @m26a69a;
			background-color: #263645;
		}
	}
}
</style>

