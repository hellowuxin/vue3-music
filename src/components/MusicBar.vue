<template>
  <transition :enter-active-class="style['enter-active']" :enter-from-class="style['enter-from']">
    <div :class="style['container']" v-if="track">
      <progress-linear :value="globalCurrent" :max="track.dt" @progress-click="onProgressClick"></progress-linear>
      <div :class="style['content']">
        <div :class="style['left']">
          <div :class="style['left-img']">
            <img :src="`${track.al.picUrl}?param=60y60`" alt="">
            <div :class="style['iconshouqi']"><icon iconId="iconshouqi"></icon></div>
          </div>
          <div :class="style['left-content']">
            <div :class="style['track-title']">
              <span>{{ track.name }}</span>
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
        <div :class="style['center']">
          <icon iconId="iconaixin"/>
          <icon iconId="iconshangyishou" :class="style['iconshangyishou']"/>
          <icon :iconId="globalPaused ? 'iconplay_go' : 'iconplay_pause'" :class="style['iconplay']" @click="play"/>
          <icon iconId="iconxiayishou" :class="style['iconxiayishou']"/>
          <icon iconId="iconfenxiang"/>
        </div>
        <div :class="style['right']">
          <btn :icon="true"><icon iconId="iconliebiaoshunxu"/></btn>
          <btn :icon="true"><icon iconId="iconbofangliebiao"/></btn>
          <dropdown>
            <template #activator="{ on }">
              <btn :icon="true" v-on="on" @click="changeMuted">
                <icon :iconId="muted ? 'iconjingyin1' : 'iconyinliang'"/>
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
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, useCssModule } from 'vue'
import { useStore } from 'vuex'
import { GlobalStore } from '@/store'
import Icon from './Icon.vue'
import { getTrackTime } from '@/tools'
import { emitter } from '@/components/MusicAudio.vue'
import ProgressLinear from '@/components/ProgressLinear.vue'
import Btn from '@/components/Btn.vue'
import Dropdown from '@/components/Dropdown.vue'

export default defineComponent({
  name: 'MusicBar',
  components: {
    Icon,
    ProgressLinear,
    Btn,
    Dropdown
  },
  setup () {
    const style = useCssModule()
    const store = useStore<GlobalStore>()
    const volume = computed(() => {
      return store.state.volume
    })
    const muted = computed(() => {
      return store.state.muted
    })
    const track = computed(() => {
      return store.state.track
    })
    const globalPaused = computed(() => {
      return store.state.paused
    })
    const globalCurrent = computed(() => {
      return store.state.currentTime
    })

    const play = () => {
      store.commit(globalPaused.value ? 'play' : 'pause')
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
      changeMuted
    }
  }
})
</script>

<style lang="scss" module>
.enter-active {
  transition: all 0.3s ease-out;
}

.enter-from {
  transform: translateY(var(--bottomspace));
}

.container {
  position: fixed;
  bottom: 0;
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
  }

  &-img {
    position: relative;
    height: inherit;
    cursor: pointer;
    border-radius: 4px;

    img {
      height: inherit;
      border-radius: inherit;
    }

    &:hover .iconshouqi {
      display: flex;
    }
  }

  .iconshouqi {
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
    display: inline-block;
    max-width: calc((100% - 20px) / 2);
    text-overflow: ellipsis;
    overflow: hidden;
  }

  :global(.breadcrumb) {
    color: var(--grey);
  }
}

.center {
  justify-content: center;

  .iconplay:global(.icon) {
    font-size: 50px;
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

  :global(.icon) {
    font-size: 25px;
    cursor: pointer;
  }
}

.iconxiayishou,
.iconshangyishou {
  color: var(--main-color);
}

.time {
  font-family: var(--monospaced);
  color: var(--lightgrey);
}

.volume-number {
  text-align: center;
  font-size: 12px;
  width: 20px;
}
</style>
