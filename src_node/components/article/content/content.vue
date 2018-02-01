<template>
    <div class="contentComponent">
        <div class="author">
            <div class="avatar">
                <img :src="articleContent.avatar" alt="">
            </div>
            <div class="authorInfo">
                <div class="name">
                    <span>作者</span>{{articleContent.author}}</div>
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
            <div class="markdown-content" v-html="articleContent.render" v-highlight></div>
        </div>

    </div>
</template>

<script>
export default {
    props: {
        articleContent: {
            type: Object,
        },
        tags: {
            type: Array
        }
    },
    directives: {
        highlight(el) {
            let blocks = el.querySelectorAll('pre code');
            blocks.forEach((block) => {
                hljs.highlightBlock(block)
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import url('../../../assets/style/common.less');
@main : #26a69a;
.contentComponent {
    padding-right: 50px;
    float: left;
    width: 100%;
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
    }
}
</style>
