<template>
    <div class="contentComponent">
        <div id="toc" class="toc">
        </div>
        <div class="author">
            <div class="avatar">
                <img :src="userInfoCopy.avatar" alt="">
            </div>
            <div class="authorInfo">
                <div class="name">
                    <span>作者</span>{{userInfoCopy.showName}}</div>
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
            <div class="markdown-content" id="article" v-html="articleContent.render" v-highlight></div>
        </div>

    </div>
</template>

<script>
import Tocbot from "tocbot"
const HEADINGSELECTOR = 'h1, h2, h3, h4' 
export default {
    props: {
        articleContent: {
            type: Object,
        },
        tags: {
            type: Array
        },
        userInfoCopy: {
          type: Object,
          default: {}
        }
    },
    mounted() {
        this.$nextTick(() => {
            Tocbot.init({
                // Where to render the table of contents.
                tocSelector: '#toc',
                // Where to grab the headings to build the table of contents.
                contentSelector: '#article',
                // Which headings to grab inside of the contentSelector element.
                headingSelector: HEADINGSELECTOR,
            });
        })
    },
    updated() {
        let article = document.querySelector('#article')
        HEADINGSELECTOR.split(',').forEach((item, index) => {
            let elList = article.querySelectorAll(item)
            elList.forEach((item, i) => {
                item.setAttribute('id', `h_${index}_${i}`)
            })
        })
        this.$nextTick(() => {
            Tocbot.refresh()
        })        
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
    float: left;
    width: 80%;
    position: relative;
    .author {
        width: 100%;
        padding-bottom: 15px;
        border-bottom: 1px solid #e0e0e0;
        .clearfixMixin();
        .avatar {
            width: 50px;
            height: 50px;
            background-color: #fff;
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
            width: 70%;
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
    h1::before, h2::before, h3::before, h4::before, h5::before, h6::before {
        display: block;
        content: " ";
        height: 60px;
        margin-top: -60px;
        visibility: hidden;
    }
}
@media (max-width:1000px) {
    .contentComponent{
        width: 100%;
    }
}
</style>


<style lang="less">
.toc{
    width: 200px;
    position: fixed;
    top: 150px;
    left: 50%;
    transform: translate(160%);
    overflow-y: auto;
    line-height: 1.8;
    & > .toc-list {
        position: relative;
    }
    .toc-list {
        overflow: hidden;
        margin: 0;
        li {
            list-style: none;
        }
    }
    a.toc-link {
        display: inline-block;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: currentColor;
        height: 100%;
        vertical-align: middle;
        &.node-name--H1{
            padding-left: 10px;
        }
        &.node-name--H2{
            padding-left: 20px;
        }
        &.node-name--H3{
            padding-left: 30px;
        }
        &.node-name--H4{
            padding-left: 40px;
        }
        &.node-name--H5{
            padding-left: 50px;
        }
    }

    .is-collapsible {
        max-height: 1000px;
        overflow: hidden;
        transition: all 300ms ease-in-out;
    }

    .is-collapsed {
        max-height: 0;
    }

    .is-position-fixed {
        position: fixed !important;
        top: 0; 
    }

    .is-active-link {
        font-weight: 700;
    }

    .toc-link::before {
        background-color: #EEE;
        content: ' ';
        display: inline-block;
        height: inherit;
        left: 0;
        margin-top: -1px;
        position: absolute;
        width: 2px;
    }
    .is-active-link{
        background: #f3f3f3;
    }
    .is-active-link::before {
        background-color: #54BC4B;
    }

}
</style>
