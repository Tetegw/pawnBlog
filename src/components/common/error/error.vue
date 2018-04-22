<template>
  <div class="errorWrap">
    <div class="iconfont icon-wushuju icon">
      <span>暂无数据</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import '../../../assets/style/common.less';
.errorWrap{
  .icon{
    color: #ddd;
    text-align: center;
    padding: 80px;
    &::before{
      font-size: 50px;
       vertical-align: middle;
    }
    span{
      font-family: 'Microsoft YaHei', Tahoma, Arial, sans-serif;
      font-size: 24px;
      padding-left: 20px;
    }
  }
}
@media (max-width: 1000px) {
  .errorWrap{
    .icon{
      padding:60px 20px;
      &::before{
        font-size: 50px;
      }
      span{
        font-size: 20px;
      }
    }
  }
}
</style>
