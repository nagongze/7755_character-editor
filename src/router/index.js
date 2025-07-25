import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/editor',
    name: 'CharacterEditor',
    component: () => import('../views/CharacterEditor.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router