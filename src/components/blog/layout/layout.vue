<template>
  <div class="container">
    <div class="author">
      <div class="avatar">
        <img :src="userInfo.avatar" alt="">
      </div>
      <div class="authorInfo">
        <div class="name">
          <span>作者</span>{{userInfo.showName}}
        </div>
        <div class="articleNum">
          文章：{{articleList.length}}
          <span>&nbsp;|&nbsp;</span>
          字数：{{wordCount}}
        </div>
        <div class="singName">{{userInfo.singName}}</div>
      </div>
    </div>
    <div class="error-wrapper" v-show="!allArticleList.length">
      <v-ErrorCom></v-ErrorCom>
    </div>
    <v-article :articleList="allArticleList" @lastPage="lastPage" @firstPage="firstPage" @toTag="toTag"></v-article>
    <v-sidebar @getColumnArticle="getColumnArticle" @toTag="toTag" :categories="categories" :tags="tags" :currentCategories="currentCategories"></v-sidebar>
    <v-Message :messageShow="messageShow" :sendMessage="sendMessage"></v-Message>
  </div>
</template>

<script>
import Article from '@/components/common/article/article'
import Sidebar from '@/components/common/sidebar/sidebar'
import Message from '@/components/common/Message/Message'
import ErrorCom from '@/components/common/error/error'

export default {
  data () {
    return {
      wordCount: 0,
      allArticleList: [],
      categories: [],
      tags: [],
      messageShow: false,
      sendMessage: '',
      currentPage: 0,
      currentCategories: 0,
    }
  },
  props: {
    articleList: {
      type: Array,
      default: []
    },
    userInfo: {
      type: Object,
      default: {}
    }
  },
  watch: {
    articleList (newVal) {
      this.allArticleList = newVal
      this._getCategories()
      this._getBlogTags()
      this._getWordCount()
    }
  },
  created () {
    this.allArticleList = this.articleList
    this._getCategories()
    this._getBlogTags()
    this._getWordCount()
  },
  methods: {
    getColumnArticle (columnId) {
      if (columnId === 'all') {
        this.allArticleList = this.articleList
      } else {
        let newArticleList = []
        this.articleList.forEach((item) => {
          if (item.columnId === columnId) {
            newArticleList.push(item)
          }
        })
        this.allArticleList = newArticleList
      }
      window.pageYOffset = 0
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    },
    toTag (itemTag) {
      var tagList = this.articleList.filter((item) => {
        var findItem = item.tags.find((value) => {
          return value === itemTag
        })
        // undefined 或者 上传
        return findItem !== undefined
      })
      this.allArticleList = tagList
      // 给一个随机数，传入到栏目里，每次都会变化，每次都会触发监听器
      this.currentCategories = Math.random()
      window.pageYOffset = 0
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    },
    search (searchKeyword) {
      let _this = this
      this.messageShow = true;
      this.sendMessage = '不支持免费搜索，滚！'
      setTimeout(function () {
        _this.messageShow = false;
        // window.location.reload()
      }, 1500)
    },
    firstPage () {
      this._pageErrorMessage('已经是首页了')
    },
    lastPage () {
      this._pageErrorMessage('已经是尾页了')
    },
    _pageErrorMessage (msg) {
      //节流阀
      if (!this.messageShow) {
        const _this = this
        this.messageShow = true;
        this.sendMessage = msg
        setTimeout(function () {
          _this.messageShow = false;
        }, 1500)
      }
    },
    _getCategories () {
      let colListObj = {}
      this.allArticleList.forEach(function (item) {
        if (!colListObj[item.columnId]) {
          colListObj[item.columnId] = {
            "col": item.col,
            "num": 1
          }
        } else {
          ++colListObj[item.columnId]["num"]
        }
      }, this);
      let newList = []
      for (var k in colListObj) {
        newList.push({
          "ID": Number(k),
          "col": colListObj[k]["col"],
          "num": colListObj[k]["num"]
        })
      }
      this.categories = newList
    },
    _getBlogTags () {
      let newList = []
      let tagsList = []
      this.allArticleList.forEach(function (item) {
        item.tags.forEach(function (element) {
          newList.push(element)
          newList = [...new Set(newList)]
        }, this);
      }, this);
      newList.forEach(function (item) {
        tagsList.push({ 'tag': item })
      })
      this.tags = tagsList
    },
    _getWordCount () {
      let numCount = 0
      this.allArticleList.forEach(function (item) {
        console.log(item)
        numCount += item.wordCount
      }, this);
      this.wordCount = numCount
    }
  },
  mounted () {
    console.log('blog mounted')
  },
  components: {
    'v-article': Article,
    'v-sidebar': Sidebar,
    'v-Message': Message,
    'v-ErrorCom': ErrorCom,
  },
}

</script>

<style lang="less" scoped>
@import "../../../assets/style/common.less";
@main : #26a69a;
.container {
  width: 1000px;
  position: relative;
  margin: 70px auto 0;
  .clearfixMixin();
  .emptyBox {
    height: 90px;
    width: 100%;
    position: fixed;
    z-index: 989;
    background-color: #fff;
    top: 0;
    left: 0;
  }
  .author {
    width: 75%;
    margin-top: 30px;
    padding-bottom: 15px;
    .clearfixMixin();
    .avatar {
      width: 70px;
      height: 70px;
      background-color: #fff;
      float: left;
      margin: 7px 18px 0 0;
      overflow: hidden;
      img {
        height: 100%;
      }
    }
    .authorInfo {
      float: left;
      padding-top: 6px;
      width: 660px;
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
      .articleNum {
        color: #969696;
        margin-bottom: 10px;
        span {
          color: #dbdbdb;
        }
      }
      .singName {
        color: #777777;
        line-height: 20px;
        .txt-cut(1);
      }
    }
  }
  .error-wrapper{
    width: 75%;
  }
}
@media (max-width:1000px) {
  .container{
    width: 100%;
    margin: 50px auto 0;
    .author{
      width: 100%;
      padding: 0 20px;
      .avatar{
        display: none;
      }   
      .authorInfo{
        width: auto;
      }
    }
    & > div{
      width: 100%;
    }
  }
}
</style>
