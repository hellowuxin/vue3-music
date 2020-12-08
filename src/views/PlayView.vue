<template>
  <transition
    :enter-from-class="style['enter-from']"
    :enter-active-class="style['enter-active']"
    :leave-active-class="style['enter-active']"
    :leave-to-class="style['enter-from']"
  >
    <div v-show="playView" v-if="track" :class="style['container']">
      <div :class="style['content']">
        <div :class="style['disc']">
          <img :src="track.al.picUrl" alt="">
        </div>
        <div :class="style['main']">
          <div :class="style['track-name']">
            <h2>{{ track.name }}</h2>
            <span>标准音质</span>
          </div>
          <div :class="style['info']">
            <span>
              <span>专辑：</span>
              <router-link to="#">{{ track.al.name }}</router-link>
            </span>
            <div :class="style['track-ar']">
              <span>歌手：</span>
              <ul class="breadcrumb">
                <li v-for="ar in track.ar" :key="ar.id">
                  <router-link to="#">{{ ar.name }}</router-link>
                </li>
              </ul>
            </div>
          </div>
          <div :class="style['lyrics']">
            <div :class="style['lyrics-content']" ref="lyricsEle" v-if="lrcArr">
              <p
                v-for="(row, index) in lrcArr"
                :key="index"
                :class="index === focuslyrics ? style['lyrics-focus'] : ''"
              >{{ row[1] }}</p>
            </div>
            <hr :class="style['divider']">
          </div>
        </div>
      </div>
      <commentlist v-if="commentResp" :commentResp="commentResp"></commentlist>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, useCssModule, watch, Ref, ref } from 'vue'
import { useStore } from 'vuex'
import { GlobalStore } from '@/store'
import axios from 'axios'
import Commentlist from '@/components/Commentlist.vue'
import { CommentResp } from '@/interface'

type lyric = (number | undefined | string)[]

export default defineComponent({
  name: 'PlayView',
  components: {
    Commentlist
  },
  setup () {
    const style = useCssModule()
    const store = useStore<GlobalStore>()
    const commentResp: Ref<CommentResp | undefined> = ref()
    const lrcArr: Ref<lyric[] | undefined> = ref()
    const focuslyrics = ref(0)
    const lyricsEle: Ref<HTMLDivElement | undefined> = ref()

    const playView = computed(() => store.state.playView)
    const track = computed(() => store.state.track)
    const currentTime = computed(() => store.state.currentTime)

    const toTime = (str: string) => {
      const arr = str.split(':')
      return (parseInt(arr[0], 10) * 60 + parseInt(arr[1], 10)) * 1000
    }
    const reg = /(?:\[(.*)])?(.*)/
    const lrcToObj = (lrc: string) => {
      const arr = lrc.split('\n').slice(0, -1).map((s: string) => {
        return reg.exec(s) || [s, undefined, s]
      })
      const res = arr.map((a) => {
        return [a[1] ? toTime(a[1]) : undefined, a[2]]
      })

      return res
    }

    watch(() => store.state.track, (track) => {
      if (track) {
        axios.get(`/lyric?id=${track.id}`).then(({ data }) => {
          lrcArr.value = lrcToObj(data.lrc.lyric)
        })
        axios.get(`/comment/music?id=${track.id}`).then(({ data }) => {
          commentResp.value = data
        })
      }
    })
    watch(() => store.state.currentTime, (current) => {
      let flag = false
      if (lrcArr.value) {
        while (focuslyrics.value > 0 &&
        (lrcArr.value[focuslyrics.value][0] || 0) > current) {
          focuslyrics.value = focuslyrics.value - 1
        }
        while (focuslyrics.value < lrcArr.value.length &&
        (lrcArr.value[focuslyrics.value][0] || 0) <= current) {
          focuslyrics.value = focuslyrics.value + 1
          flag = true
        }
        focuslyrics.value = focuslyrics.value - 1
      }

      if (lyricsEle.value && flag) {
        const children = lyricsEle.value.children
        const offsetTop = (children[focuslyrics.value - 1] as HTMLParagraphElement).offsetTop
        lyricsEle.value.scroll({
          top: offsetTop - lyricsEle.value.clientHeight / 2,
          behavior: 'smooth'
        })
      }
    })

    return {
      style,
      playView,
      track,
      commentResp,
      lrcArr,
      currentTime,
      focuslyrics,
      lyricsEle
    }
  }
})
</script>

<style lang="scss" module>
.enter-active {
  transition: all .4s ease;
}

.enter-from {
  transform: translateY(calc(100vh - var(--bottomspace)));
}

.container {
  background-color: #FBFAFB;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: var(--topspace) 20px var(--bottomspace) 20px;
  z-index: 6;
}

.content {
  display: flex;
  gap: 20px;
  height: 700px;

  .disc,
  .main {
    flex: 1;
    display: flex;
  }

  .disc {
    justify-content: center;
    align-items: center;
  }

  .disc img {
    width: 300px;
    height: 300px;
    border: 8px solid #F2F2F3;
    align-self: center;
  }

  .main {
    flex-direction: column;
    gap: 10px;
  }
}

.track-name {
  display: flex;
  align-items: center;
  gap: 10px;

  h2 {
    font-size: x-large;
    margin: 0;
    font-weight: normal;
  }

  span {
    color: var(--main-color);
    border: 1px solid;
    border-radius: 4px;
    padding: 0 5px;
  }
}

.info {
  display: flex;
  gap: 20px;
  color: var(--grey);

  .track-ar {
    display: flex;
  }

  a {
    color: var(--bluelink);
  }
}

.lyrics {
  color: var(--grey);
  display: flex;
  overflow: hidden;
  position: relative;

  &-content {
    width: 100%;
    overflow: scroll;
  }

  &-focus {
    color: black;
  }
}

.divider {
  border: solid;
  border-width: 0 thin 0 0;
  margin: 0;
  border-color: #EEEDEE;
}
</style>
