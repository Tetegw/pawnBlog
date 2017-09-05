<template>
	<div class="tagsComponent">
		<v-editor></v-editor>
		<v-Dialog></v-Dialog>
	</div>
</template>

<script>
import Dialog from '@/components/common/dialog/index'
import editor from '@/components/common/editor/index'
export default {
	components: {
		'v-Dialog': Dialog,
		'v-editor': editor,
	}
}
</script>

<style scoped>
.tagsComponent {
	width: 1000px;
	margin: 90px auto;
}
</style>