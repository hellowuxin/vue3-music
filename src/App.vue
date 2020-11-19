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

<style>
body {
  margin: 0;
}

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
  margin: 54px 20px 73px 20px;
  padding: 10px 0;
}

.grey {
  color: #797979
}

.small-font {
  font-size: small;
}
</style>
