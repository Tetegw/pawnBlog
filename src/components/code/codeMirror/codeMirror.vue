<template>
  <div class="codemirrorWrapper">
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

<style scoped>
.codemirrorWrapper{
  font-size: 14px;
  line-height: 18px;
}
</style>
