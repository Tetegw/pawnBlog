<template>
	<div class="sidebar">
		<v-catalogue @getColumnArticle="getColumnArticle" :categories="categories"></v-catalogue>
		<v-blogTags></v-blogTags>
	</div>
</template>

<script>
import Catalogue from '@/components/common/catalogue/catalogue';
import blogTags from '@/components/common/blogTags/blogTags';

export default {
	props: {
		categories: {
			type: Array,
			default: []
		}
	},
	components: {
		'v-catalogue': Catalogue,
		'v-blogTags': blogTags
	},
	methods: {
		getColumnArticle(columnId) {
			this.$emit('getColumnArticle', columnId)
		}
	},
	mounted() {
		console.log('sidebar mounted')
	}
}

</script>

<style scoped>
.sidebar {
	width: 250px;
	/*float: right;*/
	position: fixed;
	left: 50%;
	margin-left: 250px;
	top: 70px;
	padding-top: 34px;
}
</style>