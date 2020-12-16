<template>
  <div :class="style['container']">
    <carousel v-if="carouselValue">
      <carousel-item
        v-for="(item, index) in carouselValue"
        :key="index"
        :src="item.imageUrl"
        @click="clickCarousel(item)"
        :label="{ title: item.typeTitle, color: item.titleColor }"
      ></carousel-item>
    </carousel>
    <div :class="style['recommended-playlists']">
      <a :class="style['title']" href="#">
        <span>推荐歌单</span>
        <icon icon-id="iconright"/>
      </a>
      <div :class="style['content']" v-if="recommendedPlaylists">
        <playlist-card
          v-for="play in recommendedPlaylists"
          :key="play.id"
          :imgSrc="`${play.picUrl}?param=400y400`"
          :title="play.name"
          :playCount="play.playCount"
          @click="clickCard(play)"
          @click-play="clickPlay(play)"
        ></playlist-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, ref, Ref, useCssModule } from 'vue'
import { Carousel, CarouselItem } from '@/components/Carousel'
import PlaylistCard from '../components/PlaylistCard.vue'
import Icon from '../components/Icon.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalStore } from '@/store'
import { Track } from '@/interface'
import createMessage from '@/components/Message'

interface Banner {
  imageUrl: string
  targetId: number
  url: string | null
  titleColor: string
  typeTitle: string
  targetType: number
}
interface Play {
  id: string
  name: string
  picUrl: string
  playCount: number
}

export default defineComponent({
  name: 'HomeView',
  components: {
    Carousel,
    CarouselItem,
    PlaylistCard,
    Icon
  },
  setup () {
    const carouselValue: Ref<Banner[] | undefined> = ref()
    const recommendedPlaylists: Ref<Play[] | undefined> = ref()
    const router = useRouter()
    const style = useCssModule()
    const store = useStore<GlobalStore>()

    axios.get('/banner').then(({ data }) => {
      carouselValue.value = data.banners
    })
    axios.get('/personalized?limit=10').then(({ data }) => {
      recommendedPlaylists.value = data.result
    })

    const clickCarousel = (item: Banner) => {
      if (item.targetId) {
        if (item.targetType === 1) {
          axios.get(`/song/detail?ids=${item.targetId}`).then(({ data }) => {
            store.dispatch({
              type: 'playSong',
              track: data.songs[0]
            })
          })
        } else if (item.targetType === 1004) {
          createMessage('MV暂不可播放', 'error')
        }
      } else if (item.url) {
        window.open(item.url)
      }
    }
    const clickCard = (play: Play) => {
      router.push({ name: 'playlist-view', query: { id: play.id } })
    }
    const clickPlay = (play: Play) => {
      axios.get(`/playlist/detail?id=${play.id}`).then(({ data }) => {
        const tracks: Track[] = data.playlist.tracks
        store.dispatch({
          type: 'playSong',
          track: tracks[0],
          tracklist: tracks
        })
      })
    }

    return {
      style,
      carouselValue,
      recommendedPlaylists,
      clickCard,
      clickCarousel,
      clickPlay
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
    color: black;

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
