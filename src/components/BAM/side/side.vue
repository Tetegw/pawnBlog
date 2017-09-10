<template>
	<div class="BAMSide" id="BAMRippleWrap">
		<div class="BAMheader">
			<div class="avatar">
				<img src="" alt="">
			</div>
			<p class="userName">孙晨</p>
			<p class="introduce">我是一个大菜鸡...</p>
		</div>
		<ul class="navList">
			<li class="ripple" :class="{active: activeItem === 'Barticle'}" @click="changeItem('Barticle')">
				<span class="info">文章管理</span>
				<div class="rippleWrap"><span></span></div>
			</li>
			<li class="ripple" :class="{active: activeItem === 'Btags'}" @click="changeItem('Btags')">
				<span class="info">标签管理</span>
				<div class="rippleWrap"><span></span></div>
			</li>
			<li class="ripple" :class="{active: activeItem === 'Bself'}" @click="changeItem('Bself')">
				<span class="info">个人资料</span>
				<div class="rippleWrap"><span></span></div>
			</li>
		</ul>
	</div>
</template>

<script>
import {ripple} from '@/assets/script/common';
export default {
	data(){
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
	mounted(){
		console.log('BAMSide mounted')
		var index = this.$route.path.indexOf('/BAM')
		if (index > -1)  {
			this.activeItem = this.$route.path.substring(index + 5)
		}
		ripple('BAMRippleWrap');
	},
	methods:{
		changeItem(item){
			this.activeItem = item;
			var pathName = '/BAM/' + item;
			this.$router.push({ path: pathName })
		}
	}

}
</script>

<style lang="less" scoped>
@import '../../../assets/style/common.less';
@m26a69a : #26a69a;
.BAMSide{
	width: 200px;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	background-color: #2F4050;
	// background-image:linear-gradient(180deg,#21909E 0%, #233645  100%);
	.BAMheader{
		.avatar{
			margin: 40px 0 0 18px;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			background-color: @m26a69a ;
		}
		.userName{
			margin-top: 12px;
			font-size: 14px;
			padding-left: 20px;
			color: #D2D4E0;
		}
		.introduce{
			margin-top: 5px;
			font-size: 12px;
			line-height: 20px;
			padding-left: 20px;
			color: #6F8593;
		}
	}
	.navList{
		margin-top: 50px;
		color:#9EB4C9;
		line-height: 50px;
		.rippleMixin(10px, 100%, rgba(255, 255, 255, .15), 400, BAMList);
		li{
			width: 100%;
			border-left: 4px solid transparent;
			box-sizing: border-box;
			cursor: pointer;
		}
		li:hover, li.active{
			border-left: 4px solid @m26a69a;
			background-color: #263645;
		}
	}
}
</style>

