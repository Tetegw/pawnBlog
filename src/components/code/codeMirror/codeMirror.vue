<template>
  <div class="codemirrorWrapper" :class="{'editing': editing}">
    <div class="title">
      <input class="name" placeholder="文件名(带后缀名)" v-model="title" @blur="submitTitle" @keyup.enter="submitTitle" @focus="sbTitle = false" :class="{'sbTitle':  sbTitle}" />
      <div class="edit">
        <span @click="edit">{{editOrDone}}</span>
        <span>删除</span>
      </div>
    </div>
    <v-codemirror 
    :options="cmOptions" 
    :value="code"
    @input="onCmCodeChange"
    ></v-codemirror>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'

// language
import 'codemirror/mode/vue/vue.js' //text/x-vue
import 'codemirror/mode/javascript/javascript.js' //text/javascript
import 'codemirror/mode/css/css.js'   //text/css   text/x-scss text/x-less
import 'codemirror/mode/jsx/jsx.js' //text/javascript
import 'codemirror/mode/markdown/markdown.js' //text/x-markdown
import 'codemirror/mode/nginx/nginx.js' //text/x-nginx-conf
import 'codemirror/mode/php/php.js' // text/x-php
import 'codemirror/mode/python/python.js' // text/x-python
import 'codemirror/mode/sass/sass.js' //text/x-sass
import 'codemirror/mode/shell/shell.js' // text/x-sh
import 'codemirror/mode/sql/sql.js' // text/x-mysql
import 'codemirror/mode/stylus/stylus.js' // text/x-styl

import 'codemirror/theme/paraiso-light.css'
// import 'codemirror/theme/monokai.css'

export default {
  data() {
    return {
      title: 'aa.js',
      sbTitle: true,
      code: 'adsfa',
      editing: false,
      editOrDone: '编辑',
      cmOptions: {
        tabSize: 2,
        mode: 'text/x-vue',
        theme: 'paraiso-light',
        lineNumbers: true,
        line: true,
        lineWiseCopyCut: true,
        readOnly: true
      }
    }
  },
  props: {
      index: {
          type: Number,
          default: 0
      },
      resCode: {
        type: String,
        default: ''
      }
  },
  watch: {
    resCode(newVal) {
      this.code = newVal
    }
  },
  methods: {
      onCmCodeChange(newCode) {
          this.code = newCode
          this.$emit('emitCode', this.code, this.index)
      },
      submitTitle() {
        console.log(this.title)
        this.sbTitle = true
      },
      edit () {
        this.editing = !this.editing
        this.cmOptions.readOnly = !this.editing
        this.editOrDone = this.editing ? '完成' : '编辑'
      }
  },
  components: {
    'v-codemirror': codemirror
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/style/common.less";
.codemirrorWrapper{
  font-size: 14px;
  line-height: 18px;
  box-shadow: 0 0 2px 1px #e2e2e2;
  .title{
    padding: 0 20px;
    line-height: 40px;
    background: #fff;
    border-bottom: 1px solid #eee;
    .clearfixMixin();     
    .name{
      margin-top: 8px;
      background: #f2f6f6;
      float: left;
      height: 24px;
      padding: 0 8px;
      &.sbTitle{
        background: #fff;
      }
    }
    .edit{
      float: right;
      color: #999;
      cursor: default;
      span{
        display: inline-block;
        margin-left: 2px;
        padding: 0 10px;
        line-height: 22px;
        border: 1px solid transparent;
        &:hover{
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
.codemirrorWrapper{
  .CodeMirror{
    height: auto;
    padding: 8px;
    font-size: 14px;
    line-height: 22px;
  }
  .CodeMirror-scroll{
    margin-right: 0;
  }
  .cm-s-paraiso-light.CodeMirror{
    background: #fff;
  }
  .cm-s-paraiso-light span.cm-string{
    color: #f1b608;
  }
  .cm-s-paraiso-light .CodeMirror-gutters{
    background: #fff;    
  }
}
.editing{
  .CodeMirror-sizer{
    background: #f1f9f8;
  }
}
</style>

