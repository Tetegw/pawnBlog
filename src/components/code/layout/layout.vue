<template>
  <div class="codeContainer">
    <div class="lebels">
      <button class="newSnippet">新建</button>
      <div class="all active">
        <div>全部代码段</div>
        <span>23</span>
      </div>
      <div class="labelsWrap">
        <div class="title">LABELS<span>+</span></div>
        <ul>
          <li><span class="info green">原生js</span><span class="number">32</span></li>
          <li><span class="info blue">原生js</span><span class="number">32</span></li>
          <li><span class="info fepawn">原生js</span><span class="number">32</span></li>
          <li><span class="info yellow">原生js</span><span class="number">32</span></li>
          <li><span class="info gray">原生js</span><span class="number">32</span></li>
        </ul>
      </div>
      <div class="languagesWrap">
        <div class="title">LANGUAGES<span>+</span></div>
        <ul>
          <li><span class="info">原生js</span><span class="number">32</span></li>
          <li><span class="info">原生js</span><span class="number">32</span></li>
          <li><span class="info">原生js</span><span class="number">32</span></li>
          <li><span class="info">原生js</span><span class="number">32</span></li>
          <li><span class="info">原生js</span><span class="number">32</span></li>
        </ul>
      </div>
    </div>
    <div class="column">
      <div class="snippetItem">
        <div class="title"><span class="info">唤起微信</span><span class="avatar"></span></div>
        <div class="cont"><span class="info">唤起微信，ios已测试，安卓待测试</span><span class="date">4/20</span></div>
        <div class="label green">原生js</div>
      </div>
      <div class="snippetItem active">
        <div class="title"><span class="info">唤起微信</span><span class="avatar"></span></div>
        <div class="cont"><span class="info">唤起微信，ios已测试，安卓待测试</span><span class="date">4/20</span></div>
        <div class="label green">原生js</div>
      </div>
      <div class="snippetItem">
        <div class="title"><span class="info">唤起微信</span><span class="avatar"></span></div>
        <div class="cont"><span class="info">唤起微信，ios已测试，安卓待测试</span><span class="date">4/20</span></div>
        <div class="label green">原生js</div>
      </div>
      <div class="snippetItem">
        <div class="title"><span class="info">唤起微信</span><span class="avatar"></span></div>
        <div class="cont"><span class="info">唤起微信，ios已测试，安卓待测试</span><span class="date">4/20</span></div>
        <div class="label green">原生js</div>
      </div>
      <div class="snippetItem">
        <div class="title"><span class="info">唤起微信</span><span class="avatar"></span></div>
        <div class="cont"><span class="info">唤起微信，ios已测试，安卓待测试</span><span class="date">4/20</span></div>
        <div class="label green">原生js</div>
      </div>
      <div class="snippetItem">
        <div class="title"><span class="info">唤起微信</span><span class="avatar"></span></div>
        <div class="cont"><span class="info">唤起微信，ios已测试，安卓待测试</span><span class="date">4/20</span></div>
        <div class="label green">原生js</div>
      </div>
      <div class="snippetItem">
        <div class="title"><span class="info">唤起微信</span><span class="avatar"></span></div>
        <div class="cont"><span class="info">唤起微信，ios已测试，安卓待测试</span><span class="date">4/20</span></div>
        <div class="label green">原生js</div>
      </div>
      <div class="snippetItem">
        <div class="title"><span class="info">唤起微信</span><span class="avatar"></span></div>
        <div class="cont"><span class="info">唤起微信，ios已测试，安卓待测试</span><span class="date">4/20</span></div>
        <div class="label green">原生js</div>
      </div>
      <div class="snippetItem">
        <div class="title"><span class="info">唤起微信</span><span class="avatar"></span></div>
        <div class="cont"><span class="info">唤起微信，ios已测试，安卓待测试</span><span class="date">4/20</span></div>
        <div class="label green">原生js</div>
      </div>
      <div class="snippetItem">
        <div class="title"><span class="info">唤起微信</span><span class="avatar"></span></div>
        <div class="cont"><span class="info">唤起微信，ios已测试，安卓待测试</span><span class="date">4/20</span></div>
        <div class="label green">原生js</div>
      </div>
      <div class="snippetItem">
        <div class="title"><span class="info">唤起微信</span><span class="avatar"></span></div>
        <div class="cont"><span class="info">唤起微信，ios已测试，安卓待测试</span><span class="date">4/20</span></div>
        <div class="label green">原生js</div>
      </div>
      <div class="snippetItem">
        <div class="title"><span class="info">唤起微信</span><span class="avatar"></span></div>
        <div class="cont"><span class="info">唤起微信，ios已测试，安卓待测试</span><span class="date">4/20</span></div>
        <div class="label green">原生js</div>
      </div>
    </div>
    <div class="content">
      <div class="title">
        <span>我是标题名称1</span>
        <span class="label green">原生js</span>
        <span>删除</span>
      </div>
      <div class="url">
        <span>访问地址：</span>
        <span>https://www.baidu.com</span>
      </div>
      <div class="editWrap">
        <div class="fileNum">File (2)</div>
        <div class="codemirrorWrap">
          <v-codemirror></v-codemirror>
        </div>
        <div class="codemirrorWrap lastChild">        
          <v-codemirror></v-codemirror>
        </div>          
        <div class="fileNum addFile">Add File</div>
      </div>
    </div>
      <!-- <button @click="newSnippet">新建</button>
      <div class="CmWrapper" v-for="(item, index) in snippetNum" :key="item">
        
      </div>    -->
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

<style scoped lang="less">
@import "../../../assets/style/common.less";
.codeContainer{
  position: absolute;
  top: 50px;
  bottom: 0;
  left: 0;
  right: 0;
  padding-top: 50px;
}
.lebels{
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
  .newSnippet{
    width: 80%;
    height: 34px;
    background: #26a69a;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    &:hover{
      background: #26968a;
    }
    &:active{
      background: #1d8b80;
    }
  }
  .all{
    margin-top: 30px;
    line-height: 36px;
    padding:0 10px 0 20px;
    text-align: left;
    font-size: 13px;
    border-left: 4px solid transparent;
    &.active{
      background: #f2f6f6;
      border-left: 4px solid #26a69a;
    }
    div{
      float: left;
    }
    span{
      float: right;
    }
    .clearfixMixin();  
  }
  .title{
    margin-top: 40px;
    padding:0 10px;
    text-align: left;
    font-size: 13px;
    color: #999;
    height: 26px;
    span{
      float: right;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 1px solid #999;
      text-align: center;
      cursor: pointer;
      &:hover{
        border: 1px solid #26a69a;
        color: #26a69a;
      }
    }
  }
  ul{
    li{
      line-height: 36px;
      padding:0 10px 0 15px;
      text-align: left;
      font-size: 13px;
      transition: all 0.5s linear;
      &.active, &:hover{
        background: #f2f6f6;        
        border-left: 4px solid #26a69a;
      }
      .info{
        width: 110px;
        overflow: hidden;
        float: left;
        position: relative;
        padding-left: 20px;        
        &::before{
          content: "";
          position: absolute;
          top: 13px;
          left: 0;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
      }
      .info.green{
        &::before{
          background: #62B14C;
        }
      }
      .info.blue{
        &::before{
          background: #8AB0FF;
        }
      }
      .info.fepawn{
        &::before{
          background: #3D9888;
        }
      }
      .info.purple{
        &::before{
          background: #910EB1;
        }
      }
      .info.yellow{
        &::before{
          background: #F8CF00;
        }
      }
      .info.gray{
        &::before{
          background: #745448;
        }
      }

      .number{
        float: right;
      }
      .clearfixMixin();        
    }
  }
  .languagesWrap{
    .info{
      &::before{
        content: "#";
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
}
.column{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 200px;
  width: 280px;
  box-sizing: border-box;  
  overflow-y: scroll;
  float: left;
  border-right: 1px solid #eee;
  .snippetItem{
    border-bottom: 1px solid #eee;
    padding: 12px 15px 16px 34px;
    &:hover, &.active{
      background: #f2f6f6;
    }
    .title{
      margin-bottom: 2px;
      line-height: 24px;
      font-size: 14px;
      .clearfixMixin();        
      .info{
        float: left;
        width: 190px;
        height: 24px;        
        overflow: hidden;        
      }
      .avatar{
        float: right;
        width: 24px;
        height: 24px;
        border: 1px solid #eee;
        border-radius: 50%;
      }
    }
    .cont{
      margin-bottom: 6px;
      line-height: 24px;
      font-size: 12px;
      color: #999;
      .clearfixMixin();        
      .info{
        float: left;
        width: 190px;
        overflow: hidden;
        height: 24px;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
      .date{
        float: right;
      }
    }
    .label{
      display: inline-block;
      line-height: 22px;
      font-size: 12px;
      padding: 0 6px;
      border: 1px solid #eee;
      border-left: 0;
      &.green{
        border-left: 2px solid #62B14C;
      }
      &.blue{
        border-left: 2px solid #8AB0FF;
      }
      &.fepawn{
        border-left: 2px solid #3D9888;
      }
      &.purple{
        border-left: 2px solid #910EB1;
      }
      &.yellow{
        border-left: 2px solid #F8CF00;
      }
      &.gray{
        border-left: 2px solid #745448;
      }
    }
  }
}
.content{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 480px;
  right: 0;
  box-sizing: border-box;
  .title{
    height: 64px;
    border-bottom: 1px solid #eee;
    padding-left: 24px;
    padding-top: 20px;
    box-sizing: border-box;
    overflow: hidden;
    // .clearfixMixin();      
    span{
      float: left;
      margin-right: 20px;
      line-height: 24px;
      &:first-child{
        max-width: 200px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        height: 24px;
      }
      &:last-child{
        font-size: 14px;
        color: #999;
        float: right;
        cursor: default;
        &:hover{
          color: #666;
        }
      }
    }
    .label{
      display: inline-block;
      line-height: 22px;
      font-size: 12px;
      padding: 0 6px;
      border: 1px solid #eee;
      border-left: 0;
      &.green{
        border-left: 2px solid #62B14C;
      }
    }
  }
  .url{
    display: flex;
    line-height: 20px;
    padding: 5px 0;
    border-bottom: 1px solid #eee;
    font-size: 12px;
    color: #999;
    span{
      flex: 1;
      padding: 0 15px; 
      &:first-child{
        text-align: center;     
        flex: 0 1 80px;
        border-right: 1px solid #eee;
      }
    }
  }
  .editWrap{
    background: #F7F7F7;
    position: absolute;
    top: 95px;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 20px;
    overflow: scroll;
    .fileNum{
      line-height: 50px;
      color: #999;
      font-size: 13px;
    }
    .codemirrorWrap{
      margin-bottom: 30px;
      &.lastChild{
        margin-bottom: 0;
      }
    }
  }
}
</style>