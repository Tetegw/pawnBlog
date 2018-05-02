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
          <!-- 隐藏intro 简介 -->
          <!-- <span class="info">{{item.attributes.intro}}</span> -->
          <div class="label green">{{item.attributes.label}}</div>
          <span class="date">{{item.createdAt.slice(5, 10)}}</span>
        </div>
      </div>
    </div>
    <div class="content">
      <!-- 标题组件 -->
      <v-codeTitle 
        :isSelfCodePage="isSelfCodePage"
        :snippetTitle="snippetTitle"
        :snippetLabel="snippetLabel"
        :editTitle="editTitle" 
        :labelList="labelList"
        @titleDone="titleDone"
        @hasEdit="hasEdit"
        @showMessage="showMsg"
      ></v-codeTitle>
      <div class="editWrap" :class="{'hasEdit': codeHasEdit}">
        <div class="fileNum">片段 (2)</div>
        <div class="codemirrorWrap">
          <v-codemirror 
            :isSelfCodePage="isSelfCodePage"
            :index="0" 
            @emitCode="getEmitCode" 
            :getBmobCode="getBmobCode"
            @hasEdit="hasEdit"
          ></v-codemirror>
        </div>
        <div class="fileNum addFile" v-show="isSelfCodePage">增加片段</div>
      </div>
      <div class="footer" v-show="codeHasEdit">
        <button @click="submitCode">测试提交</button>
      </div>
    </div>
    <v-Message 
      :messageShow="messageShow" 
      :sendMessage="sendMessage"
    ></v-Message>    
  </div>
</template>

<script>
import CodeMirror from "../codeMirror/codeMirror.vue"
import CodeTitle from "../codeTitle/codeTitle.vue"
import Message from '@/components/common/Message/Message'
import { queryOneCode, queryCodeList, submitCode, currentUser } from '@/bmob.js'


export default {
  data () {
    return {
      isSelfCodePage: false,
      snippetNum: 1,
      userInfo: '',
      avatar: '',
      snippetTitle: '',
      snippetLabel: '',
      snippetTitleList: [],
      chooseItemIndex: 0,
      editTitle: false,
      labelList: [],
      titleInfo: {},
      snippetList: [{
        code: '',
        mode: ''
      }],
      getBmobCode: '',
      codeHasEdit: false,
      messageShow: false,
      sendMessage: ''
    }
  },
  created () {  
    this.init()
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      let codeId = to.query.snippetId
      queryOneCode(codeId).then((res) => {
        vm.snippetTitle = res.attributes.codeTitle
        vm.snippetLabel = res.attributes.label
        let list = res.attributes.snippetList[0] || {}
        vm.getBmobCode = list.code
        // if (/snippetId/.test(location.hash)) {
        //   vm.codeUrl = `${location.href}`
        // }else {
        //   vm.codeUrl = `${location.href}&snippetId=${codeId}`
        // }
      }, (err) => {
        console.log(err)
      })
    })
  },
  beforeRouteUpdate (to, from, next) {
    let codeId = to.query.snippetId
    queryOneCode(codeId).then((res) => {
      this.snippetTitle = res.attributes.codeTitle
      this.snippetLabel = res.attributes.label      
      let list = res.attributes.snippetList[0] || {}
      this.getBmobCode = list.code
      // this.codeUrl = `${location.href}`
      next()
    }, (err) => {
      console.log(err)
    })
  },
  methods: {
    init () {
      let currentUserId = this.$route.query['userId']
      this.getCodeList(currentUserId)

      currentUser().then((res) => {
        this.avatar = res.attributes.avatar
        this.userInfo = res.id
        this.isSelfCodePage = Boolean(this.$route.query.userId === this.userInfo)
      }, (err) => {
        console.log(err)
      })
    },
    newSnippet () {
      this.editTitle = true
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
    getCodeList (id) {
      queryCodeList(id).then((res) => {
        this.snippetTitleList = res
        // 如果连接中存在snippetid，则选中对应的
        // 如果没有，默认选中第一个
        if (this.$route.query && this.$route.query.snippetId) {
          for (let i = 0; i < this.snippetTitleList.length; i++) {
            const item = this.snippetTitleList[i]
            if (this.$route.query.snippetId === item.id) {
                this.chooseItemIndex = i
                break
            }
          }
        } else {
          this.chooseItem(null, 0)
        }
        this.getLabelList()
      }, (err) => {
        console.log(err)
      })
    },
    chooseItem (codeId, index) {
      this.chooseItemIndex = index
      let snippetId = this.snippetTitleList[index].id
      let query = Object.assign({}, this.$route.query, { snippetId: snippetId })
      this.$router.push({ path: this.$route.path, query: query })
    },
    // 标题
    titleDone (obj) {
      this.titleInfo = Object.assign({}, this.titleInfo, obj)
    },
    // code
    getEmitCode (code, index) {
      this.snippetList[index] = {}
      this.snippetList[index].code = code
    },
    hasEdit(flag) {
      this.codeHasEdit = flag
    },
    submitCode () {
      if (this.$route.query.userId === this.userInfo) {
        let params = {
          userId: this.userInfo,
          snippetList: this.snippetList,
          avatar: this.avatar,
          label: this.titleInfo.chooseLabelItem,
          intro: this.snippetList[0] && this.snippetList[0].code.slice(0, 20),
          codeTitle: this.titleInfo.snippetTitle,
        }
        if (this.$route.query.snippetId) {
          params.snippetId = this.$route.query.snippetId
        }
        submitCode(params).then((res) => {
          this.showMsg(res)
          this.init()
        }, (err) => {
          console.log(err)
        })
      } else {
        this.showMsg('请回到自己的代码片段页面')
      }
    },
    showMsg(msg) {
      if (!this.messageShow) {
        const _this = this
        this.messageShow = true
        this.sendMessage = msg
        setTimeout(function () {
          _this.messageShow = false
        }, 1500)
      }
    }
  },
  components: {
    'v-codemirror': CodeMirror,
    'v-codeTitle': CodeTitle,
    'v-Message': Message
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
  .editWrap {
    background: #f7f7f7;
    position: absolute;
    top: 98px;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 20px;
    overflow-y: scroll;
    padding-bottom: 20px;
    &.hasEdit{
      bottom: 80px;
    }
    .fileNum {
      line-height: 50px;
      color: #999;
      font-size: 13px;
    }
    .addFile{
      display: inline-block;
      padding: 0 10px;
      color: #fff;
      background: #26a69a;
      border-radius: 3px;
      line-height: 30px;
      cursor: default;
      &:hover{
        background: #26968a;
      }
      &:active{
        background: #1d8b80;
      }
    }
  }
  .footer{
    position: absolute;
    z-index: 10;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: #fff;
    border-top: 1px solid #eee;
    button{
      height: 30px;
      width: 80%;
      position: absolute;
      left: 50%;
      top: 25px;
      transform: translate(-50%, 0);
      line-height: 30px;
      background: #26a69a;
      color: #fff;
      padding: 0 10px;
      border-radius: 5px;
      &:hover{
        background: #26968a;
      }
      &:active{
        background: #1d8b80;
      }
    }
  }
}
</style>