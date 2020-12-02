<template>
  <transition :enter-active-class="style['enter-active']" :enter-from-class="style['enter-from']">
    <div :class="style['container']" v-if="track">
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
          <div>00:00 / {{ getTrackTime(track.dt) }}</div>
        </div>
      </div>
      <div :class="style['center']">
        <icon iconId="iconaixin"/>
        <icon iconId="iconshangyishou" :class="style['iconshangyishou']"/>
        <icon :iconId="playing ? 'iconplay_pause' : 'iconplay_go'" :class="style['iconplay']" @click="play"/>
        <icon iconId="iconxiayishou" :class="style['iconxiayishou']"/>
        <icon iconId="iconfenxiang"/>
      </div>
      <div :class="style['right']">
        <icon iconId="iconxunhuan"/>
        <icon iconId="iconbofangliebiao"/>
        <icon iconId="iconyinliang"/>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, useCssModule } from 'vue'
import { useStore } from 'vuex'
import { StoreData } from '@/store'
import Icon from './Icon.vue'
import { getTrackTime } from '@/tools'

export default defineComponent({
  name: 'MusicBar',
  components: {
    Icon
  },
  setup () {
    const style = useCssModule()
    const store = useStore<StoreData>()
    const track = computed(() => {
      return store.state.track
    })
    const playing = computed(() => {
      return store.state.playing
    })
    const play = () => {
      store.commit('play')
    }

    return {
      style,
      track,
      getTrackTime,
      playing,
      play
    }
  }
})
</script>

<style lang="scss" module>
.enter-active {
  transition: all 0.3s ease-out;
}

.enter-from {
  transform: translateY(73px);
}

.container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  display: flex;
  height: 50px;
  padding: 10px;
  border-width: 3px 0 0 0;
  border-color: var(--main-color);
  border-style: solid;
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
</style>
