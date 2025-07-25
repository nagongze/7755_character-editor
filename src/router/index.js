import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CharacterEditor from '../views/CharacterEditor.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/editor',
    name: 'CharacterEditor',
    component: CharacterEditor
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router