<template>
	<div class="WriteBlog">
		<h2>写博客</h2>
		<div class="editor">
			<div class="title">
				<select name="original" class="original">
					<option value="原创">原创</option>
					<option value="原创">转载</option>
				</select>
				<input type="text" placeholder="我的新博客...">
			</div>
			<v-editor></v-editor>
		</div>
	</div>
</template>

<script>
import Editor from '@/components/common/editor/editor'
export default {
	components: {
		'v-editor': Editor
	}
}
</script>

<style lang="less" scoped>
.WriteBlog {
	position: fixed;
	top: 50px;
	bottom: 0;
	left: 200px;
	right: 0;
	background-color: #fff;
	padding: 0 15% 0 5%;
	overflow-y: scroll;
	h2 {
		margin: 40px 0 0;
		font-size: 28px;
		color: #b1b1b1;
	}
	.editor {
		margin: 30px 0 0;
		min-width: 1000px;
		.title {
			box-shadow: 0 0px 4px rgba(0, 0, 0, 0.157), 0 0px 4px rgba(0, 0, 0, 0.227);
		}
		.original {
			width: 90px;
			border: 0;
		}
		input {
			height: 45px;
			width: 900px;
			line-height: 45px;
			padding-left: 15px;
			box-sizing: border-box;
			border-left: 1px solid rgba(0, 0, 0, 0.157);
		}
	}
}
</style>