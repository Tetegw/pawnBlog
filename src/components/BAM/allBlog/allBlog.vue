<template>
	<div class="BAllBlog">
		<div class="allBlogContent">
			<v-article :articleList="articleList" :toEdit="toEdit" @lastPage="lastPage" @firstPage="firstPage"></v-article>
		</div>
	</div>
</template>

<script>
import Article from '@/components/common/article/article';
export default {
	data() {
		return {
			articleList: [],
			toEdit: true,
		}
	},
	mounted() {
		this._getArticleList()
	},
	methods: {
		_getArticleList() {
			const _this = this
			this.$http.get('/articleList').then(function(res) {
				if (res.body.ret_code = "000") {
					this.articleList = res.body.data;
				} else if (res.body.ret_code = "002") {
					this.emit('showMessage', res.body.ret_msg)
				} else {
					this.emit('showMessage', res.body.ret_msg)
				}
			}, function(res) {
				console.log(res);
			});
		},
		lastPage() {
			this.$emit('showMessage', '已经是尾页了')
		},
		firstPage() {
			this.$emit('showMessage', '已经是首页了')
		}
	},
	components: {
		'v-article': Article
	}
}
</script>

<style lang="less" scoped>
.BAllBlog {
	position: fixed;
	top: 50px;
	bottom: 0;
	left: 200px;
	right: 0;
	background-color: #fff;
	overflow-y: scroll; // overflow-x: hidden;
	padding: 50px 15% 0 8%;
	.article {
		width: 1000px
	}
}
</style>