<template>
  <table :class="style['container']">
    <colgroup>
      <col>
      <col>
      <col>
      <col>
      <col>
    </colgroup>
    <thead>
      <tr>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(track, index) in tracks"
        :key="track.id"
        :class="globalTrack && globalTrack.id === track.id ? style['playing'] : ''"
      >
        <td :class="style['serial']">
          <span>{{ (index + 1).toString().padStart(2, '0') }}</span>
          <icon iconId="iconaixin"></icon>
          <icon iconId="icondownload"></icon>
        </td>
        <td :class="style['songtitle']">
          <div>
            <div :class="style['songtitle-name']">
              <span>{{ track.name }}</span>
              <span v-if="track.alia.length > 0">&nbsp;({{ track.alia[0] }})</span>
            </div>
            <icon v-if="track.mv" iconId="iconvideo" :class="style['iconvideo']"></icon>
            <div :class="style['songtitle-action']">
              <icon
                :iconId="
                  (globalTrack &&
                  globalTrack.id === track.id &&
                  globalPlaying) ? 'iconpause' : 'iconplay1'
                "
                @click="playSong(track)"
              ></icon>
              <icon iconId="iconxiazai1"></icon>
            </div>
          </div>
        </td>
        <td>
          <ul class="breadcrumb">
            <li v-for="ar in track.ar" :key="ar.id">
              <router-link to="#">{{ ar.name }}</router-link>
            </li>
          </ul>
        </td>
        <td>{{ track.al.name }}</td>
        <td>{{ getTrackTime(track.dt) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, useCssModule } from 'vue'
import { useStore } from 'vuex'
import { StoreData } from '@/store'
import { Track } from '../interface'
import Icon from './Icon.vue'
import { getTrackTime } from '@/tools'

export default defineComponent({
  name: 'TabsItems',
  components: {
    Icon
  },
  props: {
    tracks: {
      type: Array as PropType<Track[]>,
      required: true
    }
  },
  setup () {
    const style = useCssModule()
    const store = useStore<StoreData>()
    const globalTrack = computed(() => {
      return store.state.track
    })
    const globalPlaying = computed(() => {
      return store.state.playing
    })

    const playSong = (track: Track) => {
      if (globalTrack.value && globalTrack.value.id === track.id) {
        store.commit('play')
      } else {
        store.commit('playSong', track)
      }
    }

    return {
      style,
      playSong,
      getTrackTime,
      globalTrack,
      globalPlaying
    }
  }
})
</script>

<style lang="scss" module>
.container {
  color: var(--grey);
  border-spacing: 0;
  width: 100%;
  table-layout: fixed;

  :global(.icon) {
    font-size: x-large;
  }

  colgroup col {

    &:first-child {
      width: 100px;
    }

    &:last-child {
      width: 61px;
    }
  }

  th {
    text-align: start;
    font-weight: normal;
  }

  td,
  th {
    border: 5px solid transparent;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  thead th:hover,
  tbody tr:hover {
    background-color: #F2F2F3;
  }

  thead tr,
  tbody td:first-child span,
  tbody td:last-child {
    color: var(--lightgrey);
  }

  tbody td:first-child,
  tbody td:last-child {
    font-family: var(--monospaced);
  }

  tbody tr {

    &.playing {
      color: var(--main-color);
      background-color: #F2F2F3;
    }

    &:hover .songtitle-action {
      display: flex;
    }

    &:nth-child(odd) {
      background-color: #FAFAFA;
    }
  }
}

.serial {
  display: flex;
  gap: 5px;
  align-items: center;

  span {
    margin-right: 10px;
  }
}

.songtitle {

  > div {
    display: flex;
    align-items: center;
  }

  &-name {
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 5px;
  }

  span:not(:first-child) {
    color: var(--lightgrey);
  }

  :global(.icon) {
    font-size: large;
    flex-shrink: 0;
    cursor: pointer;
  }

  .iconvideo {
    color: var(--main-color);
  }

  &-action {
    display: none;
    gap: 5px;
    margin-left: auto;
  }
}
</style>
