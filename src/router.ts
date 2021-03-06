import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import PlaylistView from './views/PlaylistView.vue'
import ArtistView from './views/ArtistView.vue'
import DjradioView from './views/DjradioView.vue'
import ToplistView from './views/ToplistView.vue'
import AlbumView from './views/AlbumView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home-view', component: HomeView },
    { path: '/playlist', name: 'playlist-view', component: PlaylistView },
    { path: '/artist', name: 'artist-view', component: ArtistView },
    { path: '/djradio', name: 'diradio-view', component: DjradioView },
    { path: '/toplist', name: 'toplist-view', component: ToplistView },
    { path: '/album', name: 'album-view', component: AlbumView }
  ]
})
