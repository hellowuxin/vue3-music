<template>
  <div class="home-view">
    <carousel v-if="carouselValue && carouselValue.length > 3">
      <carousel-item
        v-for="(item, index) in carouselValue"
        :key="index"
        :src="item.imageUrl"
      ></carousel-item>
    </carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import Carousel from '../components/Carousel.vue'
import CarouselItem from '../components/CarouselItem.vue'
import axios from 'axios'
interface Banner {
  imageUrl: string;
}

export default defineComponent({
  name: 'HomeView',
  components: {
    Carousel,
    CarouselItem
  },
  setup () {
    const carouselValue: Ref<Banner[] | undefined> = ref()
    axios.get('/banner').then(({ data }) => {
      carouselValue.value = data.banners
    })

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
