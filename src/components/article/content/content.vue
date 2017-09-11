<template>
    <div class="contentComponent">
        <div class="author">
            <div class="avatar">
                <img src="../../common/header/noavatar_small.gif" alt="">
            </div>
            <div class="authorInfo">
                <div class="name">
                    <span>作者</span>Tetegw</div>
                <div class="reviseTime">最后修改：{{articleContent.date}}</div>
            </div>
        </div>
        <div class="container">
            <div class="title">{{articleContent.mainTitle}}</div>
            <div class="tag">
                <ul>
                    <li v-for="(item, index) in tags" :key="index">{{item}}</li>
                </ul>
            </div>
            <div class="main" ref="articleMain" v-html="articleContent.content"></div>
        </div>
        <v-Message :messageShow="messageShow" :sendMessage="sendMessage"></v-Message>
    </div>
</template>

<script>
import Message from '@/components/common/Message/Message';
export default {
    data() {
        return {
            articleContent: {},
            tags: [],
            messageShow: false,
            sendMessage: '',
            articleId: 0,
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
                this.$nextTick(() => {
                    const DomP = this.$refs.articleMain.querySelectorAll('p');
                    const DomPre = this.$refs.articleMain.querySelectorAll('pre');
                    const DomImg = this.$refs.articleMain.querySelectorAll('img');
                    DomP.forEach((item) => {
                        item.style.marginBottom = 20 + 'px';
                    }, this);
                    DomPre.forEach((item) => {
                        item.style.overflowX = 'scroll';
                    }, this)
                    DomImg.forEach((item) => {
                        item.style.maxWidth = '100%';
                    }, this)
                })
            }, function(res) {
                console.log(res);
            });
        }
    },
    components: {
        'v-Message': Message
    }
}
</script>

<style lang="less" scoped>
@import url('../../../assets/style/common.less');
@main : #26a69a;
.contentComponent {
    width: 700px;
    padding-right: 50px;
    float: left;
    .author {
        padding-bottom: 15px;
        border-bottom: 1px solid #e0e0e0;
        .clearfixMixin();
        .avatar {
            width: 50px;
            height: 50px;
            background-color: @main;
            float: left;
            margin-right: 18px;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .authorInfo {
            float: left;
            padding-top: 6px;
            .name {
                margin-bottom: 10px;
                .clearfixMixin();
                span {
                    float: left;
                    width: 30px;
                    height: 17px;
                    border: 1px solid @main;
                    border-radius: 4px;
                    margin-right: 10px;
                    font-size: 12px;
                    color: @main;
                    line-height: 17px;
                    text-align: center;
                }
            }
            .reviseTime {
                font-size: 12px;
                color: #969696;
            }
        }
    }
    .container {
        padding-top: 35px;
        .title {
            color: #333;
            font-size: 24px;
            font-weight: 400;
        }
        .tag {
            margin: 15px 0 30px 0;
            .clearfixMixin();
            li {
                float: left;
                padding: 0 6px;
                height: 24px;
                background-color: rgba(1, 126, 102, 0.08);
                color: #2e9c92;
                line-height: 24px;
                font-size: 13px;
                margin-right: 5px;
            }
        }
        .main {
            color: #333333;
            line-height: 26px;
        }
        .pre {
            width: 700px;
            overflow-x: scroll;
        }
    }
}
</style>
