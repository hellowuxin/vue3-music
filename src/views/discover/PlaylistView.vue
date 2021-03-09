<template>
  <div :class="style['container']">
    <div
      v-if="highPlaylist"
      :class="style['header']"
      :style="{ backgroundImage: `url(${ highPlaylist.coverImgUrl })` }"
    >
      <img :src="highPlaylist.coverImgUrl">
      <div>
        <div :class="style['iconcrown']">
          <icon medium iconId="iconcrown"></icon>
          <span>精品歌单</span>
        </div>
        <div :class="style['header-title']">{{ highPlaylist.name }}</div>
        <div :class="style['header-copywriter']">{{ highPlaylist.copywriter }}</div>
      </div>
    </div>
    <div :class="style['filter']">
      <div :class="style['filter-header']">
        <btn @click.stop="showCategories = !showCategories">
          <span class="nowrap">{{ activeTag || '全部' }}</span>
          <icon iconId="iconwebicon215"></icon>
        </btn>
        <chip-group v-model="activeTag">
          <chip
            v-for="t in hotTags || []"
            :key="t.id"
          >{{ t.name }}</chip>
        </chip-group>
      </div>
      <transition
        :enter-active-class="style['enter-active']"
        :leave-active-class="style['enter-active']"
        :enter-from-class="style['enter-from']"
        :leave-to-class="style['enter-from']"
      >
        <div v-if="categories" v-show="showCategories" :class="style['categories']" @click.stop="">
          <chip-group
            v-model="activeTag"
            v-for="(c, key) in categories"
            :key="c"
            :title="c"
          >
            <chip
              v-for="temp in (tags ? tags[parseInt(key, 10)] : [])"
              :key="temp"
              @click="showCategories = false"
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
        :creator="playlist.creator.nickname"
        @click="clickCard(playlist)"
        @click-play="clickPlay(playlist)"
      ></card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, useCssModule, watch } from 'vue'
import axios from 'axios'
import Card from '@/components/Card.vue'
import { Playlist, Track } from '@/interface'
import { Chip, ChipGroup } from '@/components/Chip'
import Icon from '@/components/Icon.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Btn from '@/components/Btn.vue'

interface Category {
  category: number
  name: string
}

interface Tag {
  id: number
  name: string
}

export default defineComponent({
  name: 'DiscoverPlaylistView',
  components: {
    Card,
    ChipGroup,
    Chip,
    Icon,
    Btn
  },
  setup () {
    const style = useCssModule()
    const playlistArr: Ref<Playlist[] | undefined> = ref()
    const categories: Ref<Record<number, string> | undefined> = ref()
    const hotTags: Ref<Tag[] | undefined> = ref()
    const highPlaylist: Ref<Playlist | undefined> = ref()
    const tags: Ref<string[][] | undefined> = ref()
    const activeTag: Ref<string> = ref('全部')
    const showCategories = ref(false)
    const router = useRouter()
    const store = useStore()

    axios.get('/playlist/catlist').then(({ data }) => {
      categories.value = data.categories
      const sub: Category[] = data.sub
      tags.value = new Array(Object.keys(categories.value as any).length).fill(0).map<string[]>(() => [])
      sub.forEach((c) => {
        if (tags.value) {
          tags.value[c.category].push(c.name)
        }
      })
    })

    axios.get<{ tags: Tag[], code: number }>('/playlist/hot').then(({ data }) => {
      hotTags.value = data.tags
    })

    axios.get<{ playlists: Playlist[] }>('/top/playlist/highquality?limit=1').then(({ data }) => {
      highPlaylist.value = data.playlists[0]
    })

    watch(activeTag, (tag) => {
      axios.get<{ playlists: Playlist[] }>(`/top/playlist?cat=${tag}`).then(({ data }) => {
        playlistArr.value = data.playlists
      })
    }, {
      immediate: true
    })

    const clickCard = (play: Playlist) => {
      router.push({ name: 'playlist-view', query: { id: play.id } })
    }
    const clickPlay = (play: Playlist) => {
      axios.get(`/playlist/detail?id=${play.id}`).then(({ data }) => {
        const tracks: Track[] = data.playlist.tracks
        store.dispatch({
          type: 'playSong',
          track: tracks[0],
          tracklist: tracks
        })
      })
    }
    const onBlur = () => {
      showCategories.value = false
    }

    document.body.addEventListener('click', onBlur)

    return {
      style,
      playlistArr,
      tags,
      categories,
      activeTag,
      showCategories,
      hotTags,
      highPlaylist,
      clickCard,
      clickPlay
    }
  }
})
</script>

<style lang="scss" module>
.enter-active {
  opacity: 1;
  transition: opacity .3s ease;
}

.enter-from {
  opacity: 0;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.header {
  position: relative;
  padding: 15px;
  margin-top: 10px;
  border-radius: 4px;
  display: flex;
  gap: 10px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(40px);
    border-radius: inherit;
  }

  & > * {
    z-index: 0;
  }

  img {
    border-radius: inherit;
    width: 150px;
  }

  .iconcrown {
    margin: 20px 0;
    padding: 5px 15px;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    border: #E7AA5A 1px solid;
    border-radius: 44px;
    color: #E7AA5A;
    font-size: small;
  }

  &-title {
    color: white;
    margin-bottom: 5px;
  }

  &-copywriter {
    font-size: small;
    color: var(--lightgrey)
  }
}

.filter {
  position: relative;
  border-radius: 4px;

  &-header {
    display: flex;
    cursor: pointer;
    font-size: small;

    & > *:last-child {
      margin-left: auto;
    }
  }

  .categories {
    position: absolute;
    top: 0;
    z-index: 1;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: var(--shadow);
    border-radius: inherit;
    padding: 16px;
  }

  .dropdown {
    position: relative;
    border: 6px solid transparent;
    border-top-color: var(--grey);
    top: 3px;
  }

  .unfold.dropdown {
    transform: rotate(180deg);
    top: -3px;
  }
}

.content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px 20px;
}
</style>
