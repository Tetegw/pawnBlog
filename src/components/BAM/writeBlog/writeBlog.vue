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
			<mavon-editor class="mavonEditor" @save="save" :toolbars="toolbars" v-model="articleValue" :placeholder="placeholder" @change="change" @imgAdd="imgAdd" ref="mavon"></mavon-editor>
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
			<button class="active" @click="pushArticle">发布</button>
			<button @click="pushDraft">保存草稿</button>
		</div>
	</div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { pushArticle, currentUser } from '@/bmob'
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
			articlePushId: null,
			draftPushId: 0,
			enterTagsInfo: '',
			placeholder: '请使用Markdown语法编辑...',
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
				fullscreen: true, // 全屏编辑
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
			imgListObj: {}
		}
	},
	props: {
		draftId: {
			type: Number,
			default: 0
		},
		articleId: {
			type: Number,
			default: 0
    },
    articleListResult: {
      type: Array,
      default: []
    }
  },
  created () {
    this._initUserInfo()
  },
	methods: {
    initPage() {
      if (this.draftId) {
        // 从草稿箱来
        this._getDraftInfo(this.draftId)
      } else if (this.articleId) {
        // 从发布后的文章来
        this._getArticleInfo(this.articleId)
      } else {
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
			this.$http.get(`/draftDetail?draftId=${draftId}`).then(function(res) {
				if (res.body.ret_code = "000") {
					var resData = res.body.data
					this.articleTitle = resData.mainTitle
					this.articleValue = resData.content
					this.chooseColumn = resData.col
					this.chooseColumnId = resData.columnId
					this.tags = resData.tags
					this.isOriginal = resData.original
					this.articlePushId = resData.articleId
					this.draftPushId = draftId
					this.col.forEach(function(item) {
						if (item.ID === this.chooseColumnId) {
							this.chooseColumnNum = item.num
						}
					}, this);
				} else if (res.body.ret_code === "001") {
					this.$emit('showMessage', res.body.ret_msg)
				}
			}, function(res) {
				console.log(res);
			});
		},
		_getArticleInfo(articleId) {
			this.$http.get(`/articleDetail?articleId=${articleId}`).then(function(res) {
				if (res.body.ret_code = "000") {
					var resData = res.body.data
					this.articleTitle = resData.mainTitle
					this.articleValue = resData.content
					this.chooseColumn = resData.col
					this.chooseColumnId = resData.columnId
					this.tags = resData.tags
					this.isOriginal = resData.original
					this.articlePushId = articleId
					this.draftPushId = 0
					this.col.forEach(function(item) {
						if (item.ID === this.chooseColumnId) {
							this.chooseColumnNum = item.num
						}
					}, this);
				} else if (res.body.ret_code = "001") {
					this.$emit('showMessage', res.body.ret_msg)
				}
			}, function(res) {
				console.log(res);
			});
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
		imgAdd(filename, imgfile) {
			console.log(filename, imgfile);
			// 判断大小
			if (imgfile.size > 2 * 1000 * 1000) {
				this.$emit('showMessage', '上传文件大小不允许超过2M')
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
			console.log('开始上传');
			let imageData = new FormData()
			imageData.append('imgName', imgfile)
			this.$http.post('/uploadArticle', imageData).then((res) => {
				if (res.body.ret_code === "000") {
					// 存储文件，多次上传同一个文件，直接用存储的
					let lastModified = imgfile.lastModified.toString()
					let size = imgfile.size.toString()
					let tempName = `${lastModified}-${size}`
					this.imgListObj[tempName] = res.body.path
					this.$refs.mavon.$imgDel(filename)
					this.$refs.mavon.$img2Url(filename, res.body.path)
				} else {
					this.$emit('showMessage', res.body.ret_msg)
					this.$refs.mavon.$imgDel(filename)
					console.log(this.$refs.mavon)
				}
			}, (res) => {
				console.log(res);
			});
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
				index = this.tags.findIndex(function(value, index, arr) {
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
		pushArticle() {
			//检查必填项
			var result = this.checkAll();
			if (!result) {
				return;
      }
			var data = {
        userId: this.userId,
				articleId: this.articlePushId,
				mainTitle: this.articleTitle,
				tags: this.tags.join('，'),
				intro: this.articleHtml.replace(/\"/g, '\'').substring(0, 120),
				col: this.chooseColumn,
				content: this.articleValue.replace(/\"/g, '\''),
				render: this.articleHtml.replace(/\"/g, '\''),
				original: this.isOriginal,
      }
      if (this.chooseColumnId) {
        data['columnId'] = this.chooseColumnId
      }
      pushArticle(data).then((res) => {
        // 发布成功
        this.$emit('showMessage', '发布成功')
        window.localStorage.removeItem('pawnBlogArticle')
        this.$router.push({ name: 'BAllBlog' })
			}, (err) => {
				this.$emit('showMessage', '操作失败，请稍微再试')
			})
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
		pushDraft() {
			//检查必填项
			var result = this.checkAll();
			if (!result) {
				return;
			}
			var data = {
				draftId: this.draftPushId * 1,
				articleId: this.articlePushId * 1 || 0,
				mainTitle: this.articleTitle,
				tags: this.tags.join('，'),
				intro: this.articleHtml.replace(/\"/g, '\'').substring(0, 120),
				col: this.chooseColumn,
				columnId: this.chooseColumnId,
				content: this.articleValue.replace(/\"/g, '\''),
				contentRender: this.articleHtml.replace(/\"/g, '\''),
				original: this.isOriginal,
			}
			this.$http.post('/pushDraft', data).then((res) => {
				// 发布成功
				if (res.body.ret_code === "000") {
					this.$emit('showMessage', '发布成功')
					window.localStorage.removeItem('pawnBlogArticle')
					this.$router.push({ name: 'BDraft' })
					// todo 清除草稿箱对应文章
				}
			}, (err) => {
				this.$emit('showMessage', '操作失败，请稍微再试')
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
		}
	},
	components: {
		'mavon-editor': mavonEditor
	}
}
</script>

<style lang="less" scoped>
@import '../../../assets/style/common.less';
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
		height: 650px;
		.mavonEditor {
			height: 600px;
		}
		.title {
			border: 1px solid rgba(0, 0, 0, 0.157);
		}
		.original {
			width: 90px;
			height: 40px;
			border: 0;
			border: 0;
			padding-left: 24px;
			font-size: 16px;
			color: #666;
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
			width: 80px;
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
				background-color: #555
			}
			&.active {
				background-color: #26a69a;
				&:hover {
					background-color: #1a8a7f;
				}
				&:active {
					background-color: #0e5d56
				}
			}
		}
	}
}
</style>
