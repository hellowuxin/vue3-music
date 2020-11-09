<template>
  <global-header></global-header>
  <carousel></carousel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GlobalHeader from './components/GlobalHeader.vue'
// import HomeView from './views/HomeView.vue'
import Carousel from './components/Carousel.vue'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader, Carousel
  }
})
</script>

<style>

</style>
