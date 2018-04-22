<template>
  <div class="loadingWrap">
    <div class="icon iconfont icon-loading">
      <span>Loading...</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import '../../../assets/style/common.less';
.loadingWrap{
  .icon{
    color: #ddd;
    text-align: center;
    padding: 80px 80px 0;
    line-height: 40px;
    &::before{
      font-size: 32px;
      vertical-align: middle;
      position: absolute;
      animation: rotate 1s steps(9)  0s infinite;
    }
    @keyframes rotate {
      from {
        transform: rotate(0deg)
      }
      to {
        transform: rotate(360deg)
      }
    }
    span{
      font-family: 'Microsoft YaHei', Tahoma, Arial, sans-serif;
      font-size: 22px;
      padding-left: 46px;
    }
  }
}
@media (max-width: 1000px) {
  .errorWrap{
    .icon{
      padding:40px 20px;
      &::before{
        font-size: 60px;
      }
      span{
        font-size: 22px;
      }
    }
  }
}
</style>
