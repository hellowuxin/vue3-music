<template>
  <transition :enter-active-class="style['enter-active']" :enter-from-class="style['enter-from']">
    <div :class="style['container']" v-if="track">
      <div :class="style['progress']" @click="onProgressClick" ref="progressEle">
        <div :class="style['bar']" :style="{ transform: `scaleX(${globalCurrent / track.dt})` }" ref="barEle"></div>
        <div :class="style['thumb']" :style="{ transform: `translateX(${thumbEleX}px)` }"></div>
      </div>
      <div :class="style['content']">
        <div :class="style['left']">
          <img :src="`${track.al.picUrl}?param=60y60`" alt="">
          <div>
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
          <icon iconId="iconxunhuan"/>
          <icon iconId="iconbofangliebiao"/>
          <icon iconId="iconyinliang"/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, useCssModule, Ref, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { GlobalStore } from '@/store'
import Icon from './Icon.vue'
import { getTrackTime } from '@/tools'
import { emitter } from '@/components/MusicAudio.vue'

export default defineComponent({
  name: 'MusicBar',
  components: {
    Icon
  },
  setup () {
    const progressEle: Ref<HTMLDivElement | undefined> = ref()
    const barEle: Ref<HTMLDivElement | undefined> = ref()
    const style = useCssModule()
    const store = useStore<GlobalStore>()
    const thumbEleX = ref(0)

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
    const onBarChange = () => {
      if (barEle.value) {
        thumbEleX.value = barEle.value.getBoundingClientRect().width - 5
      }
    }
    const onProgressClick = (event: MouseEvent) => {
      if (progressEle.value) {
        const offset = progressEle.value.getBoundingClientRect()
        const left = event.clientX - offset.left

        emitter.emit('changeCurrentTime', left / progressEle.value.clientWidth)
      }
    }

    const ob = new MutationObserver(onBarChange)
    watch(barEle, (val) => {
      if (val) {
        ob.observe(val, { attributeFilter: ['style'] })
      }
    })

    return {
      style,
      track,
      getTrackTime,
      globalPaused,
      play,
      globalCurrent,
      barEle,
      thumbEleX,
      onProgressClick,
      progressEle
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

.progress {
  position: relative;
  height: 3px;
  background-color: #F4F4F4;
  display: flex;
  align-items: center;
  padding: 5px 0;
  cursor: pointer;
  background-clip: content-box;

  .bar {
    width: 100%;
    position: absolute;
    transform-origin: left;
    transform: scaleX(0);
    height: inherit;
    background-color: var(--main-color);
  }

  .thumb {
    display: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--main-color);
  }

  &:hover .thumb {
    display: block;
  }
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
  overflow: hidden;
}

.left {
  height: inherit;
  gap: 10px;

  > div {
    width: calc(100% - 50px - 10px);
  }

  img {
    height: inherit;
    border-radius: 4px;
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
}

.center {
  justify-content: center;
}

.right {
  justify-content: flex-end;
}

.center,
.right {
  align-items: center;
  font-size: 25px;

  :global(.icon) {
    cursor: pointer;
    margin: 0 10px;
  }
}

.iconplay {
  font-size: 50px;
  color: var(--main-color);
}

.iconxiayishou,
.iconshangyishou {
  color: var(--main-color);
}

.time {
  font-family: var(--monospaced);
}
</style>
