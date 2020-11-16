import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import PlaylistView from './views/PlaylistView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home-view', component: HomeView },
    { path: '/playlist', name: 'playlist-view', component: PlaylistView }
  ]
})
