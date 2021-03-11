<template>
  <div :class="style['container']">
    <router-link
      v-if="highPlaylist"
      :class="style['header']"
      :style="{ backgroundImage: `url(${ highPlaylist.coverImgUrl })` }"
      :to="`/discover/playlist/highquality?cat=${activeTag}`"
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
    </router-link>
    <div :class="style['filter']">
      <dropdown right top>
        <template #activator="{ on }">
          <btn v-on="on">
            <span class="nowrap">{{ activeTag || '全部' }}</span>
            <icon iconId="iconwebicon215"></icon>
          </btn>
        </template>
        <template #default="{ close }">
          <div v-if="categories" :class="style['categories']">
            <chip-group
              v-model="activeTag"
              v-for="(c, key) in categories"
              :key="c"
              :title="c"
            >
              <chip
                v-for="temp in (tags ? tags[parseInt(key, 10)] : [])"
                :key="temp"
                @click="close"
              >{{ temp }}</chip>
            </chip-group>
          </div>
        </template>
      </dropdown>
      <chip-group v-if="hotTags" v-model="activeTag">
        <chip
          v-for="t in hotTags"
          :key="t.id"
        >{{ t.name }}</chip>
      </chip-group>
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
import { Playlist, Track, Tag } from '@/interface'
import { Chip, ChipGroup } from '@/components/Chip'
import Icon from '@/components/Icon.vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Btn from '@/components/Btn.vue'
import Dropdown from '@/components/Dropdown.vue'

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
    Icon,
    Btn,
    Dropdown
  },
  setup () {
    const style = useCssModule()
    const playlistArr: Ref<Playlist[] | undefined> = ref()
    const categories: Ref<Record<number, string> | undefined> = ref()
    const hotTags: Ref<Tag[] | undefined> = ref()
    const highPlaylist: Ref<Playlist | undefined> = ref()
    const tags: Ref<string[][] | undefined> = ref()
    const activeTag: Ref<string> = ref('全部')
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    axios.get<{
      categories: Record<number, string>
      sub: Category[]
    }>('/playlist/catlist').then(({ data }) => {
      categories.value = data.categories
      const sub = data.sub
      tags.value = new Array(Object.keys(categories.value).length).fill(0).map<string[]>(() => [])
      sub.forEach((c) => {
        if (tags.value) {
          tags.value[c.category].push(c.name)
        }
      })
    })

    axios.get<{ tags: Tag[], code: number }>('/playlist/hot').then(({ data }) => {
      hotTags.value = data.tags
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
    const selectCategory = (cat: string) => {
      // timestamp防止缓存
      const timestamp = new Date().getTime()
      // post防止转义
      axios.post<{ playlists: Playlist[] }>(`/top/playlist?timestamp=${timestamp}`, {
        cat
      }).then(({ data }) => {
        playlistArr.value = data.playlists
      })

      axios.post<{ playlists: Playlist[] }>(`/top/playlist/highquality?timestamp=${timestamp}`, {
        cat,
        limit: 1
      }).then(({ data }) => {
        highPlaylist.value = data.playlists[0]
      })
    }

    watch(() => route.query.cat, (val) => {
      if (val) {
        activeTag.value = val as string
      }
    }, { immediate: true })
    watch(activeTag, (cat) => {
      selectCategory(cat)
      if (route.query.cat !== cat) {
        router.push({ path: '/discover/playlist', query: { cat } })
      }
    }, { immediate: true })

    return {
      style,
      playlistArr,
      tags,
      categories,
      activeTag,
      hotTags,
      highPlaylist,
      clickCard,
      clickPlay
    }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.header {
  position: relative;
  padding: 15px;
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
  display: flex;
  align-items: center;
  font-size: small;

  & > *:last-child {
    margin-left: auto;
  }

  .categories {
    box-sizing: border-box;
    padding: 16px;
    width: calc(100vw - var(--leftspace) - 40px);
    display: flex;
    flex-direction: column;
    gap: 10px;
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
  grid-template-columns: repeat(4, calc(25% - 15px));
  gap: 30px 20px;
}
</style>
