<template>
  <div>
    <div class="title">
      <div class="titleWrap">
        <span><input type="text" placeholder="请输入标题" v-model="snippetTitleCopy" :class="{edit: editing}" :disabled="!editing"></span>
        <span class="label green" v-show="!editing">{{chooseLabelItem}}</span> 
        <div v-show="isSelfCodePage">
          <span class="last">删除</span>
          <span class="last" @click="edit">{{editOrDone}}</span>  
        </div>
      </div>
      <div class="labelWrap" v-show="editing">
        <span class="tips">请选择标签：</span>
        <ul>
          <li class="label green" :class="{active: chooseLabelIndex === index}" v-for="(item, index) in labelListCopy" :key="index" @click="chooseLabel(index, item)">{{item}}</li>
        </ul>
        <div v-show="addLabelShow" class="addColumn">
          <input type="text" placeholder="添加分类..." ref="addLabel" v-model="addLabelInfo" @keypress.enter="addLabelSure">
          <button @click="addLabelSure">确定</button>
        </div>
        <button class="more" @click="addLabel">添加</button>
      </div>
    </div>  
    <div class="url" v-show="!editing">
      <span>访问地址：</span>
      <span>{{codeUrl}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editing: false,
      snippetTitleCopy: '',
      editOrDone: '编辑',
      labelListCopy: [],
      chooseLabelIndex: '',
      chooseLabelItem: '',
      addLabelShow: false,
      addLabelInfo: '',
      codeUrl: '11',
    }
  },
  props :{
    isSelfCodePage: {
      type: Boolean,
      default: false
    },
    snippetTitle: {
      type: String,
      default: ''
    },
    snippetLabel: {
      type: String,
      default: ''
    },
    labelList: {
      type: Array,
      default: []
    },
    newFlag: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    snippetTitle(newVal) {
      this.snippetTitleCopy = newVal
      this.$emit('titleDone', {
        snippetTitle: this.snippetTitleCopy
      })
      this.editing = false
      this.editOrDone = this.editing ? '完成' : '编辑'      
    },
    snippetLabel(newVal) {
      this.chooseLabelItem = newVal
      this.$emit('titleDone', {
        chooseLabelItem: this.chooseLabelItem
      })      
    },
    labelList(newVal) {
      this.labelListCopy = newVal
    },
    newFlag(newVal) {
      if (newVal) {
        this.editing = newVal
        this.editOrDone = this.editing ? '完成' : '编辑'
      }
    }
  },
  methods: {
    edit (flag) {
      if (this.editing) {
        // 点击完成，emit给父组件
        if (!this.snippetTitleCopy) {
          this.$emit('showMessage', '请输入标题')
          return
        }
        if (!this.chooseLabelItem) {
          this.$emit('showMessage', '请输入标签')
          return
        }
        this.$emit('hasEdit', true)
        this.$emit('titleDone', {
          snippetTitle: this.snippetTitleCopy,
          chooseLabelItem: this.chooseLabelItem
        })
      } else {
        this.$emit('hasEdit', false)    
        // 编辑
        this.chooseLabelIndex =  this.labelListCopy.indexOf(this.chooseLabelItem)
      }
      this.editing = !this.editing
      this.editOrDone = this.editing ? '完成' : '编辑'
    },
    chooseLabel(index, item) {
      this.chooseLabelIndex = index
      this.chooseLabelItem = item
    },
    addLabel() {
      this.addLabelShow = true
      this.$nextTick(() => {
        this.$refs.addLabel.focus()
      })
    },
    addLabelSure () {
      let flag = false      
      this.addLabelInfo = this.addLabelInfo.trim()
      if (this.labelListCopy.length === 0) {
        flag = false
      } else {
        for (const k in this.labelListCopy) {
          if (this.addLabelInfo === this.labelListCopy[k]) {
            flag = true
            break
          }
        }
      }

      if (!this.addLabelInfo) {
        this.$emit('showMessage', '内容不能为空')
        this.addLabelShow = false
        return
      }
      if (!this.checkString(this.addLabelInfo)) {
        this.$emit('showMessage', '不能包含特殊字符')
        return
      }
      if (flag) {
        //已经存在
        this.$emit('showMessage', '此分类已存在')
        return
      }
      this.labelListCopy.push(this.addLabelInfo)
      this.chooseLabelIndex = this.labelListCopy.length - 1
      this.chooseLabelItem = this.addLabelInfo
      this.addLabelInfo = ''
      this.addLabelShow = false
    },
    checkString(string) {
      var rule = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/
      return rule.test(string)
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/style/common.less";
.title {
  border-bottom: 1px solid #eee;
  padding: 20px 24px 10px 24px;
  box-sizing: border-box;
  overflow: hidden;
  .titleWrap {
    .clearfixMixin();
    margin-bottom: 10px;
    .edit {
      background: #f1f9f8;
    }
    span {
      float: left;
      line-height: 24px;
      input {
        line-height: 24px;
        padding-left: 8px;
        &:disabled{
          background: #fff;
        }
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
  .labelWrap {
    height: 31px;
    line-height: 31px;
    overflow: scroll;
    color: #999;
    font-size: 0;
    .tips{
      font-size: 14px;
      float: left;
    }
    ul {
      font-size: 14px;      
      float: left;
      padding: 0 10px;
    }
    input {
      vertical-align: middle;      
      width: 120px;
      line-height: 24px;
      font-size: 14px;
      height: 24px;
      box-sizing: border-box;
      padding-left: 6px;
      border: 1px solid #eee;
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }
    button {
      width: 50px;
      height: 24px;
      vertical-align: middle;
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
    .more {
      margin-top: 4px;
      min-width: 70px;
      height: 24px;
      box-sizing: border-box;
      border-radius: 2px;
      border: 1px solid #f1f1f1;
      font-size: 14px;
      cursor: pointer;
      color: #999;
      background-color: #fff;
      vertical-align: top;
      &:hover {
        background-color: #f1f1f1;
      }
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
        margin-right: 14px;
        &.green {
          border-left: 2px solid #62b14c;
        }
        &.active{
          border: 1px solid transparent;
          border-left: 2px solid #1f9489;
          background: #27a69a;
          color: #fff;
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
</style>
