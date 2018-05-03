<template>
  <div class="codeContainer">
    <div class="lebels">
      <button v-if="isSelfCodePage" class="newSnippet" @click="newSnippet" :disabled="newDisabled">新建</button>
      <div class="allWrap" :class="{active: chooseLabelIndex === 'all'}">
        <div class="all"  @click="chooseLabel('all')">
          <div>全部代码段</div>
          <span>{{snippetTitleListAll.length}}</span>
        </div>
      </div>
      <div class="labelsWrap">
        <div class="title">LABELS
        </div>
        <ul>
          <li :class="{active: chooseLabelIndex === key}" v-for="(value, key) in labelListAll" :key="key" @click="chooseLabel(key)">
            <span class="info green">{{key}}</span>
            <span class="number">{{value}}</span>
          </li>
        </ul>
      </div>
      <!-- <div class="languagesWrap">
        <div class="title">LANGUAGES
        </div>
        <ul>
          <li>
            <span class="info">原生js</span>
            <span class="number">32</span>
          </li>
        </ul>
      </div> -->
    </div>
    <div class="column">
      <div class="snippetItem" v-for="(item, index) in snippetTitleList" :key="index" @click="chooseItem(index)" :class="{'active': index === chooseItemIndex }">
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
        :labelList="labelList" 
        :newFlag="newFlag" 
        :codeUrl="codeUrl"
        @titleDone="titleDone" 
        @hasEdit="hasEdit" 
        @showMessage="showMsg"
        @delAllSnippet="delAllSnippet"
      ></v-codeTitle>
      <div class="editWrap" :class="{'hasEdit': codeHasEdit}">
        <div class="fileNum">片段 ({{getBmobCodeList.length}})</div>
        <div class="codemirrorWrap" v-for="(item, index) in getBmobCodeList" :key="`${index}_${JSON.stringify(item).slice(10, 30)}`">
          <v-codemirror 
            :isSelfCodePage="isSelfCodePage" 
            :index="index" 
            :getBmobCode="item.code" 
            :fileName="item.title" 
            :newFlag="newFlag" 
            :add="item.add"
            @emitCode="getEmitCode" 
            @hasEdit="hasEdit"
            @showMessage="showMsg"  
            @delFile="delFile"          
          ></v-codemirror>
        </div>
        <div class="fileNum addFile" v-show="isSelfCodePage" @click="addSnippet">增加片段</div>
      </div>
      <div class="footer" v-show="codeHasEdit">
        <button @click="submitCode">提交</button>
        <button @click="cancel">取消</button>
      </div>
      <div class="footer onlyCancel" v-show="showCancel && !codeHasEdit">
        <button @click="cancel">取消</button>
      </div>
    </div>
    <v-Message :messageShow="messageShow" :sendMessage="sendMessage"></v-Message>
    <div class="loading" v-show="loadingShow">
      <div class="icon iconfont icon-loading"></div>
    </div>
  </div>
</template>

<script>
import CodeMirror from "../codeMirror/codeMirror.vue"
import CodeTitle from "../codeTitle/codeTitle.vue"
import Message from '@/components/common/Message/Message'
import { queryOneCode, queryCodeList, _submitCode, currentUser, deatroyCode } from '@/bmob.js'
const nS = 'newSnippet'

export default {
  data () {
    return {
      isSelfCodePage: false,    // 是不是用户自己页面
      userInfo: '',             // 登录用户信息
      avatar: '',               // 代码段用户的头像
      snippetTitle: '',         // 代码段title
      snippetLabel: '',         // 代码段选中的label
      snippetTitleListAll: [],  // 代码段目录列表全部
      snippetTitleList: [],     // 代码段目录列表部分
      chooseItemIndex: 0,       // 选中第几个代码段，变样式
      showCancel: false,        // 显示取消按钮
      labelListAll: [],         // label列表
      labelList: [],            // label列表，去重
      chooseLabelIndex: 'all',      // 选中的label的索引，用户高亮
      newFlag: false,           // 新片段的标识符
      codeUrl: '',              // 代码段的外链url
      titleInfo: {},            // 标题对象（title和label）
      getBmobCodeList: [{code: '', title: ''}], // 代码主要部分
      codeHasEdit: false,       // 代码是否被编辑，是否显示提交按钮
      newDisabled: false,       // 新建按钮  禁止
      messageShow: false,       // 显示提示信息
      sendMessage: '',          // 提示信息内容
      loadingShow: false        // loading显示
    }
  },
  created () {
    this.init()
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.loadingShow = true
      let codeId = to.query.snippetId
      if (codeId === nS) {
        // 新建代码块
        vm.snippetTitle = ''
        vm.snippetLabel = ''
        vm.getBmobCodeList = [{code: '', title: ''}]
        vm.codeHasEdit = false
        vm.showCancel = true
        vm.chooseItemIndex = undefined
        vm.newFlag = true
        vm.codeUrl = '待生成...'
        vm.loadingShow = false
        next()
      } else {
        queryOneCode(codeId).then((res) => {
          vm.snippetTitle = res.attributes.codeTitle
          vm.snippetLabel = res.attributes.label
          vm.codeUrl = res.attributes.codeURL
          vm.getBmobCodeList = res.attributes.snippetList
          vm.loadingShow = false  
        }, (err) => {
          vm.loadingShow = false          
          console.log(err)
        })
      }
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.loadingShow = true 
    let codeId = to.query.snippetId
    if (codeId === nS) {
      // 新建代码块
      this.snippetTitle = ''
      this.snippetLabel = ''
      this.getBmobCodeList = [{code: '', title: ''}]
      this.codeUrl = '待生成...'
      this.codeHasEdit = false
      this.showCancel = true
      this.chooseItemIndex = undefined
      this.newFlag = true
      this.loadingShow = false      
      next()
    } else {
      queryOneCode(codeId).then((res) => {
        this.snippetTitle = res.attributes.codeTitle
        this.snippetLabel = res.attributes.label
        this.codeUrl = res.attributes.codeURL
        this.getBmobCodeList = res.attributes.snippetList
        this.codeHasEdit = false
        this.showCancel = false
        this.newFlag = false
        this.loadingShow = false        
        next()
      }, (err) => {
        this.loadingShow = false        
        console.log(err)
      })
    }
  },
  methods: {
    init (flag) {
      let currentUserId = this.$route.query['userId']
      this.getCodeList(currentUserId, flag)

      currentUser().then((res) => {
        this.avatar = res.attributes.avatar
        this.userInfo = res.id
        this.isSelfCodePage = Boolean(this.$route.query.userId === this.userInfo)
      }, (err) => {
        console.log(err)
      })
    },
    newSnippet () {
      this.newFlag = true
      this.chooseItemIndex = undefined
      let query = Object.assign({}, this.$route.query, { snippetId: nS })
      this.$router.push({ path: this.$route.path, query: query })
    },
    getLabelList () {
      // 遍历所有的label，用于用户选择
      let labelList = []
      let labelListAll = {}
      this.snippetTitleListAll.forEach((item) => {
        let label = item && item.attributes && item.attributes.label
        if (label) {
          labelList.push(label)
          if (labelListAll[label]) {
            labelListAll[label]++
          } else {
            labelListAll[label] = 1
          }
        }
      })
      this.labelListAll = labelListAll
      this.labelList = [...new Set(labelList)]
    },
    getCodeList (id, flag) {
      queryCodeList(id).then((res) => {
        this.snippetTitleList = res       // 用户选择label时，部分list
        this.snippetTitleListAll = res
        // 如果连接中存在snippetid，则选中对应的
        // 如果没有，默认选中第一个
        if (flag) {
          // 提交新片段后，初始化后选择第一个
          this.chooseItem(0)
        }
        if (this.$route.query && this.$route.query.snippetId) {
          for (let i = 0; i < this.snippetTitleListAll.length; i++) {
            const item = this.snippetTitleListAll[i]
            if (this.$route.query.snippetId === item.id) {
              this.chooseItemIndex = i
              break
            }
          }
        } else {
          this.chooseItem(0)
        }
        this.getLabelList()
      }, (err) => {
        console.log(err)
      })
    },
    chooseItem (index) {   
      this.chooseItemIndex = index
      let snippetId = this.snippetTitleList[index] && this.snippetTitleList[index].id
      let query = Object.assign({}, this.$route.query, { snippetId: snippetId })
      this.$router.push({ path: this.$route.path, query: query })
    },
    chooseLabel (key) {
      if (key === 'all') {
        this.chooseLabelIndex = key
        this.snippetTitleList = this.snippetTitleListAll
        this.chooseItem(0)        
        return
      }
      this.chooseLabelIndex = key
      let tempList = []
      this.snippetTitleListAll.forEach((item, index) => {
        if (item.attributes && item.attributes.label === key) {
          tempList.push(item)
        }
      });
      this.snippetTitleList = tempList
      this.chooseItem(0)
    },
    // 标题
    titleDone (obj) {
      this.titleInfo = Object.assign({}, this.titleInfo, obj)
    },
    // code
    getEmitCode (code, index, title) {
      this.getBmobCodeList[index] = { code,title }
    },
    addSnippet () {
      this.getBmobCodeList.push({code: '', title: '', add: true})
    },
    delFile (index) {
      // 弹窗
      this.getBmobCodeList.splice(index, 1)
    },
    delAllSnippet() {
      let codeId = this.$route.query.snippetId
      if (codeId === nS) { return }
      deatroyCode(codeId).then((res) => {
        this.showMsg('删除代码片段成功')
        this.init(true)
      }, (err) => {
        this.showMsg('删除代码片段失败')
      })
    },
    hasEdit (flag) {
      this.codeHasEdit = flag
    },
    cancel () {
      let snippetId = this.$route.query.snippetId
      if (snippetId && snippetId === nS) {
        this.chooseItem(0)
      }
      this.codeHasEdit = false
      this.showCancel = false
    },
    submitCode () {
      if (!this.checkoutAll()) {
        return
      }
      this.getBmobCodeList.forEach((item, index) => {
        if (item.add) {
          this.getBmobCodeList.splice(index, 1)
        }
      });
      if (this.$route.query.userId === this.userInfo) {
        let params = {
          userId: this.userInfo,
          snippetList: this.getBmobCodeList,
          avatar: this.avatar,
          label: this.titleInfo.chooseLabelItem,
          intro: this.getBmobCodeList[0] && this.getBmobCodeList[0].code.slice(0, 20),
          codeTitle: this.titleInfo.snippetTitle
        }
        if (this.$route.query.snippetId && this.$route.query.snippetId !== nS) {
          params.snippetId = this.$route.query.snippetId
        }
        _submitCode(params).then((res) => {
          this.codeHasEdit = false
          this.newDisabled = false
          this.showMsg(res)
          if (this.$route.query.snippetId === nS) {
            this.init(true) // 提交后，初始化后选择第一个
          }
          // setTimeout(() => {
          //   this.chooseItem(0)
          // }, 0);
        }, (err) => {
          this.codeHasEdit = false
          console.log(err)
        })
      } else {
        this.showMsg('请登录或至个人代码段页面')
      }
    },
    checkoutAll () {
      if (!this.titleInfo.snippetTitle) {
        this.showMsg('请输入标题')
        return false
      }
      if (!this.titleInfo.chooseLabelItem) {
        this.showMsg('请输入标签')
        return false
      }
      return true
    },
    showMsg (msg) {
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
    margin-bottom: 30px;
    &:hover {
      background: #26968a;
    }
    &:active {
      background: #1d8b80;
    }
  }
  .allWrap{
    padding: 0 10px;
    transition: all 0.5s linear;
    &.active,
    &:hover {
      background: #f2f6f6;
      border-left: 4px solid #26a69a;
    }
  }
  .all {
    position: relative;
    line-height: 36px;
    padding: 0 10px 0 20px;
    text-align: left;
    font-size: 13px;
    border-left: 4px solid transparent;
     &::before {
      content: "";
      position: absolute;
      top: 13px;
      left: 0;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #62b14c;        
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
    &.hasEdit {
      bottom: 80px;
    }
    .fileNum {
      line-height: 50px;
      color: #999;
      font-size: 13px;
    }
    .addFile {
      display: inline-block;
      padding: 0 10px;
      color: #fff;
      background: #26a69a;
      border-radius: 3px;
      line-height: 30px;
      cursor: default;
      &:hover {
        background: #26968a;
      }
      &:active {
        background: #1d8b80;
      }
    }
  }
  .footer {
    position: absolute;
    z-index: 10;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    padding: 15px 0;
    background: #fff;
    border-top: 1px solid #eee;
    &.onlyCancel {
      height: 60px;
    }
    button {
      height: 30px;
      width: 80%;
      margin-left: 10%;
      margin-top: 15px;
      line-height: 30px;
      background: #26a69a;
      color: #fff;
      padding: 0 10px;
      border-radius: 5px;
      &:hover {
        background: #26968a;
      }
      &:active {
        background: #1d8b80;
      }
    }
  }
}
.loading{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, .06);
  .icon{
    position: absolute;
    top: 42%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    color: #26a69a;
    animation: rotate 1s steps(8)  0s infinite;  
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg)
    }
    to {
      transform: rotate(360deg)
    }
  }
}
</style>