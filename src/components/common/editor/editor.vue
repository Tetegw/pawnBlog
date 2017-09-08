<template>
	<div id="editor">
	    <mavon-editor style="height: 100%" ></mavon-editor>
	</div>
</template>

<script>
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

export default {
    components: {
    	'mavon-editor': mavonEditor
    }
}
</script>

<style scoped>
#editor{
    margin: auto;
    width: 100%;
    height: 580px;
}
</style>