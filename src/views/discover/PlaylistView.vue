<template>
  <div :class="style['container']">
    <div :class="style['filter']">
      <btn @click="showCategories = !showCategories">筛选</btn>
      <transition
        :enter-active-class="style['enter-active']"
        :leave-active-class="style['enter-active']"
        :enter-from-class="style['enter-from']"
        :leave-to-class="style['enter-from']"
      >
        <div v-if="categories" v-show="showCategories" :class="style['categories']">
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
      </transition>
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
import { defineComponent, Ref, ref, useCssModule, watch } from 'vue'
import axios from 'axios'
import Card from '@/components/Card.vue'
import { Playlist } from '@/interface'
import { Chip, ChipGroup } from '@/components/Chip'
import Btn from '@/components/Btn.vue'

interface Category {
  category: number
  name: string
}

export default defineComponent({
  name: 'DiscoverPlaylistView',
  components: {
    Card,
    ChipGroup,
    Chip,
    Btn
  },
  setup () {
    const style = useCssModule()
    const playlistArr: Ref<Playlist[] | undefined> = ref()
    const categories: Ref<Record<number, string> | undefined> = ref()
    const arr: Ref<string[][] | undefined> = ref()
    const activeTag: Ref<string> = ref('全部')
    const showCategories = ref(false)

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

    watch(activeTag, (tag) => {
      axios.get(`/top/playlist?cat=${tag}`).then(({ data }) => {
        console.log(data)
        playlistArr.value = data.playlists
      })
    }, {
      immediate: true
    })

    return {
      style,
      playlistArr,
      arr,
      categories,
      activeTag,
      showCategories
    }
  }
})
</script>

<style lang="scss" module>
.enter-active {
  max-height: 262px;
  transition: max-height .3s ease;
}

.enter-from {
  max-height: 0;
}

.filter {
  margin-bottom: 10px;

  > button {
    margin-bottom: 10px;
  }
}

.categories {
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
}

.content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px 20px;
}
</style>
