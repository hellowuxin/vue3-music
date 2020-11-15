<template>
  <global-header></global-header>
  <home-view></home-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GlobalHeader from './components/GlobalHeader.vue'
import HomeView from './views/HomeView.vue'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    HomeView
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
</style>
