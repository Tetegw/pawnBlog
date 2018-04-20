<template>
	<div class="WriteBlog">
		<h2>写博客</h2>
		<div class="editor">
			<div class="title">
				<select name="original" class="original" v-model="isOriginal">
					<option value="原创">原创</option>
					<option value="转载">转载</option>
				</select>
				<input type="text" placeholder="我的新博客..." v-model="articleTitle">
			</div>
			<mavon-editor class="mavonEditor" @save="save" :toolbars="toolbars" :subfield="subfield" :toolbarsFlag="toolbarsFlag"  v-model="articleValue" :placeholder="placeholder" @change="change" @imgAdd="imgAdd" ref="mavon"></mavon-editor>
		</div>
		<div class="column">
			<div class="title">
				<span class="chinese">分类</span>
				<span class="english">GATEGORIES:</span>
			</div>
			<ul>
				<li :class="{active: chooseColumn === key}" v-for="(value, key) in col" :key="key" @click="chooseCol(key, value)">{{key}}</li>
			</ul>
			<div v-show="addColumnShow" class="addColumn">
				<input type="text" placeholder="添加分类..." ref="addColumn" v-model="addColumnInfo" @keypress.enter="addColumnSure">
				<button @click="addColumnSure">确定</button>
			</div>
			<button class="more" @click="addColumn">添加更多</button>
		</div>
		<div class="tags">
			<div class="title">
				<span class="chinese">标签</span>
				<span class="english">TAGS:</span>
			</div>
			<ul class="addTagsInfo">
				<li v-for="(item, index) in tags" :key="index">
					<span class="info">{{item}}
						<i @click="deleteTag" :index="index">×</i>
					</span>
					<span class="bugle"></span>
				</li>
			</ul>
			<div class="input">
				<input type="text" placeholder="请输入标签，最多三个，Enter提交" v-model="enterTagsInfo" @keypress.enter="addTagsSure">
			</div>
		</div>
		<div class="button">
			<button class="active" @click="addArticle(true)">发布</button>
			<button @click="addArticle(false)" v-if="!this.articlePushId">保存草稿</button>
		</div>
	</div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { pushArticle, pushDraft, currentUser, queryOneArticle, queryOneDraft, deatroyDraft } from '@/bmob'
export default {
  data() {
    return {
      userId: '',
      articleTitle: '',
      isOriginal: '原创',
      articleValue: '',
      articleHtml: '',
      col: [],
      chooseColumn: '',
      chooseColumnId: '',
      addColumnShow: false,
      addColumnInfo: '',
      tags: [],
      articlePushId: '',
      draftPushId: '',
      enterTagsInfo: '',
      placeholder: '请使用Markdown语法编辑...',
      subfield: true,
      toolbarsFlag: true,
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: false, // 全屏编辑
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式        
        preview: true, // 预览
      },
      imgListObj: {},
      bmobFileList: []
    }
  },
  props: {
    articleListResult: {
      type: Array,
      default: []
    }
  },
  created() {
    this._initUserInfo()
    if (this.browserRedirect()) {
      // this.toolbars = {}
      // 移动端
      this.toolbarsFlag = false
      this.subfield = false
    }
  },
  watch: {
    articleListResult () {
      this.getCols()
    }
  },
  methods: {
    initPage() {
      let articleId = this.$route.params.id
      let type = this.$route.params.type
      if (type === 'draft') { // 从草稿箱来
        this._getDraftInfo(articleId)
      } else if (type === 'blog') { // 从发布后的文章来
        this._getArticleInfo(articleId)
      } else {  // 直接访问编写博客功能
        var value = window.localStorage.getItem('pawnBlogArticle');
        if (value) {
          this.articleValue = JSON.parse(value)
        }
      }
    },
    getCols() {
      let colObj = {}
      this.articleListResult.forEach((item) => {
        if (!colObj[item.col]) {
          colObj[item.col] = item.columnId
        }
      })
      this.col = colObj
    },
    _getDraftInfo(draftId) {
      queryOneDraft(draftId).then((res) => {
          if (Object.keys(this.col).indexOf(res.col) > -1) {
            // 文章列表中是否有这个值
            this.chooseColumn = res.col
            this.chooseColumnId = res.columnId
          } else {
            this.col[res.col] = null
            this.chooseColumn = res.col
            this.chooseColumnId = null
          }
          this.draftPushId = res.ID
          this.articleTitle = res.mainTitle
          this.articleValue = res.content
          this.tags = res.tags
          this.isOriginal = res.original
      }, (res) => {
        this.$emit('showMessage', res)
      })
    },
    _getArticleInfo(articleId) {
      queryOneArticle(articleId).then((res) => {
          this.articlePushId = res.ID
          this.articleTitle = res.mainTitle
          this.articleValue = res.content
          this.chooseColumn = res.col
          this.chooseColumnId = res.columnId
          this.tags = res.tags
          this.isOriginal = res.original
      }, (res) => {
        this.$emit('showMessage', res)
      })
    },
    save(value, render) {
      // 存在本地localStorage
      var value = JSON.stringify(value)
      window.localStorage.setItem('pawnBlogArticle', value)
      this.$emit('showMessage', '文章已经暂存')
    },
    change(value, render) {
      this.articleHtml = render
    },
    // todo
    imgAdd(filename, imgfile) {
      // 判断大小
      if (imgfile.size > 1 * 1000 * 1000) {
        this.$emit('showMessage', '上传文件大小不允许超过1M')
        this.$refs.mavon.$imgDel(filename)
        return
      }
      // 判断是不是同一个文件
      let lastModified = imgfile.lastModified.toString()
      let size = imgfile.size.toString()
      let tempName = `${lastModified}-${size}`
      if (this.imgListObj[tempName]) {
        this.$refs.mavon.$imgDel(filename)
        this.$refs.mavon.$img2Url(filename, this.imgListObj[tempName])
        return
      }
      // 开始上传
      let bmobFile = new Bmob.File(imgfile['name'], imgfile)
      bmobFile.save().then((res) => {
        this.bmobFileList.push(res)
        // 存储文件，多次上传同一个文件，直接用存储的
        let lastModified = imgfile.lastModified.toString()
        let size = imgfile.size.toString()
        let tempName = `${lastModified}-${size}`
        this.imgListObj[tempName] = res._url
        this.$refs.mavon.$imgDel(filename)
        this.$refs.mavon.$img2Url(filename, res._url)
        this.$emit('showMessage', '图片上传成功')
			}, (res) => {
        this.$emit('showMessage', '上传失败')
      })
    },
    addColumn() {
      this.addColumnShow = true;
      this.$nextTick(() => {
        this.$refs.addColumn.focus()
      })
    },
    addColumnSure() {
      let self = this
      let flag = false
      this.addColumnInfo = this.addColumnInfo.trim()
      // 如果输入为空，已经存在了，直接返回
      // 如果添加了栏目，则添加后并选中
      if (this.col.length === 0) {
        flag = false
      } else {
        for (const k in this.col) {
          if (self.addColumnInfo === this.col[k]) {
            flag = true
            break
          }
        }
      }

      if (!this.addColumnInfo) {
        this.$emit('showMessage', '内容不能为空')
        this.addColumnShow = false;
        return;
      }
      if (!this.checkString(this.addColumnInfo)) {
        //不符合规则
        this.$emit('showMessage', '不能包含特殊字符')
        return;
      }
      if (flag) {
        //已经存在
        this.$emit('showMessage', '此分类已存在')
        return;
      }
      this.addColumnShow = false
      this.chooseColumnId = null
      this.col[this.addColumnInfo] = this.chooseColumnId
      this.chooseColumn = this.addColumnInfo
      this.addColumnInfo = ''
    },
    chooseCol(col, columnId) {
      this.chooseColumn = col
      this.chooseColumnId = columnId
    },
    addTagsSure() {
      let self = this;
      let index;
      this.enterTagsInfo = this.enterTagsInfo.trim()
      if (this.tags.length === 0) {
        index = -1
      } else {
        index = this.tags.findIndex(function (value, index, arr) {
          return value === self.enterTagsInfo
        })
      }

      if (!this.enterTagsInfo) {
        //输入内容为空
        this.$emit('showMessage', '内容不能为空')
        return;
      }
      if (this.enterTagsInfo.length > 10) {
        //输入长度过长
        this.$emit('showMessage', '标签不能超过10个字符')
        return;
      }
      if (!this.checkString(this.enterTagsInfo)) {
        //不符合规则
        this.$emit('showMessage', '不能包含特殊字符')
        return;
      }
      if (index > -1) {
        //已经存在
        this.$emit('showMessage', '此标签已存在')
        return;
      }
      if (this.tags.length >= 3) {
        //tags大于3个
        this.$emit('showMessage', '标签不能超过三个')
        this.enterTagsInfo = ''
        return;
      }
      this.tags.push(this.enterTagsInfo)
      this.enterTagsInfo = ''
    },
    deleteTag(e) {
      const index = +e.target.getAttribute('index')
      this.tags.splice(index, 1)
    },
    checkString(string) {
      var rule = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/
      return rule.test(string)
    },
    addArticle(type) {
      //检查必填项
      var result = this.checkAll();
      if (!result) {
        return;
      }
      var data = {
        userId: this.userId,
        mainTitle: this.articleTitle,
        tags: this.tags.join('，'),
        intro: this.articleHtml.replace(/\"/g, '\'').substring(0, 120),
        col: this.chooseColumn,
        content: this.articleValue.replace(/\"/g, '\''),
        render: this.articleHtml.replace(/\"/g, '\''),
        original: this.isOriginal,
      }
      data['wordCount'] = data.content.length;  // 字数也存起来，用于获取
      // 删除没有引用但上传的文件
      /* this.bmobFileList.forEach((item) => {
        if (data.content.indexOf(item._url) === -1) {
          item.destroy()
        }
      }); */
      // 如果选中已有分类，传入分类ID，否则不传的话会让其自增加
      if (this.chooseColumnId) {
        data['columnId'] = this.chooseColumnId
      }
      // 如果有articlePushId说明从发布文章来，传入文章ID
      // 发布操作：接口中判断有ID则执行更新操作，否则添加
      if (this.articlePushId) {
        data['objectId'] = this.articlePushId
      }
      // 如果有draftPushId说明是从草稿箱来的，
      // 发布操作：执行添加且清除草稿箱
      // 保存草稿操作: 如果有draftId，接口判断有执行更新，否则添加
      if (type) {  // 发布
        pushArticle(data).then((res) => {
          // 发布成功
          if (this.draftPushId) {
            return deatroyDraft(this.draftPushId)
          } else {
            this.$emit('showMessage', '发布成功')
            window.localStorage.removeItem('pawnBlogArticle')
            this.$router.push({ name: 'BAllBlog' })
          }
        }, (err) => {
          this.$emit('showMessage', '操作失败，请稍微再试')
        }).then((res) => {
          this.$emit('showMessage', '发布成功')
          window.localStorage.removeItem('pawnBlogArticle')
          this.$router.push({ name: 'BAllBlog' })
        }, (err) => {
          this.$emit('showMessage', '操作失败，请稍微再试')
        })
      } else {  // 保存草稿
        if (this.draftPushId) {
          data['objectId'] = this.draftPushId
        }
        pushDraft(data).then((res) => {
          // 发布成功
          this.$emit('showMessage', '发布成功')
          window.localStorage.removeItem('pawnBlogArticle')
          this.$router.push({ name: 'BDraft' })
        }, (err) => {
          this.$emit('showMessage', '操作失败，请稍微再试')
        })
      }
    },
    _initUserInfo() {
      currentUser().then((result) => {
        this.userId = result.id
        this.initPage()
        this.getCols()
      }, (res) => {
        //没有session，未登录（未按步骤操作）
        this.$router.push({ path: '/login' })
      })
    },
    checkAll() {
      if (this.articleTitle === '') {
        this.$emit('showMessage', '请填写博客标题')
        return false;
      }
      if (this.chooseColumn === '') {
        this.$emit('showMessage', '请填写分类')
        return false;
      }
      if (this.tags.length <= 0) {
        this.$emit('showMessage', '请填写标签')
        return false;
      }
      if (this.articleValue === '') {
        this.$emit('showMessage', '博客内容不能为空')
        return false;
      }
      return true;
    },
    browserRedirect() {
      var sUserAgent = navigator.userAgent.toLowerCase();
      var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
      var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
      var bIsMidp = sUserAgent.match(/midp/i) == "midp";
      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
      var bIsAndroid = sUserAgent.match(/android/i) == "android";
      var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
      var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
      /*document.writeln("您的浏览设备为：");*/
      if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return true
      } else {
        return false
      }
    }
  },
  components: {
    'mavon-editor': mavonEditor
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/style/common.less";
.WriteBlog {
  position: fixed;
  top: 50px;
  bottom: 0;
  left: 200px;
  right: 0;
  background-color: #fff;
  padding: 0 15% 80px 5%;
  overflow-y: scroll;
  h2 {
    margin: 40px 0 0;
    font-size: 28px;
    color: #b1b1b1;
  }
  .editor {
    margin: 30px 0 0;
    min-width: 1000px;
    .mavonEditor {
      height: 600px;
    }
    @media (max-width:1400px) {
      .mavonEditor {
        height: 400px;
      }
    }
    .title {
      border: 1px solid rgba(0, 0, 0, 0.157);
      position: relative;
      &::before{
        content: '';
        position: absolute;
        top: 20px;
        left: 66px;
        border-top: 7px solid #888;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
      }
    }
    .original {
      width: 90px;
      height: 40px;
      border: 0;
      border: 0;
      padding-left: 24px;
      font-size: 16px;
      color: #666;
      background: #fff;
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
  .title {
    line-height: 24px;
    .chinese {
      font-size: 18px;
      color: #333333;
    }
    .english {
      font-size: 14px;
      color: #999999;
    }
  }
  .column {
    margin-top: 40px;
    min-height: 68px;
    .clearfixMixin();
    ul {
      li {
        min-width: 70px;
        margin-top: 10px;
        line-height: 26px;
        box-sizing: border-box;
        border-radius: 2px;
        font-size: 14px;
        text-align: center;
        float: left;
        margin-right: 12px;
        border: 1px solid #b1b1b1;
        color: #b1b1b1;
        padding: 0 6px;
        cursor: pointer;
        &.active,
        &:hover {
          border: 1px solid #26a69a;
          color: #26a69a;
        }
        &:first-child {
          margin-left: 0;
        }
      }
    }
    .more {
      min-width: 70px;
      line-height: 26px;
      box-sizing: border-box;
      border-radius: 2px;
      border: 0;
      font-size: 14px;
      margin-right: 12px;
      margin-top: 10px;
      cursor: pointer;
      color: #fff;
      background-color: #26a69a;
      vertical-align: top;
      &:hover {
        background-color: #1a8a7f;
      }
    }
    .addColumn {
      display: inline-block;
      margin-right: 12px;
      font-size: 0;
      margin-top: 10px;
      input {
        width: 120px;
        line-height: 28px;
        font-size: 14px;
        height: 28px;
        box-sizing: border-box;
        padding-left: 6px;
        border: 1px solid #b1b1b1;
        vertical-align: bottom;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
      }
      button {
        width: 50px;
        height: 28px;
        vertical-align: bottom;
        background-color: #26a69a;
        color: #fff;
        border: 0;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
        cursor: pointer;
        &:hover {
          background-color: #1a8a7f;
        }
      }
    }
  }
  .tags {
    margin-top: 30px;
    min-height: 68px;
    .addTagsInfo {
      .clearfixMixin();
      li {
        position: relative;
        margin-top: 10px;
        height: 26px;
        float: left;
        cursor: pointer;
        margin-right: 24px;
        .info {
          line-height: 24px;
          padding: 0 0 0 5px;
          float: left;
          border: 1px solid #26a69a;
          background-color: #26a69a;
          color: #fff;
          i {
            display: inline-block;
            font-size: 18px;
            line-height: 18px;
            width: 16px;
            text-align: center;
            &:hover {
              color: #e91e63;
            }
          }
        }
        .bugle {
          position: absolute;
          top: 0;
          font-size: 0;
          width: 0;
          height: 0;
          border-top: 13px solid transparent;
          border-left: 10px solid #26a69a;
          border-bottom: 13px solid transparent;
          vertical-align: middle;
        }
      }
    }
    .input {
      margin-top: 10px;
      display: inline-block;
      min-width: 300px;
      line-height: 30px;
      border: 1px solid #b1b1b1;
      input {
        height: 28px;
        width: 100%;
        padding-left: 10px;
        box-sizing: border-box;
      }
    }
  }
  .button {
    margin-top: 40px;
    button {
      min-width: 80px;
      height: 30px;
      border-radius: 2px;
      margin-right: 10px;
      background-color: #778a9d;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
      &:hover {
        background-color: #5f6f7f;
      }
      &:active {
        background-color: #555;
      }
      &.active {
        background-color: #26a69a;
        &:hover {
          background-color: #1a8a7f;
        }
        &:active {
          background-color: #0e5d56;
        }
      }
    }
  }
}
@media (max-width: 1000px) {
	.WriteBlog{
		position: absolute;
    top: 0;
    bottom: 50px;
		left: 0;
    padding: 30px;
    h2{
      margin-top: 0;
    }
    .editor{
      min-width: 100%;
      input{
        width: auto;
      }
    }
  }
}
</style>

<style>
  .v-note-wrapper .v-note-op, .v-note-wrapper .v-note-panel{
    /* display: none; */
    box-shadow: 0 0 0 !important;
    border: 1px solid rgba(0, 0, 0, 0.157) !important;
    border-top: none !important;
  }
</style>

