<template>
  <div class="time">
    <div class="emptyBox"></div>
    <div class="error-wrapper" v-show="!allArticleList.length">
      <v-ErrorCom></v-ErrorCom>
    </div>
    <v-timeList :yearList="yearList"></v-timeList>
    <v-sidebar @getColumnArticle="getColumnArticle" @toTag="toTag" :categories="categories" :tags="tags" :currentCategories="currentCategories"></v-sidebar>
  </div>
</template>

<script>
import Sidebar from '@/components/common/sidebar/sidebar'
import TimeList from '@/components/time/timeList/timeList'
import ErrorCom from '@/components/common/error/error'
import { ripple } from '@/assets/script/common'
import { queryArticleList } from '@/bmob.js'
export default {
  data () {
    return {
      allArticleList: [],
      yearList: {},
      categories: [],
      tags: [],
      currentCategories: 0,
    }
  },
  props: {
    articleList: {
      type: Array,
      default: []
    }
  },
  components: {
    'v-sidebar': Sidebar,
    'v-timeList': TimeList,
    'v-ErrorCom': ErrorCom
  },
  created () {
    this.allArticleList = this.articleList
    this._getCategories()
    this._filterYear()
    this._getBlogTags()
  },
  watch: {
    articleList (newVal) {
      this.allArticleList = newVal
      this._getCategories()
      this._filterYear()
      this._getBlogTags()
    }
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
      this._filterYear()
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
      this._filterYear()
      // 给一个随机数，传入到栏目里，每次都会变化，每次都会触发监听器
      this.currentCategories = Math.random()
    },
    _filterYear () {
      const yearList = {}
      this.allArticleList.forEach(function (item) {
        var year = item.date.substring(0, 4)
        if (yearList['yaer' + year] === undefined) {
          yearList['yaer' + year] = []
        }
        yearList['yaer' + year].push(item)
      }, this);
      this.yearList = yearList
    },
    _getCategories () {
      let colListObj = {}
      this.articleList.forEach(function (item) {
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
    }
  },
  mounted () {
    console.log('time mounted')
  }
}
</script>

<style lang="less" scoped>
.time {
  width: 1000px;
  margin: 90px auto 0;
  .emptyBox {
    height: 90px;
    width: 100%;
    position: fixed;
    z-index: 989;
    background-color: #fff;
    top: 0;
    left: 0;
  }
  .error-wrapper{
    width: 75%;
  }
}
</style>
