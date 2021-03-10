<template>
  <div :class="style['container']">
    <div :class="style['header']">
      <span>精品歌单</span>
      <dropdown left>
        <template #activator="{ on }">
          <btn v-on="on">
            <span>筛选</span>
            <icon iconId="iconwebicon215"></icon>
          </btn>
        </template>
        <chip-group v-if="tags" :class="style['tags']">
          <chip
            v-for="tag in tags"
            :key="tag.id"
          >{{ tag.name }}</chip>
        </chip-group>
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
import { defineComponent, useCssModule, Ref, ref } from 'vue'
import Btn from '@/components/Btn.vue'
import axios from 'axios'
import { Playlist, Tag } from '@/interface'
import Card from '@/components/Card.vue'
import Icon from '@/components/Icon.vue'
import Dropdown from '@/components/Dropdown.vue'
import { ChipGroup, Chip } from '@/components/Chip'

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

    axios.get<{ playlists: Playlist[] }>('/top/playlist/highquality').then(({ data }) => {
      playlistArr.value = data.playlists
    })

    axios.get<{ tags: Tag[] }>('/playlist/highquality/tags').then(({ data }) => {
      tags.value = data.tags
    })

    return {
      style,
      playlistArr,
      tags
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

  img {
    width: 150px;
  }
}
</style>
