<template>
  <div :class="style['container']" v-if="playlist">
    <div :class="style['header']">
      <img :src="playlist.coverImgUrl" alt="">
      <div :class="style['header-content']">
        <div :class="style['title']">
          <span :class="style['tag']">歌单</span>
          <h2>{{ playlist.name }}</h2>
        </div>
        <p>
          <span>{{ playlist.creator.nickname }}</span>
          <span>{{ new Date(playlist.createTime).toLocaleDateString('en-CA') }}创建</span>
        </p>
        <div>
          <button>播放全部</button>
          <button>收藏</button>
          <button>分享</button>
          <button>下载全部</button>
        </div>
        <p>
          <span>标 签：</span>
          <span v-for="(tag, index) in playlist.tags" :key="index">{{tag}}</span>
        </p>
        <p>
          <span>歌曲数：{{ playlist.trackCount }}</span>
          <span>播放数：{{ playlist.playCount }}</span>
        </p>
        <p v-html="`简介：${ playlist.description.replaceAll('\n', '<br>') }`"></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, useCssModule } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

interface Creator {
  nickname: string;
}
interface Playlist {
  name: string;
  coverImgUrl: string;
  creator: Creator;
  createTime: number;
  tags: string[];
  trackCount: number;
  playCount: number;
  description: string;
}

export default defineComponent({
  name: 'PlaylistView',
  setup () {
    const style = useCssModule()
    const route = useRoute()
    const playlist: Ref<Playlist | undefined> = ref()
    axios.get(`/playlist/detail?id=${route.query.id}`).then(({ data }) => {
      console.log(data.playlist)
      playlist.value = data.playlist
    })

    return {
      style,
      playlist
    }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flow-root;
}

.header {
  display: flex;
  margin: 20px 0;

  img {
    width: 300px;
    border-radius: 10px;
  }
}

.header-content {
  margin-left: 20px;

  .title {
    display: flex;
    align-items: center;

    .tag {
      color: red;
      border: 1px solid;
      border-radius: 4px;
      padding: 0 3px;
      font-size: smaller;
    }

    h2 {
      margin: 0;
    }
  }
}
</style>
