<template>
  <div :class="style['container']" v-if="playlist">
    <div :class="style['header']">
      <img :src="playlist.coverImgUrl" alt="">
      <div :class="style['content']">
        <div :class="style['title']">
          <span>歌单</span>
          <h2>{{ playlist.name }}</h2>
        </div>
        <p :class="style['creator']">
          <img :src="playlist.creator.avatarUrl" alt="">
          <span>{{ playlist.creator.nickname }}</span>
          <span>{{ new Date(playlist.createTime).toLocaleDateString('en-CA') }}创建</span>
        </p>
        <div :class="style['actions']">
          <div :class="style['compose']">
            <button :class="style['play']">
              <icon iconId="iconplay3"></icon>
              <span>播放全部</span>
            </button>
            <div :class="style['gap']"></div>
            <button :class="style['add-play']">
              <icon iconId="iconicon-test"></icon>
            </button>
          </div>
          <button>
            <icon iconId="iconAddadocument"></icon>
            <span>收藏({{ playlist.subscribedCount }})</span>
          </button>
          <button>
            <icon iconId="iconfenxiang"></icon>
            <span>分享({{ playlist.shareCount }})</span>
          </button>
          <button>
            <icon iconId="icondownload"></icon>
            <span>下载全部</span>
          </button>
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
import Icon from '../components/Icon.vue'

interface Creator {
  nickname: string
  avatarUrl: string
}
interface Playlist {
  name: string
  coverImgUrl: string
  creator: Creator
  createTime: number
  tags: string[]
  trackCount: number
  playCount: number
  description: string
  shareCount: number
  subscribedCount: number
}

export default defineComponent({
  name: 'PlaylistView',
  components: {
    Icon
  },
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
  align-items: flex-start;
  font-size: small;

  img {
    width: 300px;
    border-radius: 10px;
  }

  .content {
    margin-left: 20px;
  }
}

.title {
  display: flex;

  span {
    color: var(--main-color);
    border: 1px solid;
    border-radius: 4px;
    padding: 0 5px;
    margin: 6px 0;
    height: min-content;
    flex-shrink: 0;
  }

  h2 {
    margin: 0 0 0 10px;
    font-weight: normal;
    font-size: x-large;
  }
}

.creator {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--grey);

  img {
    width: 30px;
    border-radius: 50%;
  }
}

.actions {
  display: flex;
  gap: 10px;

  :global(.icon) {
    font-size: x-large;
  }

  .compose {
    display: flex;

    .gap {
      width: 1px;
      background-color: #E1554B;
    }

    .play,
    .add-play {
      background-color: var(--main-color);
      color: white;
      border-color: var(--main-color);
    }

    .play {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    .add-play {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  button {
    display: flex;
    align-items: center;
    gap: 3px;
    border-radius: 28px;
    border-style: solid;
    border-width: 1px;
    border-color: #D9D9D9;
    padding: 3px 10px;
    background-color: white;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
