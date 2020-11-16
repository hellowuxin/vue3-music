<template>
  <div class="home-view">
    <carousel v-if="carouselValue && carouselValue.length > 3">
      <carousel-item
        v-for="(item, index) in carouselValue"
        :key="index"
        :src="item.imageUrl"
      ></carousel-item>
    </carousel>
    <div class="recommended-playlist">
      <a class="title" href="#">
        <span>推荐歌单</span>
        <icon iconId="iconright"/>
      </a>
      <div class="recommended-playlist-content">
        <card
          v-for="(play, index) in recommendedPlaylist"
          :key="index"
          :imgSrc="play.picUrl"
          :title="play.name"
          :playCount="play.playCount"
        ></card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, ref, Ref } from 'vue'
import Carousel from '../components/Carousel.vue'
import CarouselItem from '../components/CarouselItem.vue'
import Card from '../components/Card.vue'
import Icon from '../components/Icon.vue'

interface Banner {
  imageUrl: string;
}
interface Play {
  name: string;
  picUrl: string;
  playCount: number;
}

export default defineComponent({
  name: 'HomeView',
  components: {
    Carousel,
    CarouselItem,
    Card,
    Icon
  },
  setup () {
    const carouselValue: Ref<Banner[] | undefined> = ref()
    const recommendedPlaylist: Ref<Play[] | undefined> = ref()
    axios.get('/banner').then(({ data }) => {
      carouselValue.value = data.banners
    })
    axios.get('/personalized?limit=10').then(({ data }) => {
      console.log(data.result)
      recommendedPlaylist.value = data.result
    })

    return {
      carouselValue,
      recommendedPlaylist
    }
  }
})
</script>

<style lang="scss">
.home-view {
  display: flow-root;
}

.title {
  display: block;
  margin: 10px 0;
  font-size: larger;
  .icon {
    padding-left: 5px;
  }
}

.recommended-playlist-content {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 30px 20px;
}
</style>
