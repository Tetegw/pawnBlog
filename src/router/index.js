import Vue from 'vue'
import Router from 'vue-router'
import Blog from '@/components/blog/layout/layout'
import Time from '@/components/time/layout/layout'
import Code from '@/components/code/layout/layout'
import BAM from '@/components/BAM/layout/layout'
import Login from '@/components/login/layout/layout'
import Article from '@/components/article/layout/layout'

import BAllBlog from '@/components/BAM/allBlog/allBlog'
import BWriteBlog from '@/components/BAM/writeBlog/writeBlog'
import BDraft from '@/components/BAM/draft/draft'
import BSelf from '@/components/BAM/self/self'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/blog' },
    { path: '/blog', component: Blog, },
    { path: '/time', component: Time },
    { path: '/code', component: Code },
    { path: '/article', component: Article },
    {
      path: '/BAM',
      component: BAM,
      redirect: '/BAM/BAllBlog',
      meta: { requireAuth: true },
      children: [
        { path: 'BAllBlog', name: 'BAllBlog', component: BAllBlog, meta: { requireAuth: true } },
        { path: 'BWriteBlog', name: 'BWriteBlog', component: BWriteBlog, meta: { requireAuth: true } },
        { path: 'BDraft', name: 'BDraft', component: BDraft, meta: { requireAuth: true } },
        { path: 'BSelf', component: BSelf, meta: { requireAuth: true } },
      ]
    },
    { path: '/login', name: 'login', component: Login }
  ]
})
