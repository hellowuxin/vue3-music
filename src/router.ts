import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import DisHomeView from './views/discover/HomeView.vue'
import PlaylistView from './views/PlaylistView.vue'
import DisPlaylistView from './views/discover/PlaylistView.vue'
import DisArtistView from './views/discover/ArtistView.vue'
import DisDjradioView from './views/discover/DjradioView.vue'
import DisToplistView from './views/discover/ToplistView.vue'
import DisAlbumView from './views/discover/AlbumView.vue'

function prefixRoutes (prefix: string, routes: RouteRecordRaw[]) {
  return routes.map((route) => {
    route.path = prefix + '/' + route.path
    return route
  })
}

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/discover' },
    ...prefixRoutes('/discover', [
      { path: '', component: DisHomeView },
      { path: 'djradio', component: DisDjradioView },
      { path: 'toplist', component: DisToplistView },
      { path: 'album', component: DisAlbumView },
      { path: 'artist', component: DisArtistView },
      { path: 'playlist', component: DisPlaylistView }
    ]),
    { path: '/playlist', name: 'playlist-view', component: PlaylistView }
  ]
})
