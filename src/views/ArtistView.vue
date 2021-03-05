<template>
  <div :class="style['container']">
    <div :class="style['content']" v-if="artistList">
      <card
        v-for="artist in artistList"
        :key="artist.id"
        :imgSrc="`${artist.img1v1Url}?param=400y400`"
        :title="artist.name"
      ></card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, useCssModule } from 'vue'
import Card from '../components/Card.vue'
import axios from 'axios'
import { Artist } from '@/interface'

export default defineComponent({
  name: 'ArtistView',
  components: {
    Card
  },
  setup () {
    const style = useCssModule()
    const artistList: Ref<Artist[] | undefined> = ref()

    axios.get('/artist/list').then(({ data }) => {
      artistList.value = data.artists
      console.log(data.artists)
    })

    return {
      style,
      artistList
    }
  }
})
</script>

<style lang="scss" module>
.content {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 30px 20px;
}
</style>
