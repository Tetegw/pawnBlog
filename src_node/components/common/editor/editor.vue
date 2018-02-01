<template>
    <div id="editor">
        <mavon-editor style="height: 100%" @save="save" :toolbars="toolbars" :placeholder="placeholder"></mavon-editor>
    </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

export default {
    data() {
        return {
            placeholder: '请使用Markdown语法编辑...',
            toolbars: {
                bold: true, // 粗体
                italic: true, // 斜体
                underline: true, // 下划线
                strikethrough: true, // 中划线
                mark: true, // 标记
                quote: true, // 引用
                ol: true, // 有序列表
                ul: true, // 无序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                code: true, // code
                table: true, // 表格
                fullscreen: true, // 全屏编辑
                help: true, // 帮助
                /* 1.3.5 */
                undo: true, // 上一步
                redo: true, // 下一步
                trash: true, // 清空
                save: true, // 保存（触发events中的save事件）
                /* 1.4.2 */
                navigation: true, // 导航目录
                /* 2.1.8 */
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                /* 2.2.1 */
                subfield: true, // 单双栏模式
                preview: true, // 预览
            }
        }
    },
    methods: {
        save(value, render) {
            this.$http.post('/api/saveArticle', { content: render }).then(function(res) {
                console.log(res.body);
            }, function(res) {

            })
        }
    },
    components: {
        'mavon-editor': mavonEditor
    }
}
</script>

<style scoped>
#editor {
    margin: auto;
    width: 100%;
    height: 580px;
}
</style>