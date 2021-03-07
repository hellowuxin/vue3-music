<template>
  <div :class="style['container']">
    <div :class="style['filter']">
      <div>筛选</div>
      <div v-if="categories" :class="style['categories']">
        <chip-group
          v-model="activeTag"
          v-for="(c, key) in categories"
          :key="c"
          :title="c"
        >
          <chip
            v-for="temp in (arr ? arr[parseInt(key, 10)] : [])"
            :key="temp"
          >{{ temp }}</chip>
        </chip-group>
      </div>
    </div>
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
import { Chip, ChipGroup } from '@/components/Chip'

interface Category {
  category: number
  name: string
}

export default defineComponent({
  name: 'DiscoverPlaylistView',
  components: {
    Card,
    ChipGroup,
    Chip
  },
  setup () {
    const style = useCssModule()
    const playlistArr: Ref<Playlist[] | undefined> = ref()
    const categories: Ref<Record<number, string> | undefined> = ref()
    const arr: Ref<string[][] | undefined> = ref()
    const activeTag: Ref<string> = ref('')

    axios.get('/playlist/catlist').then(({ data }) => {
      categories.value = data.categories
      const sub: Category[] = data.sub
      arr.value = new Array(Object.keys(categories.value as any).length).fill(0).map<string[]>(() => [])
      sub.forEach((c) => {
        if (arr.value) {
          arr.value[c.category].push(c.name)
        }
      })
    })

    axios.get('/playlist/hot').then(({ data }) => {
      console.log(data)
    })
    axios.get('/top/playlist').then(({ data }) => {
      playlistArr.value = data.playlists
    })

    return {
      style,
      playlistArr,
      arr,
      categories,
      activeTag
    }
  }
})
</script>

<style lang="scss" module>
.filter {
  margin-bottom: 10px;
}

.categories {
  display: flex;
  flex-direction: column;
  gap: 10px
}

.content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px 20px;
}
</style>
