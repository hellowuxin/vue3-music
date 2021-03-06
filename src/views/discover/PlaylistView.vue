<template>
  <div :class="style['container']">
    <div v-if="playlistArr" :class="style['content']">
      <card
        play
        v-for="playlist in playlistArr"
        :key="playlist.id"
        :title="playlist.name"
        :playCount="playlist.playCount"
        :imgSrc="playlist.coverImgUrl"
      ></card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, useCssModule } from 'vue'
import axios from 'axios'
import Card from '@/components/Card.vue'
import { Playlist } from '@/interface'

export default defineComponent({
  name: 'DiscoverPlaylistView',
  components: {
    Card
  },
  setup () {
    const style = useCssModule()
    const playlistArr: Ref<Playlist[] | undefined> = ref()

    axios.get('/playlist/catlist').then(({ data }) => {
      console.log(data)
    })
    axios.get('/playlist/hot').then(({ data }) => {
      console.log(data)
    })
    axios.get('/top/playlist').then(({ data }) => {
      playlistArr.value = data.playlists
    })

    return {
      style,
      playlistArr
    }
  }
})
</script>

<style lang="scss" module>
.content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px 20px;
}
</style>
