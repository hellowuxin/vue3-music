<template>
  <div :class="style['container']">
    <div :class="style['header']">
      <span>精品歌单</span>
      <dropdown left>
        <template #activator="{ on }">
          <btn v-on="on">
            <span>{{ activeCat }}</span>
            <icon iconId="iconwebicon215"></icon>
          </btn>
        </template>
        <template #default="{ close }">
          <chip-group v-if="tags" :class="style['tags']" v-model="activeCat">
            <chip
              v-for="tag in tags"
              :key="tag.id"
              @click="close"
            >{{ tag.name }}</chip>
          </chip-group>
        </template>
      </dropdown>
    </div>
    <div v-if="playlistArr" :class="style['content']">
      <div
        :class="style['playlist']"
        v-for="playlist in playlistArr"
        :key="playlist.id"
      >
        <card
          play
          :imgSrc="playlist.coverImgUrl"
          :playCount="playlist.playCount"
          label="iconcrown"
          width="150px"
          @click="clickCard(playlist)"
        ></card>
        <div>
          <div>{{ playlist.name }}</div>
          <div>{{ playlist.creator.nickname }}</div>
          <div>{{ playlist.copywriter }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useCssModule, Ref, ref, watch } from 'vue'
import Btn from '@/components/Btn.vue'
import axios from 'axios'
import { Playlist, Tag } from '@/interface'
import Card from '@/components/Card.vue'
import Icon from '@/components/Icon.vue'
import Dropdown from '@/components/Dropdown.vue'
import { ChipGroup, Chip } from '@/components/Chip'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'highPlaylistView',
  components: {
    Btn,
    Card,
    Icon,
    Dropdown,
    ChipGroup,
    Chip
  },
  setup () {
    const style = useCssModule()
    const playlistArr: Ref<Playlist[] | undefined> = ref()
    const tags: Ref<Tag[] | undefined> = ref()
    const router = useRouter()
    const activeCat = ref('全部')
    const route = useRoute()

    axios.get<{ tags: Tag[] }>('/playlist/highquality/tags').then(({ data }) => {
      tags.value = data.tags
    })

    const clickCard = (play: Playlist) => {
      router.push({ name: 'playlist-view', query: { id: play.id } })
    }

    watch(() => route.query.cat, (cat) => {
      if (cat) {
        activeCat.value = cat as string
      }
    }, { immediate: true })
    watch(activeCat, (cat) => {
      const timestamp = new Date().getTime()
      axios.post<{ playlists: Playlist[] }>(`/top/playlist/highquality?timestamp=${timestamp}`, {
        cat
      }).then(({ data }) => {
        playlistArr.value = data.playlists
      })
      if (route.query.cat !== cat) {
        router.push({ path: '/discover/playlist/highquality', query: { cat } })
      }
    }, { immediate: true })

    return {
      clickCard,
      style,
      playlistArr,
      tags,
      activeCat
    }
  }
})
</script>

<style lang="scss" module>
.header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  & > *:last-child {
    margin-left: auto;
  }

  .tags {
    width: 300px;
    padding: 16px;
  }
}

.content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px 20px;
}

.playlist {
  display: flex;
  gap: 10px;
}
</style>
