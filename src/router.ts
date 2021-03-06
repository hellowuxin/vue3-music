import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { HighPlaylistView, DiscoverHomeView, DiscoverToplistView, DiscoverAlbumView, DiscoverArtistView, DiscoverPlaylistView } from './views/discover'
import PlaylistView from './views/PlaylistView.vue'

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
      { path: '', component: DiscoverHomeView },
      { path: 'toplist', component: DiscoverToplistView },
      { path: 'album', component: DiscoverAlbumView },
      { path: 'artist', component: DiscoverArtistView },
      { path: 'playlist', component: DiscoverPlaylistView },
      { path: 'playlist/highquality', component: HighPlaylistView }
    ]),
    { path: '/playlist', name: 'playlist-view', component: PlaylistView }
  ]
})
