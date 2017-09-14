<template>
	<div class="BAMCom">
		<v-BAMSide :userInfo="userInfo"></v-BAMSide>
		<router-view></router-view>
	</div>
</template>

<script>
import BAMSide from '@/components/BAM/side/side';
export default {
	data(){
		return {
			userInfo: {}
		}
	},
	created () {
		this._initUserInfo()	
	},
	methods: {
		_initUserInfo(){
			this.$http.get('/initUserInfo').then(function(res){
				this.userInfo = res.body
				console.log(this.userInfo);
			},function(err){
				console.log(err);
			})
		}
	},
	components: {
		'v-BAMSide': BAMSide,
	}
}
</script>

<style scoped>
.BAMCom {
	position: absolute;
	top: 50px;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #F4F6F8;
}
</style>



