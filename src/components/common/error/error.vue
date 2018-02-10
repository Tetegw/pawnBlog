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
</style>
