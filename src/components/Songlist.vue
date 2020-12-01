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
      <tr v-for="(track, index) in tracks" :key="track.id">
        <td :class="style['serial']">
          <span>{{ (index + 1).toString().padStart(2, '0') }}</span>
          <icon iconId="iconaixin"></icon>
          <icon iconId="icondownload"></icon>
        </td>
        <td :class="style['songtitle']">
          <div>
            <div :class="style['songtitle-name']">
              <span>{{ track.name }}</span>
              <span v-if="track.alia.length > 0">({{ track.alia[0] }})</span>
            </div>
            <icon v-if="track.mv" iconId="iconvideo" :class="style['iconvideo']"></icon>
            <div :class="style['songtitle-action']">
              <icon iconId="iconplay1"></icon>
              <icon iconId="iconxiazai1"></icon>
            </div>
          </div>
        </td>
        <td :class="style['singer']">
          <ul class="breadcrumb">
            <li v-for="ar in track.ar" :key="ar.id">
              <router-link to="#">{{ ar.name }}</router-link>
            </li>
          </ul>
        </td>
        <td :class="style['album']">{{ track.al.name }}</td>
        <td>{{ Math.floor(track.dt / 60000).toString().padStart(2, '0') }}:{{ Math.floor(track.dt / 1000 % 60).toString().padStart(2, '0') }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType, useCssModule } from 'vue'
import { Track } from '../interface'
import Icon from './Icon.vue'

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

    return {
      style
    }
  }
})
</script>

<style lang="scss" module>
.container {
  border-spacing: 0;
  width: 100%;
  table-layout: fixed;

  :global(.icon) {
    font-size: x-large;
  }

  colgroup col:first-child {
    width: 100px;
  }

  colgroup col:last-child {
    width: 61px;
  }

  th {
    text-align: start;
    font-weight: normal;
    color: var(--grey)
  }

  td,
  th {
    border: 5px solid transparent;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  tbody tr:nth-child(odd) {
    background-color: #FAFAFA;
  }

  thead th:hover,
  tbody tr:hover {
    background-color: #F2F2F3;
  }

  tbody td:last-child {
    font-family: var(--monospaced);
    color: var(--lightgrey);
  }
}

.serial {
  color: var(--lightgrey);
  display: flex;
  gap: 5px;
  align-items: center;
  font-family: var(--monospaced);

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
  }

  .iconvideo {
    color: var(--main-color);
  }

  &-action {
    display: none;
    gap: 5px;
    margin-left: auto;
    color: var(--lightgrey);

    :global(.icon) {
      cursor: pointer;
    }
  }
}

.songtitle:hover .songtitle-action {
  display: flex;
}

.singer,
.album {
  color: var(--grey);
}
</style>
