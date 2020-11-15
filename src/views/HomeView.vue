<template>
  <div class="home-view">
    <carousel>
      <carousel-item
        v-for="(item, index) in carouselValue"
        :key="index"
        :src="item.imgSrc"
      ></carousel-item>
    </carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Carousel from '../components/Carousel.vue'
import CarouselItem from '../components/CarouselItem.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    Carousel,
    CarouselItem
  },
  setup () {
    const carouselValue = [
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

<style>
.home-view {
  display: flow-root;
}
</style>
