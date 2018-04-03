<template>
    <div class="articleComponent">
        <v-content :articleContent="articleContent" :tags="tags" :userInfoCopy="userInfoCopy"></v-content>
        <v-Message :messageShow="messageShow" :sendMessage="sendMessage"></v-Message>
    </div>
</template>

<script>
import Content from '@/components/article/content/content'
import Message from '@/components/common/Message/Message'
import {queryArticleList, queryOneArticle} from '@/bmob.js';

export default {
    data() {
        return {
            articleContent: {},
            tags: [],
            articleId: 0,
            messageShow: false,
            sendMessage: '',
            userInfoCopy: {}
        }
    },
    props: {
      userInfo: {
        type: Object,
        default: {}
      }
    },
    created() {
        this.articleId = this.$route.query.articleId
        this.userInfoCopy = this.userInfo
        this._getArticle()
    },
    watch: {
        userInfo(newVal) {
          this.userInfoCopy = newVal
        },
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
            // todo 用户头像问题
            queryOneArticle(this.articleId).then((result) => {
               this.articleContent = result
               this.tags = this.articleContent.tags
            }, (res) => {
              this.messageShow = true
              this.sendMessage = res.body.message
              setTimeout(function() {
                  _this.messageShow = false;
                  _this.$router.push({ path: '/blog' })
              }, 1500)
            })
        }
    },
    components: {
        'v-content': Content,
        'v-Message': Message
    }
}
</script>

<style lang="less" scoped>
@import url('../../../assets/style/common.less');
.articleComponent {
    max-width: 1000px;
    margin: 90px auto;
    padding: 0 30px;
    .clearfixMixin();
}
</style>



