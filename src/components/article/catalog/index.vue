<template>
    <div class="catalogComponent">
        <div class="column">
            <div class="title">目录</div>
            <ul>
                <li>检测浏览器支持</li>
                <li>图片获取</li>
                <li>预览图片</li>
                <li>剪裁图片</li>
                <li>图片上传</li>
                <li>PS：上传框修改</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    created() {

    },
    methods: {

    }
}
</script>

<style lang="less" scoped>
.catalogComponent {
    float: left;
    margin-left: 12px;
    margin-top: 66px;
    border-left: 2px solid #e0e0e0;
    padding: 0 0 14px 0;
    .column {
        width: 200px;
        .title {
            font-size: 16px;
            line-height: 36px;
            padding-left: 14px;
            font-weight: bold;
        }
        li {
            padding-left: 30px;
            line-height: 30px;
            border-left: 2px solid transparent;
            margin-left: -2px;
            font-size: 15px;
            cursor: pointer;
            &.active,
            &:hover {
                border-left: 2px solid #26a69a;
                background-color: #ebf5f3;
            }
        }
    }
}
</style>
