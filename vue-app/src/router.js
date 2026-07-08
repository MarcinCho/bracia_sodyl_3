import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import RealizacjeOverview from './views/RealizacjeOverview.vue'
import RealizacjeCategoryView from './views/RealizacjeCategoryView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/realizacje', name: 'realizacje', component: RealizacjeOverview },
    { path: '/realizacje/:kategoria', name: 'realizacje-kategoria', component: RealizacjeCategoryView, props: true },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  }
})

export default router
