<template>
  <div :class="style['shared-card']">
    <span>微信扫码分享</span>
    <div v-if="track" :class="style['preview']">
      <img :src="`${track.al.picUrl}?param=44y44`" alt="">
      <div :class="style['ellipsis']">
        <div>{{ track.name }}</div>
        <ul class="breadcrumb">
          <li v-for="ar in track.ar" :key="ar.id">{{ ar.name }}</li>
        </ul>
      </div>
    </div>
    <canvas ref="qrcodeEle"></canvas>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, useCssModule, Ref, ref, PropType, watch, onMounted } from 'vue'
import qrcode from 'qrcode'
import { Track } from '@/interface'

export default defineComponent({
  name: 'SharedCard',
  props: {
    track: {
      type: Object as PropType<Track>,
      required: true
    }
  },
  setup (props) {
    const style = useCssModule()
    const qrcodeEle: Ref<HTMLCanvasElement | undefined> = ref()

    const makeQrcode = (track: Track) => {
      const url = `https://music.163.com/#/song?id=${track.id}`

      if (qrcodeEle.value) {
        qrcode.toCanvas(qrcodeEle.value, url)
      }
    }

    watch(() => props.track, makeQrcode)

    onMounted(() => {
      makeQrcode(props.track)
    })

    return {
      style,
      qrcodeEle
    }
  }
})
</script>

<style lang="scss" module>
.shared-card {
  position: relative;
  background-color: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px 10px 20px;
  box-sizing: border-box;
  width: 275px;
  height: 275px;
}
.preview {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
  background-color: #F2F2F2;
  white-space: nowrap;
  box-sizing: inherit;
  width: 100%;

  img {
    width: 44px;
    height: 44px;
    border-radius: inherit;
  }

  :global(.breadcrumb) {
    color: var(--grey);
  }

  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;

    > * {
      text-overflow: inherit;
      overflow: inherit;
    }
  }
}
</style>
