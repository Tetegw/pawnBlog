<template>
	<div class="BAMCom">
		<v-BAMSide></v-BAMSide>
		<router-view></router-view>
	</div>
</template>

<script>
import BAMSide from '../B_BAMside/BAMSide.vue';
export default{
	components:{
		'v-BAMSide':BAMSide,
	}
}
</script>

<style>
.BAMCom{
	position: absolute;
	top: 50px;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #F4F6F8;
}
</style>



