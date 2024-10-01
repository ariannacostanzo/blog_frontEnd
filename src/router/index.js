import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import PostShow from '@/views/PostShow.vue'
import CreatePost from '@/views/CreatePost.vue'
import PostUpdate from '@/views/PostUpdate.vue'
import CategoriesPost from '@/views/CategoriesPost.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/posts/:slug',
      name: 'detailPost',
      component: PostShow
    },
    {
      path: '/posts/create',
      name: 'createPost',
      component: CreatePost
    },
    {
      path: '/posts/:slug/update',
      name: 'updatePost',
      component: PostUpdate,
    },
    {
      path: '/posts/category/:categoryId',
      name: 'categoriesPost',
      component: CategoriesPost,
    },

  ]
})

export default router
