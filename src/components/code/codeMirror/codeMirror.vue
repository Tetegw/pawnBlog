<template>
  <div class="codemirrorWrapper">
    <div class="title">
      <span class="name">标题.js</span>
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
import 'codemirror/mode/vue/vue.js'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/theme/paraiso-light.css'
import 'codemirror/theme/monokai.css'

export default {
  data() {
    return {
      code: '',
      cmOptions: {
        tabSize: 2,
        mode: 'text/x-vue',
        theme: 'paraiso-light',
        lineNumbers: true,
        line: true,
        lineWiseCopyCut: true
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
      }
  },
  components: {
    'v-codemirror': codemirror
  }
}
</script>

<style scoped lang="less">
.codemirrorWrapper{
  font-size: 14px;
  line-height: 18px;
  box-shadow: 0 0 2px 1px #e2e2e2;
  .title{
    padding: 0 20px;
    line-height: 40px;
    background: #fff;
    border-bottom: 1px solid #eee;
  }
}
</style>

<style lang="less">
.codemirrorWrapper{
  .CodeMirror{
    height: auto;
    min-height: 100px;
    padding: 8px;
    font-size: 13px;
  }
  .cm-s-paraiso-light.CodeMirror{
    background: #fff;
  }
  .cm-s-paraiso-light .CodeMirror-gutters{
    background: #fff;    
  }
}

</style>

