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
            <div :class="style['lyrics-content']"><p v-for="row in lrcArr" :key="row[0]">{{ row[2] }}</p></div>
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

export default defineComponent({
  name: 'PlayView',
  components: {
    Commentlist
  },
  setup () {
    const style = useCssModule()
    const store = useStore<GlobalStore>()
    const commentResp: Ref<CommentResp | undefined> = ref()
    const lrcArr = ref()

    const playView = computed(() => store.state.playView)
    const track = computed(() => store.state.track)

    const reg = /(?:\[(.*)])?(.*)/
    const lrcToObj = (lrc: string) => {
      const res = lrc.split('\n').slice(0, -1).map((s: string) => {
        return reg.exec(s)
      })
      return res
    }

    watch(() => store.state.track, (track) => {
      if (track) {
        axios.get(`/lyric?id=${track.id}`).then(({ data }) => {
          console.log(data.lrc.lyric)
          lrcArr.value = lrcToObj(data.lrc.lyric)
          console.log(lrcArr.value)
        })
        axios.get(`/comment/music?id=${track.id}`).then(({ data }) => {
          commentResp.value = data
        })
      }
    })

    return {
      style,
      playView,
      track,
      commentResp,
      lrcArr
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

  &-content {
    width: 100%;
    overflow: scroll;
  }
}

.divider {
  border: solid;
  border-width: 0 thin 0 0;
  margin: 0;
  border-color: #EEEDEE;
}
</style>
