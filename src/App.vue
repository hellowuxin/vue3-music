<template>
  <global-header></global-header>
  <carousel :value="carouselValue"></carousel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GlobalHeader from './components/GlobalHeader.vue'
// import HomeView from './views/HomeView.vue'
import Carousel, { CarouselItemProp } from './components/Carousel.vue'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Carousel
  },
  setup () {
    const carouselValue: CarouselItemProp[] = [
      { imgSrc: 'http://p1.music.126.net/sooZQ6BuDAtztTfS02e_hQ==/109951165457314199.jpg?imageView&quality=89' },
      { imgSrc: 'http://p1.music.126.net/S9QTJL6cat-6QcAC6vdnvw==/109951165455921169.jpg?imageView&quality=89' },
      { imgSrc: 'http://p1.music.126.net/r1cw5HphZq229CP7tSLcdg==/109951165456274376.jpg?imageView&quality=89' },
      { imgSrc: 'http://p1.music.126.net/zHQmXbzNUr2pL-SAEYzTGA==/109951165457596486.jpg?imageView&quality=89' },
      { imgSrc: 'http://p1.music.126.net/1NKaKu68GqVhlZcM0SSTVw==/109951165459748413.jpg?imageView&quality=89' },
      { imgSrc: 'http://p1.music.126.net/6POib23jmxKhrmSYMKKGQg==/109951165460848373.jpg?imageView&quality=89' }
    ]

    return {
      carouselValue
    }
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
