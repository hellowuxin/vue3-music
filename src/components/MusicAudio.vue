<template>
  <teleport to="body">
    <audio ref="audioEle" @timeupdate="onTimeUpdate" @ended="onEnded"></audio>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { GlobalStore } from '@/store'
import mitt from '@/mitt'

export const emitter = mitt()
export default defineComponent({
  name: 'MusicAudio',
  setup () {
    const audioEle: Ref<HTMLAudioElement | undefined> = ref()
    const store = useStore<GlobalStore>()

    watch(() => store.state.songUrl, (newVal) => {
      if (audioEle.value) {
        audioEle.value.src = newVal
        if (!store.state.paused) {
          audioEle.value.play()
        }
      }
    })
    watch(() => store.state.paused, (newVal) => {
      if (audioEle.value) {
        if (!newVal) {
          audioEle.value.play()
        } else {
          audioEle.value.pause()
        }
      }
    })
    watch(() => store.state.volume, (volume) => {
      if (audioEle.value) {
        audioEle.value.volume = volume
      }
    })
    watch(() => store.state.muted, (muted) => {
      if (audioEle.value) {
        audioEle.value.muted = muted
      }
    })
    emitter.on('changeCurrentTime', (percent: number) => {
      if (audioEle.value && store.state.track) {
        audioEle.value.currentTime = store.state.track.dt * percent / 1000
      }
    })

    const onTimeUpdate = () => {
      if (audioEle.value) {
        store.commit('timeUpdate', audioEle.value.currentTime * 1000)
      }
    }
    const onEnded = () => {
      store.dispatch('end')
    }

    return {
      audioEle,
      onTimeUpdate,
      onEnded
    }
  }
})
</script>
