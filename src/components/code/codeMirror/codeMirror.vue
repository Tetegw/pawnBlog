<template>
  <div class="codemirrorWrapper" :class="{'editing': editing}">
    <div class="title">
      <input class="name" placeholder="文件名(带后缀名)" :value="title" :class="{'sbTitle': !editing}" :disabled="!editing" @input="titleChange"/>
      <div class="edit" v-show="isSelfCodePage">
        <span @click="edit">{{editOrDone}}</span>
        <span @click="alertShow = true">删除</span>
      </div>
    </div>
    <v-codemirror 
    :options="cmOptions" 
    :value="code"
    @input="onCmCodeChange"
    ></v-codemirror>
    <v-Alert  v-show="alertShow" info="确认删除此片段？" @confirm="confirm" @cancel="alertShow = false"></v-Alert>
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror"
import Alert from "@/components/common/alert/alert"
import "codemirror/lib/codemirror.css"
import "codemirror/theme/paraiso-light.css"

// language
// mode: http://codemirror.net/mode/
// theme: http://codemirror.net/demo/theme.html
// 引入的文件： node_modules里
import "codemirror/mode/vue/vue.js" //text/x-vue
import "codemirror/mode/javascript/javascript.js" //text/javascript
import "codemirror/mode/css/css.js" //text/css   text/x-scss text/x-less
import "codemirror/mode/stylus/stylus.js" // text/x-styl
import "codemirror/mode/markdown/markdown.js" //text/x-markdown
// import "codemirror/mode/nginx/nginx.js" //text/x-nginx-conf
import "codemirror/mode/php/php.js" // text/x-php
import "codemirror/mode/python/python.js" // text/x-python
// import "codemirror/mode/shell/shell.js" // text/x-sh
// import "codemirror/mode/sql/sql.js" // text/x-mysql

// import 'codemirror/theme/monokai.css'

export default {
  data() {
    return {
      title: this.fileName,
      code: this.getBmobCode,
      editing: false,
      editOrDone: "编辑",
      alertShow: false,
      cmOptions: {
        tabSize: 2,
        mode: 'text/x-vue',
        theme: 'paraiso-light',
        lineNumbers: true,
        line: true,
        lineWiseCopyCut: true,
        readOnly: true
      }
    };
  },
  props: {
    isSelfCodePage: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    },
    resCode: {
      type: String,
      default: ""
    },
    getBmobCode: {
      type: String,
      default: ""
    },
    fileName: {
      type: String,
      default: ""
    },
    newFlag: {
      type: Boolean,
      default: false
    },
    add: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    if (this.add) {
      this.editing = true
      this.editOrDone = this.editing ? '完成' : '编辑'
      this.cmOptions.readOnly = !this.editing
    }
    this.changeHighlight(this.fileName)
  },
  watch: {
    resCode(newVal) {
      this.code = newVal;
    },
    getBmobCode(newVal) {
      this.code = newVal;
    },
    fileName(newVal) {
      this.title = newVal
      this.editing = false
      this.editOrDone = this.editing ? '完成' : '编辑'
      this.cmOptions.readOnly = !this.editing;      
    },
    newFlag (newVal) {
      if (newVal) {
        this.editing = true
        this.editOrDone = this.editing ? '完成' : '编辑'
        this.cmOptions.readOnly = !this.editing;
      }
    }
  },
  methods: {
    onCmCodeChange(newCode) {
      this.code = newCode;
      this.$emit("emitCode", this.code, this.index, this.title);
    },
    titleChange (e) {
      this.title = e.target.value
      this.changeHighlight(this.title)
      this.$emit("emitCode", this.code, this.index, this.title);
    },
    edit() {
      if (this.editing) {
        // 点击完成
        this.$emit("hasEdit", true);
        this.$emit("emitCode", this.code, this.index, this.title);
      } else {
        this.$emit("hasEdit", false);
      }
      this.editing = !this.editing;
      this.cmOptions.readOnly = !this.editing;
      this.editOrDone = this.editing ? "完成" : "编辑";
    },
    confirm() {
      this.alertShow = false
      this.$emit("hasEdit", true) 
      this.$emit("delFile", this.index)
    },
    changeHighlight (title) {
      let res = title.match(/.\w+$/) || []
      switch (res[0]) {
        case '.js':
        case '.jsx':
          this.cmOptions.mode = 'text/javascript'
          break;
        case '.vue':
          this.cmOptions.mode = 'text/x-vue'
          break;
        case '.html':
          this.cmOptions.mode = 'text/html'
          break;
        case '.css':
        case '.scss':
        case '.less':
          this.cmOptions.mode = 'text/css'
          break;
        case '.styl':
          this.cmOptions.mode = 'text/x-styl'
          break;
        case '.md':
          this.cmOptions.mode = 'text/x-markdown'
          break;
        case '.php':
          this.cmOptions.mode = 'text/x-php'
          break;
        case '.py':
          this.cmOptions.mode = 'text/x-python'
          break;
          
        default:
          this.cmOptions.mode = 'text'
          break;
      }
       
    }
  },
  components: {
    'v-codemirror': codemirror,
    'v-Alert': Alert
  }
};
</script>

<style scoped lang="less">
@import "../../../assets/style/common.less";
.codemirrorWrapper {
  font-size: 14px;
  line-height: 18px;
  box-shadow: 0 0 2px 1px #e2e2e2;
  margin-bottom: 30px;
  &:last-child {
    margin-bottom: 20px;
  }
  .title {
    padding: 0 20px;
    line-height: 40px;
    background: #fff;
    border-bottom: 1px solid #eee;
    .clearfixMixin();
    .name {
      margin-top: 8px;
      background: #f2f6f6;
      float: left;
      height: 24px;
      padding: 0 8px;
      &.sbTitle {
        background: #fff;
      }
    }
    .edit {
      float: right;
      color: #999;
      cursor: default;
      span {
        display: inline-block;
        margin-left: 2px;
        padding: 0 10px;
        line-height: 22px;
        border: 1px solid transparent;
        &:hover {
          border: 1px solid #f1f1f1;
          background: #f1f1f1;
          border-radius: 12px;
        }
      }
    }
  }
}
</style>

<style lang="less">
.codemirrorWrapper {
  .CodeMirror {
    height: auto;
    padding: 8px;
    font-size: 14px;
    line-height: 22px;
  }
  .CodeMirror-scroll {
    margin-right: 0;
  }
  .cm-s-paraiso-light.CodeMirror {
    background: #fff;
  }
  .cm-s-paraiso-light span.cm-string {
    color: #f1b608;
  }
  .cm-s-paraiso-light .CodeMirror-gutters {
    background: #fff;
  }
}
.editing {
  .CodeMirror-sizer {
    background: #f1f9f8;
  }
}
</style>

