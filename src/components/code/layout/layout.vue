<template>
  <div>
      <button @click="newSnippet">新建</button>
      <div class="CmWrapper" v-for="(item, index) in snippetNum" :key="item">
        <v-codemirror :index="index" @emitCode="getCode"></v-codemirror>
      </div>   
  </div>
</template>

<script>
import CodeMirror from "../codeMirror/codeMirror.vue";
export default {
  data() {
    return {
      snippetNum: 1,
      snippetList: [{
        code: '',
        mode: ''
      }]
    }
  },
  methods: {
    getCode(code, index) {
      this.snippetList[index] = {}
      this.snippetList[index].code = code
    },
    newSnippet() {
      this.snippetNum++
    }
  },
  components: {
    'v-codemirror': CodeMirror
  }
}
</script>

<style scoped>
.CmWrapper{
  margin-bottom: 20px;
}
</style>
