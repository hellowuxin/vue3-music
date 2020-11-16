<template>
  <global-header></global-header>
  <div class="global-container">
    <home-view></home-view>
  </div>
  <music-bar></music-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GlobalHeader from './components/GlobalHeader.vue'
import HomeView from './views/HomeView.vue'
import MusicBar from './components/MusicBar.vue'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    HomeView,
    MusicBar
  }
})
</script>

<style type="text/css">
.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

a {
  text-decoration: none;
  color: black;
}

.global-container {
  margin-top: 54px;
  margin-bottom: 73px;
}
</style>
