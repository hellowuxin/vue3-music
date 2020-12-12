<template>
  <div id="overlay"></div>
  <global-header></global-header>
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

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    MusicBar,
    MusicAudio,
    PlayView
  }
})
</script>

<style lang="scss">
@import '~@/scss';
</style>
