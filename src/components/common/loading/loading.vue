<template>
  <div class="loadingWrap">
    <div class="icon">
      <span>loading...</span>
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
    padding: 80px;
    &::before{
      font-size: 80px;
       vertical-align: middle;
    }
    span{
      font-family: 'Microsoft YaHei', Tahoma, Arial, sans-serif;
      font-size: 26px;
      padding-left: 20px;
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
