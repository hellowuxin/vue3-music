<template>
  <div :class="style['container']" ref="containerEle">
    <progress-linear
      :class="style['progress']"
      :value="globalCurrent"
      :max="track && track.dt"
      @progress-click="onProgressClick"
      :width="containerEle ? `${containerEle.offsetWidth}px` : ''"
    ></progress-linear>
    <div :class="style['content']">
      <div :class="style['left']" v-if="track">
        <div :class="style['change-playview']" @click="changePlayView">
          <img :src="`${track.al.picUrl}?param=60y60`" alt="">
          <div :class="style['change-playview-icon']"><icon :icon-id="playView ? 'iconzhankai' : 'iconshouqi'"></icon></div>
        </div>
        <div :class="style['left-content']">
          <div :class="style['track-title']">
            <span class="ellipsis">{{ track.name }}</span>
            <span>&nbsp;-&nbsp;</span>
            <ul class="breadcrumb">
              <li v-for="ar in track.ar" :key="ar.id">
                <router-link to="#">{{ ar.name }}</router-link>
              </li>
            </ul>
          </div>
          <div :class="style['time']">{{ getTrackTime(globalCurrent) }}/{{ getTrackTime(track.dt) }}</div>
        </div>
      </div>
      <div :class="style['left']" v-else></div>
      <div :class="style['center']">
        <btn :icon="true"><icon icon-id="iconaixin"/></btn>
        <btn :icon="true" :class="style['iconshangyishou']"><icon icon-id="iconshangyishou"/></btn>
        <icon :icon-id="globalPaused ? 'iconplay_go' : 'iconplay_pause'" :class="style['iconplay']" @click="play"/>
        <btn :icon="true" :class="style['iconxiayishou']"><icon icon-id="iconxiayishou"/></btn>
        <btn :icon="true" @click="shareMusic"><icon icon-id="iconfenxiang"/></btn>
      </div>
      <div :class="style['right']">
        <btn :icon="true"><icon icon-id="iconliebiaoshunxu"/></btn>
        <btn :icon="true"><icon icon-id="iconbofangliebiao"/></btn>
        <dropdown>
          <template #activator="{ on }">
            <btn :icon="true" v-on="on" @click="changeMuted">
              <icon :icon-id="muted ? 'iconjingyin1' : 'iconyinliang'"/>
            </btn>
          </template>
          <span :class="style['volume-number']">{{ muted ? 0 : Math.floor(volume * 100) }}</span>
          <progress-linear
            :vertical="true"
            :value="muted ? 0 : volume"
            :max="1"
            height="60px"
            @progress-click="onVolumeClick"
          ></progress-linear>
        </dropdown>
      </div>
    </div>
  </div>
  <overlay :visible="sharedDialog">
    <shared-card :track="track" v-if="track" :qrcodeUrl="`https://music.163.com/#/song?id=${track.id}`">
      <btn class="sharedcard-close" :icon="true" @click="sharedDialog = false">
        <icon icon-id="iconclose"></icon>
      </btn>
    </shared-card>
  </overlay>
</template>

<script lang="ts">
import { computed, defineComponent, useCssModule, ref, Ref } from 'vue'
import { useStore } from 'vuex'
import { GlobalStore } from '@/store'
import Icon from './Icon.vue'
import { getTrackTime } from '@/tools'
import { emitter } from '@/components/MusicAudio.vue'
import ProgressLinear from '@/components/ProgressLinear.vue'
import Btn from '@/components/Btn.vue'
import Dropdown from '@/components/Dropdown.vue'
import createMessage from './Message'
import Overlay from '@/components/Overlay.vue'
import SharedCard from '@/components/SharedCard.vue'

export default defineComponent({
  name: 'MusicBar',
  components: {
    Icon,
    ProgressLinear,
    Btn,
    Dropdown,
    Overlay,
    SharedCard
  },
  setup () {
    const style = useCssModule()
    const store = useStore<GlobalStore>()
    const volume = computed(() => store.state.volume)
    const muted = computed(() => store.state.muted)
    const track = computed(() => store.state.track)
    const globalPaused = computed(() => store.state.paused)
    const globalCurrent = computed(() => store.state.currentTime)
    const playView = computed(() => store.state.playView)
    const sharedDialog = ref(false)
    const containerEle: Ref<HTMLDivElement | undefined> = ref()

    const play = () => {
      if (track.value) {
        store.commit(globalPaused.value ? 'play' : 'pause')
      } else {
        createMessage('没有可播放的音频', 'error')
      }
    }
    const changeMuted = () => {
      store.commit('changeMuted')
    }
    const onProgressClick = (percent: number) => {
      emitter.emit('changeCurrentTime', percent)
    }
    const onVolumeClick = (percent: number) => {
      store.commit('changeVolume', percent)
    }
    const changePlayView = () => {
      store.commit('changePlayView')
    }
    const shareMusic = () => {
      if (track.value) {
        sharedDialog.value = true
      } else {
        createMessage('没有可分享的音乐', 'error')
      }
    }

    return {
      style,
      track,
      getTrackTime,
      globalPaused,
      play,
      globalCurrent,
      onProgressClick,
      onVolumeClick,
      volume,
      muted,
      changeMuted,
      changePlayView,
      playView,
      sharedDialog,
      containerEle,
      shareMusic
    }
  }
})
</script>

<style lang="scss" module>
.container {
  z-index: 3;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.progress {
  position: absolute;
  top: -5px;
  left: 0;
  right: 0;
}

.content {
  background-color: white;
  display: flex;
  height: 50px;
  padding: 10px;
  color: #4C4C4C;
}

.left,
.center,
.right {
  display: flex;
  flex: 1;
}

.left {
  height: inherit;
  gap: 10px;
  overflow: hidden;

  &-content {
    width: calc(100% - 50px - 10px);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}

.change-playview {
  position: relative;
  height: inherit;
  cursor: pointer;
  border-radius: 4px;

  img {
    height: inherit;
    border-radius: inherit;
  }

  &:hover &-icon {
    display: flex;
  }

  &-icon {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: none;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: inherit;
    backdrop-filter: blur(3px);
    font-size: 30px;
  }
}

.track-title {
  white-space: nowrap;

  > * {
    vertical-align: bottom;
    display: inline-block;
    max-width: calc((100% - 20px) / 2);
  }

  :global(.breadcrumb) {
    color: var(--grey);
  }
}

.time {
  font-family: var(--monospaced);
  color: var(--lightgrey);
}

.center {
  justify-content: center;

  .iconplay {
    font-size: 50px;
  }

  .iconplay,
  .iconxiayishou,
  .iconshangyishou {
    color: var(--main-color);
  }
}

.right {
  justify-content: flex-end;
}

.center,
.right {
  align-items: center;
  gap: 20px;

  :global(.icon):not(.iconplay) {
    font-size: 25px;
    cursor: pointer;
  }
}

.volume-number {
  text-align: center;
  font-size: 12px;
  width: 20px;
}
</style>
