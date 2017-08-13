<template>
	<div class="timeList">
		<h2>2017</h2>
		<ul>
			<li>
				<div class="date">05-04</div>
				<div class="title">读《高性能网站建设指南》</div>
				<div class="tags">
					<span class="item">javascript</span>
					<span class="item">进阶</span>
					<span class="item">面向对象</span>
				</div>
			</li>
			<li>
				<div class="date">05-04</div>
				<div class="title">读《图解 TCP/IP》（未完成）</div>
				<div class="tags">
					<span class="item">进阶</span>
					<span class="item">面向对象</span>
				</div>
			</li>
			<li>
				<div class="date">05-04</div>
				<div class="title">2016 JavaScript 技术栈展望</div>
				<div class="tags">
					<span class="item">javascript</span>
					<span class="item">面向对象</span>
				</div>
			</li>
			<li>
				<div class="date">05-04</div>
				<div class="title">Lazy Loading Images on the Web</div>
				<div class="tags">
					<span class="item">javascript</span>
				</div>
			</li>
			<li>
				<div class="date">05-04</div>
				<div class="title">面向对象面向向对象面向对象</div>
				<div class="tags">
					<span class="item">javascript</span>
					<span class="item">进阶</span>
					<span class="item">面向对象</span>
				</div>
			</li>
			<li>
				<div class="date">05-04</div>
				<div class="title">面向象面向对象面向对象面向对象</div>
				<div class="tags">
					<span class="item">javascript</span>
					<span class="item">进阶</span>

				</div>
			</li>
		</ul>
		<h2>2016</h2>
		<ul>
			<li>
				<div class="date">05-04</div>
				<div class="title">面向对象面向对象面向对象面向对象面向对象面向对象面向对象</div>
				<div class="tags">
					<span class="item">javascript</span>
				</div>
			</li>
			<li>
				<div class="date">05-04</div>
				<div class="title">面向对象面向向对象面向对象</div>
				<div class="tags">
					<span class="item">javascript</span>
					<span class="item">进阶</span>
					<span class="item">面向对象</span>
				</div>
			</li>
			<li>
				<div class="date">05-04</div>
				<div class="title">面向象面向对象面向对象面向对象</div>
				<div class="tags">
					<span class="item">javascript</span>
					<span class="item">进阶</span>

				</div>
			</li>
		</ul>
	</div>
</template>

<script>


</script>

<style lang="less">
@import '../../assets/style/common.less';
@m26a69a : #26a69a;
.timeList{
	width: 75%;
	padding: 34px 0;
	h2{
		font-size: 22px;
	}
	ul{
		margin: 30px 0 60px 30px;
		li{
			line-height: 30px;
			padding-bottom: 10px;
			font-family: 'sourcesanspro', 'Helvetica Neue', Arial, sans-serif;
			.clearfixMixin();
			.date{
				float: left;
				margin-right: 30px;
				color:#919d9e;
			}
			.title{
				float: left;
				width: 400px;
				height: 30px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				color: #616969;
				cursor: pointer;
				transition: all .3s;
				&:hover{
					color: @m26a69a;
					transform:translateX(8px);
				}
			}
			.tags {
				float: right;
				.item{
					display: inline-block;
					padding: 0 8px;
					font-size: 12px;
					line-height: 18px;
					border: 1px solid #5bc2b8;
					color: #5bc2b8;
					border-radius: 10px;
					transition: all .2s;
					cursor:pointer;
					&:hover{
						background-color: #5bc2b8;
						color: #fff;
					}
				}
			}
		}
	}
}

</style>