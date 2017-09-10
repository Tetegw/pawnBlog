import Vue from 'vue'
import Router from 'vue-router'
import Blog from '@/components/blog/layout/layout'
import Time from '@/components/time/layout/layout'
import Tags from '@/components/tags/layout/layout'
import BAM from '@/components/BAM/layout/layout'
import Login from '@/components/login/layout/layout'
import Article from '@/components/article/layout/layout'

import Barticle from '@/components/BAM/article/article'
import Btags from '@/components/BAM/tags/tags'
import Bself from '@/components/BAM/self/self'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/blog' },
    { path: '/blog', component: Blog, },
    { path: '/time', component: Time },
    { path: '/article', component: Article },
    {
      path: '/BAM',
      component: BAM,
      redirect: '/BAM/Barticle',
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
