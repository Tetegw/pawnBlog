<template>
	<div class="sidebar">
		<v-catalogue></v-catalogue>
		<v-blogTags></v-blogTags>
	</div>

</template>

<script>
import Catalogue from '@/components/common/catalogue/index';
import blogTags from '@/components/common/blogTags/index';

export default{
	components:{
		'v-catalogue' : Catalogue,
		'v-blogTags': blogTags
	},
	mounted(){
		console.log('sidebar mounted')
	}
}

</script>

<style scoped>
.sidebar{
	width: 250px;
	/*float: right;*/
	position: fixed;
	left: 50%;
	margin-left: 250px;
	top: 70px;
	padding-top: 34px;

}
</style>