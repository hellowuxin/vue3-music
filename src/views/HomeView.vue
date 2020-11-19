<template>
  <div :class="style['container']">
    <carousel v-if="carouselValue">
      <carousel-item
        v-for="(item, index) in carouselValue"
        :key="index"
        :src="item.imageUrl"
      ></carousel-item>
    </carousel>
    <div :class="style['recommended-playlists']">
      <a :class="style['title']" href="#">
        <span>推荐歌单</span>
        <icon iconId="iconright"/>
      </a>
      <div :class="style['content']" v-if="recommendedPlaylists">
        <card
          v-for="play in recommendedPlaylists"
          :key="play.id"
          :imgSrc="play.picUrl"
          :title="play.name"
          :playCount="play.playCount"
          @click="clickCard(play)"
        ></card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, ref, Ref, useCssModule } from 'vue'
import Carousel from '../components/Carousel.vue'
import CarouselItem from '../components/CarouselItem.vue'
import Card from '../components/Card.vue'
import Icon from '../components/Icon.vue'
import { useRouter } from 'vue-router'

interface Banner {
  imageUrl: string;
}
interface Play {
  id: string;
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
    const recommendedPlaylists: Ref<Play[] | undefined> = ref()
    const router = useRouter()
    const style = useCssModule()

    axios.get('/banner').then(({ data }) => {
      carouselValue.value = data.banners
    })
    axios.get('/personalized?limit=10').then(({ data }) => {
      recommendedPlaylists.value = data.result
    })

    const clickCard = (play: Play) => {
      router.push({ name: 'playlist-view', query: { id: play.id } })
    }

    return {
      style,
      carouselValue,
      recommendedPlaylists,
      clickCard
    }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flow-root;
}

.recommended-playlists {

  .title {
    display: block;
    margin: 10px 0;
    font-size: larger;

    :global(.icon) {
      padding-left: 5px;
    }
  }

  .content {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 30px 20px;
  }
}
</style>
