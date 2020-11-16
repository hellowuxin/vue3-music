<template>
  <global-header></global-header>
  <div class="global-container">
    <router-view></router-view>
  </div>
  <music-bar></music-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GlobalHeader from './components/GlobalHeader.vue'
import MusicBar from './components/MusicBar.vue'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
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
