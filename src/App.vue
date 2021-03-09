<template>
  <div id="overlay"></div>
  <global-header></global-header>
  <user-sidebar></user-sidebar>
  <div class="global-container">
    <router-view></router-view>
  </div>
  <play-view></play-view>
  <music-bar></music-bar>
  <music-audio></music-audio>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GlobalHeader from './components/GlobalHeader.vue'
import MusicBar from './components/MusicBar.vue'
import MusicAudio from './components/MusicAudio.vue'
import PlayView from './views/PlayView.vue'
import UserSidebar from './components/UserSidebar.vue'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    MusicBar,
    MusicAudio,
    PlayView,
    UserSidebar
  }
})
</script>

<style lang="scss">
@import '~@/scss';

.global-container {
  margin: var(--topspace) 0 var(--bottomspace) var(--leftspace);
  padding: 20px 20px;
}
</style>
