<template>
    <div class="articleComponent">
        <v-content :articleContent="articleContent" :tags="tags"></v-content>
        <v-catalog></v-catalog>
        <v-Message :messageShow="messageShow" :sendMessage="sendMessage"></v-Message>
    </div>
</template>

<script>
import Content from '@/components/article/content/content'
import Catalog from '@/components/article/catalog/catalog'
import Message from '@/components/common/Message/Message'
export default {
    data() {
        return {
            articleContent: {},
            tags: [],
            articleId: 0,
            messageShow: false,
            sendMessage: '',
        }
    },
    created() {
        this.articleId = this.$route.query.articleId
        this._getArticle()
    },
    watch: {
        $route(to, from) {
            if (to.path.indexOf("/article") > -1) {
                this.articleId = to.query.articleId
                this._getArticle()
            }
        }
    },
    methods: {
        _getArticle() {
            var _this = this
            this.$http.get('/api/articleDetail?articleId=' + this.articleId).then(function(res) {
                if (res.body.code === -1) {
                    this.messageShow = true;
                    this.sendMessage = res.body.message
                    setTimeout(function() {
                        _this.messageShow = false;
                        _this.$router.push({ path: '/blog' })
                    }, 1500)
                    return;
                }
                this.articleContent = res.body;
                this.tags = this.articleContent.tags.split('，')
            }, function(res) {
                console.log(res);
            });
        }
    },
    components: {
        'v-catalog': Catalog,
        'v-content': Content,
        'v-Message': Message
    }
}
</script>

<style lang="less" scoped>
@import url('../../../assets/style/common.less');
.articleComponent {
    width: 1000px;
    margin: 90px auto;
    .clearfixMixin();
}
</style>
	


