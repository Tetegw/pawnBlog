<template>
	<div class="pagination" id="pageRippleWrap">
		<div class="paginationWrap">
			<ul>
				<li class="prev ripple">
					<span class="info">&lt;</span>
			        <div class="rippleWrap"><span></span></div>
				</li>
				<li v-for="(item, index) in total" :class="{ active: activeIndex === index}" class="ripple" @click="choosePage(index)">
					<span class="info">{{item}}</span>
			        <div class="rippleWrap"><span></span></div>
			    </li>
			    <li class="next ripple">
			    	<span class="info">&gt;</span>
			        <div class="rippleWrap"><span></span></div>
			    </li>
			</ul>
		</div>
	</div>
</template>

<script>
import {ripple} from '../../assets/script/common.js';
export default{
	data(){
		return{
			total: 6,
			activeIndex: 0,
		}
	},
	methods:{
		choosePage(index){
			this.activeIndex = index;
			this.$emit('getPage', this.activeIndex)
		}
	},
	mounted(){
		console.log('page mounted')
	}
}
</script>

<style lang="less">
@import '../../assets/style/common.less';
@m26a69a : #26a69a;
.pagination{
	margin: 50px 0 80px;
	text-align: center;
	.paginationWrap{
		.clearfixMixin();
		display: inline-block;
	}
	ul{
		.clearfixMixin();
		float: left;
		font-family: Arial;
		.rippleMixin(0, 24px, rgba(255, 255, 255, .5), 100, page);
		.prev,.next{
			font-family:sans-serif;
		}
		li{
			margin-right: 10px;
			width: 24px;
			height: 24px;
			font-size: 12px;
			line-height: 24px;
			text-align: center;
			float: left;
			cursor: pointer;
			border-radius: 2px;
			transition: all .3s;
			&:hover, &.active{
				color: #fff;
				background-color: @m26a69a;
			}
		}
	}

}

</style>
