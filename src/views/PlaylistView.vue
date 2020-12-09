<template>
  <div :class="style['container']" v-if="playlist">
    <playlist-header :playlist="playlist"></playlist-header>
    <div :class="style['content']">
      <tabs v-model="activeTab">
        <li>歌曲列表</li>
        <li>
          <span>评论</span>
          <span :class="style['commentcount']">({{ playlist.commentCount }})</span>
        </li>
        <li>收藏者</li>
      </tabs>
      <tabs-items v-model="activeTab">
        <tab-item><songlist :tracks="playlist.tracks"></songlist></tab-item>
        <tab-item><commentlist v-if="commentResp" :commentResp="commentResp"></commentlist></tab-item>
        <tab-item><subscriberlist :subscribers="playlist.subscribers"></subscriberlist></tab-item>
      </tabs-items>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, useCssModule } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { Playlist, CommentResp } from '../interface'
import { Tabs, TabsItems, TabItem } from '@/components/Tabs'
import Songlist from '../components/Songlist.vue'
import Commentlist from '../components/Commentlist.vue'
import PlaylistHeader from '../components/PlaylistHeader.vue'
import Subscriberlist from '@/components/Subscriberlist.vue'

export default defineComponent({
  name: 'PlaylistView',
  components: {
    Tabs,
    TabsItems,
    Songlist,
    TabItem,
    Commentlist,
    PlaylistHeader,
    Subscriberlist
  },
  setup () {
    const style = useCssModule()
    const route = useRoute()
    const playlist: Ref<Playlist | undefined> = ref()
    const commentResp: Ref<CommentResp | undefined> = ref()
    const activeTab = ref(0)

    axios.get(`/playlist/detail?id=${route.query.id}`).then(({ data }) => {
      playlist.value = data.playlist
      console.log(data.playlist)
    })
    axios.get(`/comment/playlist?id=${route.query.id}`).then(({ data }) => {
      commentResp.value = data
    })

    return {
      style,
      playlist,
      activeTab,
      commentResp
    }
  }
})
</script>

<style lang="scss" module>
@keyframes close {
  from {
    -webkit-line-clamp: initial;
  }

  to {
    -webkit-line-clamp: 3;
  }
}

@keyframes open {
  from {
    -webkit-line-clamp: 3;
  }

  to {
    -webkit-line-clamp: initial;
  }
}

.container {
  display: flow-root;
}

.content {
  display: flow-root;
  margin-top: 20px;
}

.commentcount {
  font-size: small;
}
</style>
