<template>
	<div class="tagsComponent">
		<v-editor></v-editor>
		<v-Dialog></v-Dialog>
	</div>
</template>

<script>
import Dialog from '../D_Dialog/Dialog.vue';
import editor from '../C_editor/editor.vue';
export default{
	components:{
		'v-Dialog':Dialog,
		'v-editor':editor,
	}
}
</script>

<style>
.tagsComponent{
	width: 1000px;
	margin: 90px auto;
}

</style>