<template>
	<div class="sidebar">
		<v-catalogue></v-catalogue>
		<v-blogTags></v-blogTags>
	</div>

</template>

<script>
import Catalogue from '../C_catalogue/catalogue.vue';
import blogTags from '../C_blogTags/blogTags.vue';

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

<style>
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