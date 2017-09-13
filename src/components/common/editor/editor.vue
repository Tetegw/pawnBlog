<template>
	<div id="editor">
	    <mavon-editor style="height: 100%"  @save="save"></mavon-editor>
	</div>
</template>

<script>
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

export default {
    methods: {
        save(value, render){
            this.$http.post('/api/saveArticle', {content: render}).then(function(res){
                console.log(res.body);
            },function(res){

            })
        }
    },
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