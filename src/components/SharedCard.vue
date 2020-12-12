<template>
  <div :class="style['shared-card']">
    <span>微信扫码分享</span>
    <div v-if="track" :class="style['preview']">
      <img :src="`${track.al.picUrl}?param=44y44`" alt="">
      <div>
        <div class="ellipsis">{{ track.name }}</div>
        <ul class="breadcrumb">
          <li v-for="ar in track.ar" :key="ar.id">{{ ar.name }}</li>
        </ul>
      </div>
    </div>
    <div v-else-if="preview" :class="style['preview']">
      <img :src="preview.img">
      <div class="ellipsis">{{ preview.name }}</div>
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
    track: Object as PropType<Track>,
    qrcodeUrl: {
      type: String,
      required: true
    },
    preview: Object as PropType<{ name: string, img: string }>
  },
  setup (props) {
    const style = useCssModule()
    const qrcodeEle: Ref<HTMLCanvasElement | undefined> = ref()

    const makeQrcode = () => {
      if (qrcodeEle.value) {
        qrcode.toCanvas(qrcodeEle.value, props.qrcodeUrl)
      }
    }

    watch(() => props.track, makeQrcode)

    onMounted(() => {
      makeQrcode()
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
  box-sizing: inherit;
  width: 100%;

  > * {
    overflow: hidden;
  }

  img {
    width: 44px;
    height: 44px;
    border-radius: inherit;
    flex-shrink: 0;
  }

  :global(.breadcrumb) {
    color: var(--grey);
  }
}

:global(.sharedcard-close) {
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(100%, -100%);
  color: white;
  font-size: large;
}
</style>
