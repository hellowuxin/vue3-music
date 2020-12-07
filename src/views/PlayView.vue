<template>
  <div v-show="playView" v-if="track" :class="style['container']">
    <div :class="style['content']">
      <img :class="style['disc']" :src="track.al.picUrl" alt="">
      <div>
        <div :class="style['trackname']">{{ track.name }}</div>
        <div :class="style['track']">
          <span>专辑：{{ track.al.name }}</span>
          <div :class="style['track-ar']">
            <span>歌手：</span>
            <ul class="breadcrumb">
              <li v-for="ar in track.ar" :key="ar.id">
                <router-link to="#">{{ ar.name }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <commentlist v-if="commentResp" :commentResp="commentResp"></commentlist>
  </div>
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

    const playView = computed(() => {
      return store.state.playView
    })
    const track = computed(() => {
      return store.state.track
    })
    watch(() => store.state.track, (track) => {
      if (track) {
        // const { data } = await axios.get(`/lyric?id=${track.id}`)
        // console.log(data)
        axios.get(`/comment/music?id=${track.id}`).then(({ data }) => {
          commentResp.value = data
        })
      }
    })

    return {
      style,
      playView,
      track,
      commentResp
    }
  }
})
</script>

<style lang="scss" module>
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
}

.disc {
  width: 300px;
  border: 8px solid #F2F2F3;
}

.trackname {
  font-size: x-large;
}
.track {
  display: flex;
  gap: 20px;

  &-ar {
    display: flex;
  }
}
</style>
