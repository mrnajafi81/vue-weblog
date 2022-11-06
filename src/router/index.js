import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'

import PostTemplate from '../views/post/Template.vue'
import PostIndex from '../views/post/Index.vue'
import PostShow from '../views/post/Show.vue'
import PostCreate from '../views/post/Create.vue'
import PostEdit from '../views/post/Edit.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/about', name: 'about', component: About },
  {
    path: '/posts', component: PostTemplate, children: [
      { path: '', name: 'postIndex', component: PostIndex },
      { path: ':id', name: 'postShow', component: PostShow },
      { path: 'create', name: 'postCreate', component: PostCreate },
      { path: ':id/edit', name: 'postEdit', component: PostEdit },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;
