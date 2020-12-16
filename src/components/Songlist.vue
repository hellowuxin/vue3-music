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
          <icon icon-id="iconaixin"></icon>
          <icon icon-id="icondownload"></icon>
        </td>
        <td :class="style['songtitle']">
          <div>
            <div :class="[style['songtitle-name'], 'ellipsis']">
              <span>{{ track.name }}</span>
              <span v-if="track.alia.length > 0">&nbsp;({{ track.alia[0] }})</span>
            </div>
            <icon v-if="track.mv" icon-id="iconvideo" :class="style['iconvideo']"></icon>
            <div :class="style['songtitle-action']">
              <icon
                :icon-id="
                  (globalTrack &&
                  globalTrack.id === track.id &&
                  !globalPaused) ? 'iconpause' : 'iconplay1'
                "
                @click="playSong(track)"
              ></icon>
              <icon icon-id="iconxiazai1"></icon>
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
import { GlobalStore } from '@/store'
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
  setup (props) {
    const style = useCssModule()
    const store = useStore<GlobalStore>()
    const globalTrack = computed(() => store.state.track)
    const globalPaused = computed(() => store.state.paused)

    const playSong = (track: Track) => {
      store.dispatch({
        type: 'playSong',
        tracklist: props.tracks,
        track
      })
    }

    return {
      style,
      playSong,
      getTrackTime,
      globalTrack,
      globalPaused
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
