import Vue from 'vue'
import Router from 'vue-router'
import Blog from '@/components/A_blog/blog.vue'
import Time from '@/components/A_time/time.vue'
import Tags from '@/components/A_tags/tags.vue'
import BAM from '@/components/A_BAM/BAM.vue'
import Login from '@/components/A_login/login.vue'
import Barticle from '@/components/C_Barticle/Barticle.vue'
import Btags from '@/components/C_Btags/Btags.vue'
import Bself from '@/components/C_Bself/Bself.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '', redirect: '/blog' },
    { path: '/blog', component: Blog},
    { path: '/time', component: Time },
    { path: '/tags', component: Tags },
    { path: '/BAM', component: BAM,
      meta: {requireAuth : true},
  		children: [
  			{path: 'Barticle', component: Barticle, meta: {requireAuth : true}},
  			{path: 'Btags', component: Btags, meta: {requireAuth : true}},
  			{path: 'Bself', component: Bself, meta: {requireAuth : true}},
  		]
     },
    { path: '/login', component: Login },
  ]
})
