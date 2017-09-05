<template>
    <div class="articleComponent">
        <v-content></v-content>
        <v-catalog></v-catalog>
    </div>
</template>

<script>
import Content from '@/components/article/content/index'
import Catalog from '@/components/article/catalog/index'
export default {
    components: {
        'v-catalog': Catalog,
        'v-content': Content,
    }
}
</script>

<style lang="less" scoped>
@import url('../../../assets/style/common.less');
.articleComponent {
    width: 1000px;
    margin: 90px auto;
    .clearfixMixin();
}
</style>
	


