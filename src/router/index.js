import Vue from 'vue'
import Router from 'vue-router'
import Blog from '@/components/blog/layout/index'
import Time from '@/components/time/layout/index'
import Tags from '@/components/tags/layout/index'
import BAM from '@/components/BAM/layout/index'
import Login from '@/components/login/layout/index'
import Article from '@/components/article/layout/index'

import Barticle from '@/components/BAM/article/index'
import Btags from '@/components/BAM/tags/index'
import Bself from '@/components/BAM/self/index'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/blog' },
    { path: '/blog', component: Blog, },
    { path: '/time', component: Time },
    { path: '/article', component: Article },
    {
      path: '/BAM', component: BAM,
      meta: { requireAuth: true },
      children: [
        { path: 'Barticle', component: Barticle, meta: { requireAuth: true } },
        { path: 'Btags', component: Btags, meta: { requireAuth: true } },
        { path: 'Bself', component: Bself, meta: { requireAuth: true } },
      ]
    },
    { path: '/login', component: Login },
    { path: '/sun', component: Tags },
  ]
})
