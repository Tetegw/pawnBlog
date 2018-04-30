<template>
  <div class="codeContainer">
    <div class="lebels">
      <button class="newSnippet" @click="newSnippet">新建</button>
      <div class="all active">
        <div>全部代码段</div>
        <span>23</span>
      </div>
      <div class="labelsWrap">
        <div class="title">LABELS
          <span>+</span>
        </div>
        <ul>
          <li>
            <span class="info green">原生js</span>
            <span class="number">32</span>
          </li>
          <li>
            <span class="info blue">原生js</span>
            <span class="number">32</span>
          </li>
          <li>
            <span class="info fepawn">原生js</span>
            <span class="number">32</span>
          </li>
          <li>
            <span class="info yellow">原生js</span>
            <span class="number">32</span>
          </li>
          <li>
            <span class="info gray">原生js</span>
            <span class="number">32</span>
          </li>
        </ul>
      </div>
      <div class="languagesWrap">
        <div class="title">LANGUAGES
          <span>+</span>
        </div>
        <ul>
          <li>
            <span class="info">原生js</span>
            <span class="number">32</span>
          </li>
          <li>
            <span class="info">原生js</span>
            <span class="number">32</span>
          </li>
          <li>
            <span class="info">原生js</span>
            <span class="number">32</span>
          </li>
          <li>
            <span class="info">原生js</span>
            <span class="number">32</span>
          </li>
          <li>
            <span class="info">原生js</span>
            <span class="number">32</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="column">
      <div class="snippetItem" v-for="(item, index) in snippetTitleList" :key="index" @click="chooseItem(item.id, index)" :class="{'active': index === chooseItemIndex }">
        <div class="title">
          <span class="info">{{item.attributes.codeTitle}}</span>
          <span class="avatar"><img :src="item.attributes.avatar" alt=""></span>
        </div>
        <div class="cont">
          <span class="info">{{item.attributes.intro}}</span>
          <span class="date">{{item.createdAt.slice(5, 10)}}</span>
        </div>
        <div class="label green">{{item.attributes.label}}</div>
      </div>
    </div>
    <div class="content">
      <div class="title">
        <div class="titleWrap">
          <span><input type="text" placeholder="请输入标题" v-model="SnippetTitle" :class="{edit: editing || newSnippetFlag}"></span>
          <span class="label green" v-show="!newSnippetFlag && !editing">jssss</span> 
          <span class="last">删除</span>
          <span class="last" @click="edit">{{editOrDone}}</span>                       
        </div>
        <div class="labelWrap" v-show="newSnippetFlag || editing">
          请选择标签：
          <span class="label green" v-for="(item, index) in labelList" :key="index">{{item}}</span>
          &nbsp;&nbsp;或者&nbsp;&nbsp;
          <input type="text" placeholder="请输入标签">
        </div>
      </div>    

      <div class="url" v-show="codeUrl">
        <span>访问地址：</span>
        <span>{{codeUrl}}</span>
      </div>
      <div class="editWrap">
        <div class="fileNum">File (2)</div>
        <div class="codemirrorWrap">
          <v-codemirror :index="0" @emitCode="getEmitCode" :getBmobCode="getBmobCode"></v-codemirror>
        </div>
        <div class="fileNum addFile">Add File</div>
        <button @click="submitCode">测试提交</button>
      </div>

    </div>
  </div>
</template>

<script>
import CodeMirror from "../codeMirror/codeMirror.vue"
import { queryOneCode, queryCodeList, submitCode, currentUser } from '@/bmob.js'

export default {
  data () {
    return {
      snippetNum: 1,
      userInfo: '',
      avatar: '',
      snippetTitleList: [],
      chooseItemIndex: 0,
      SnippetTitle: '',
      newSnippetFlag: false,
      labelList: [],
      editOrDone: '编辑',
      editing: false,
      codeUrl: '',
      snippetList: [{
        code: '',
        mode: ''
      }],
      getBmobCode: ''
    }
  },
  created () {
    // todo 获取    
    let currentUserId = this.$route.query['userId']
    this.getCodeList(currentUserId)

    currentUser().then((res) => {
      this.avatar = res.attributes.avatar
      this.userInfo = res.id
    }, (err) => {
      console.log(err)
    })
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      let codeId = to.query.snippetId
      queryOneCode(codeId).then((res) => {
        vm.SnippetTitle = res.attributes.codeTitle
        let list = res.attributes.snippetList[0] || {}
        vm.getBmobCode = list.code
        if (/snippetId/.test(location.hash)) {
          vm.codeUrl = `${location.href}`
        }else {
          vm.codeUrl = `${location.href}&snippetId=${codeId}`
        }
      }, (err) => {
        console.log(err)
      })
    })
  },
  beforeRouteUpdate (to, from, next) {
    let codeId = to.query.snippetId
    queryOneCode(codeId).then((res) => {
      this.SnippetTitle = res.attributes.codeTitle
      let list = res.attributes.snippetList[0] || {}
      this.getBmobCode = list.code
      // this.codeUrl = `${location.href}`
      next()
    }, (err) => {
      console.log(err)
    })
  },
  methods: {
    newSnippet () {
      if (this.newSnippetFlag) {
        return
      }
      this.newSnippetFlag = true
      this.editing = true   
      this.SnippetTitle = ''
      this.editOrDone = '完成'
      this.codeUrl = '' 
      // 新建一个对象，初始化所有对象
      this.snippetTitleList.unshift({
        attributes: {
          codeTitle: '请输入标题',
          intro: '请输入描述',
          avatar: '',
          label: '默认'
        },
        id: '',
        createdAt: ''
      })
    },
    getLabelList () {
      // 遍历所有的label，用于用户选择
      let labelList = []
      this.snippetTitleList.forEach((item) => {
        let label = item && item.attributes && item.attributes.label
        if (label) {
          labelList.push(label)
        }
      })
      this.labelList = [...new Set(labelList)]
    },
    edit () {
      if (this.editing) {
        // console.log('点击完成')
        // TODO 如果没有内容，提示
      }
      this.editing = !this.editing
      this.editOrDone = this.editing ? '完成' : '编辑'
    }, 
    getCodeList (id) {
      queryCodeList(id).then((res) => {
        this.snippetTitleList = res
        this.getLabelList()
      }, (err) => {
        console.log(err)
      })
    },
    chooseItem (codeId, index) {
      this.chooseItemIndex = index
      let snippetId = this.snippetTitleList[index].id
      let query = Object.assign({}, this.$route.query, { snippetId: snippetId })
      console.log(query)
      this.$router.push({ path: this.$route.path, query: query })
    },
    getEmitCode (code, index) {
      this.snippetList[index] = {}
      this.snippetList[index].code = code
    },
    submitCode () {
      if (this.$route.query.userId === this.userInfo) {
        let params = {
          userId: this.userInfo,
          snippetList: this.snippetList,
          avatar: this.avatar
        }
        submitCode(params).then((res) => {
          console.log(res)
        }, (err) => {
          console.log(err)
        })
      }
    }
  },
  components: {
    'v-codemirror': CodeMirror
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/style/common.less";
.codeContainer {
  position: absolute;
  top: 50px;
  bottom: 0;
  left: 0;
  right: 0;
  padding-top: 50px;
}
.lebels {
  position: absolute;
  left: 0;
  width: 200px;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
  overflow: scroll;
  float: left;
  border-right: 1px solid #eee;
  text-align: center;
  padding-top: 30px;
  color: #333;
  .newSnippet {
    width: 80%;
    height: 34px;
    background: #26a69a;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    &:hover {
      background: #26968a;
    }
    &:active {
      background: #1d8b80;
    }
  }
  .all {
    margin-top: 30px;
    line-height: 36px;
    padding: 0 10px 0 20px;
    text-align: left;
    font-size: 13px;
    border-left: 4px solid transparent;
    &.active {
      background: #f2f6f6;
      border-left: 4px solid #26a69a;
    }
    div {
      float: left;
    }
    span {
      float: right;
    }
    .clearfixMixin();
  }
  .title {
    margin-top: 40px;
    padding: 0 10px;
    text-align: left;
    font-size: 13px;
    color: #999;
    height: 26px;
    span {
      float: right;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 1px solid #999;
      text-align: center;
      cursor: pointer;
      &:hover {
        border: 1px solid #26a69a;
        color: #26a69a;
      }
    }
  }
  ul {
    li {
      line-height: 36px;
      padding: 0 10px 0 15px;
      text-align: left;
      font-size: 13px;
      transition: all 0.5s linear;
      &.active,
      &:hover {
        background: #f2f6f6;
        border-left: 4px solid #26a69a;
      }
      .info {
        width: 110px;
        overflow: hidden;
        float: left;
        position: relative;
        padding-left: 20px;
        &::before {
          content: "";
          position: absolute;
          top: 13px;
          left: 0;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
      }
      .info.green {
        &::before {
          background: #62b14c;
        }
      }
      .info.blue {
        &::before {
          background: #8ab0ff;
        }
      }
      .info.fepawn {
        &::before {
          background: #3d9888;
        }
      }
      .info.purple {
        &::before {
          background: #910eb1;
        }
      }
      .info.yellow {
        &::before {
          background: #f8cf00;
        }
      }
      .info.gray {
        &::before {
          background: #745448;
        }
      }

      .number {
        float: right;
      }
      .clearfixMixin();
    }
  }
  .languagesWrap {
    .info {
      &::before {
        content: "#";
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
}
.column {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 200px;
  width: 280px;
  box-sizing: border-box;
  overflow-y: scroll;
  float: left;
  border-right: 1px solid #eee;
  .snippetItem {
    border-bottom: 1px solid #eee;
    padding: 12px 15px 16px 34px;
    &:hover,
    &.active {
      background: #f2f6f6;
    }
    .title {
      margin-bottom: 2px;
      line-height: 24px;
      font-size: 14px;
      .clearfixMixin();
      .info {
        float: left;
        width: 190px;
        height: 24px;
        overflow: hidden;
      }
      .avatar {
        float: right;
        width: 24px;
        height: 24px;
        border: 1px solid #eee;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
    }
    .cont {
      margin-bottom: 6px;
      line-height: 24px;
      font-size: 12px;
      color: #999;
      .clearfixMixin();
      .info {
        float: left;
        width: 190px;
        overflow: hidden;
        height: 24px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .date {
        float: right;
      }
    }
    .label {
      display: inline-block;
      line-height: 22px;
      font-size: 12px;
      padding: 0 10px;
      border: 1px solid #eee;
      border-left: 0;
      &.green {
        border-left: 2px solid #62b14c;
      }
      &.blue {
        border-left: 2px solid #8ab0ff;
      }
      &.fepawn {
        border-left: 2px solid #3d9888;
      }
      &.purple {
        border-left: 2px solid #910eb1;
      }
      &.yellow {
        border-left: 2px solid #f8cf00;
      }
      &.gray {
        border-left: 2px solid #745448;
      }
    }
  }
}
.content {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 480px;
  right: 0;
  box-sizing: border-box;
  .title {
    border-bottom: 1px solid #eee;
    padding: 20px 0 20px 24px;
    box-sizing: border-box;
    overflow: hidden;
    .titleWrap {
      .clearfixMixin();
      margin-bottom: 5px;
      .edit{
        background: #f1f9f8;
      }
      span {
        float: left;
        line-height: 24px;
        input {
          line-height: 24px;
          padding-left: 8px;
        }
        &:first-child {
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 24px;
        }
        &.last {
          font-size: 14px;
          color: #999;
          float: right;
          cursor: default;
          padding: 0 10px;
          border: 1px solid transparent;
          &:hover {
            color: #666;
            border: 1px solid #f1f1f1;
            background: #f1f1f1;
            border-radius: 12px;
          }
        }
      }
    }
    .labelWrap{
      height: 30px;
      line-height: 30px;
      overflow: scroll;
      input{
        border: 1px solid #f1f1f1;
        line-height: 24px;
        padding-left: 6px;
        width: 100px;
        font-size: 14px;
      }
    }

    .label {
      display: inline-block;
      line-height: 22px;
      font-size: 12px;
      padding: 0 10px;
      border: 1px solid #eee;
      border-left: 0;
      cursor: default;
      &.green {
        border-left: 2px solid #62b14c;
      }
    }
  }
  .url {
    display: flex;
    line-height: 20px;
    padding: 5px 0;
    border-bottom: 1px solid #eee;
    font-size: 12px;
    color: #999;
    span {
      flex: 1;
      padding: 0 15px;
      &:first-child {
        text-align: center;
        flex: 0 1 80px;
        border-right: 1px solid #eee;
      }
    }
  }
  .editWrap {
    background: #f7f7f7;
    position: absolute;
    top: 138px;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 20px;
    overflow: scroll;
    .fileNum {
      line-height: 50px;
      color: #999;
      font-size: 13px;
    }
    .codemirrorWrap {
      margin-bottom: 30px;
      &.lastChild {
        margin-bottom: 0;
      }
    }
  }
}
</style>