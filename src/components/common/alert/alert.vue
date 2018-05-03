<template>
  <div class="alert">
    <div class="alertWrapper">
      <div class="alertInfo">{{info}}</div>
      <div class="btnWrap">
        <span @click="confirm">确定</span>
        <span @click="cancel">取消</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: String,
      default: '确定删除此文章吗？'
    },
    alertInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    confirm () {
      this.$emit('confirm', this.alertInfo)
    },
    cancel() {
      this.$emit('cancel')      
    }
  }
}
</script>

<style scoped lang="less">
.alert {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  .alertWrapper {
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    width: 300px;
    border-radius: 3px;
    background: #fff;
    overflow: hidden;
    .alertInfo {
      padding: 34px;
      text-align: center;
      border-bottom: 1px solid #f1f1f1;
    }
    .btnWrap {
      line-height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        flex: 1;
        text-align: center;
        border-left: 1px solid #f1f1f1;
        &:hover {
          background: rgba(0, 0, 0, 0.03);
        }
        &:active {
          background: rgba(0, 0, 0, 0.06);
        }
      }
    }
  }
}
</style>
