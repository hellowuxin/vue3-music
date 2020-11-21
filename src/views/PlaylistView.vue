<template>
  <div :class="style['container']" v-if="playlist">
    <div :class="style['header']">
      <img :src="playlist.coverImgUrl" alt="">
      <div :class="style['header-content']">
        <div :class="style['title']">
          <span>歌单</span>
          <h2>{{ playlist.name }}</h2>
        </div>
        <p :class="style['creator']">
          <img :src="playlist.creator.avatarUrl" alt="">
          <router-link to="#">{{ playlist.creator.nickname }}</router-link>
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
        <p :class="style['tags']">
          <span>标&emsp;签：</span>
          <ul :class="style['breadcrumb']">
            <li v-for="(tag, index) in playlist.tags" :key="index">
              <router-link to="#">{{ tag }}</router-link>
            </li>
          </ul>
        </p>
        <p :class="style['count']">
          <span>
            <span>歌曲数：</span>
            <span :class="style['grey']">{{ playlist.trackCount }}</span>
          </span>
          <span>
            <span>播放数：</span>
            <span :class="style['grey']">{{ playlist.playCount }}</span>
          </span>
        </p>
        <p :class="style['introduction']" ref="introEle">
          <span>简&emsp;介：</span>
          <span
            v-html="playlist.description.replaceAll('\n', '<br>')"
            :class="style['description']"
            ref="descEle"
          ></span>
          <span v-show="isVisible" :class="style['dropdown']" @click="dropdown"></span>
        </p>
      </div>
    </div>
    <div :class="style['content']">
      <nav>
        <ul>
          <li :class="style['active']">歌曲列表</li>
          <li>
            <span>评论</span>
            <span :class="style['commentcount']">({{ playlist.commentCount }})</span>
          </li>
          <li>收藏者</li>
        </ul>
      </nav>
      <table :class="style['songlist']">
        <colgroup>
          <col>
          <col>
          <col>
          <col>
          <col>
        </colgroup>
        <thead>
          <tr>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(track, index) in playlist.tracks" :key="track.id">
            <td :class="style['serial']">
              <span>{{ `${Math.floor((index+1)/10)}${((index+1)%10)}` }}</span>
              <icon iconId="iconaixin"></icon>
              <icon iconId="icondownload"></icon>
            </td>
            <td :class="style['songtitle']">
              <span>{{ track.name }}</span>
              <icon v-if="track.mv" iconId="iconvideo"></icon>
            </td>
            <td>
              <ul :class="style['breadcrumb']">
                <li v-for="ar in track.ar" :key="ar.id">
                  <router-link to="#">{{ ar.name }}</router-link>
                </li>
              </ul>
            </td>
            <td>{{ track.al.name }}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUpdated, Ref, ref, useCssModule } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import Icon from '../components/Icon.vue'

interface Creator {
  nickname: string
  avatarUrl: string
}
interface Artist {
  id: number
  name: string
}
interface Album {
  id: number
  name: string
}
interface Track {
  name: string
  id: number
  ar: Artist[]
  al: Album
  mv: number
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
  tracks: Track[]
  commentCount: number
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
    const introEle: Ref<HTMLParagraphElement | undefined> = ref()
    const descEle: Ref<HTMLSpanElement | undefined> = ref()
    const isVisible = ref(true)

    axios.get(`/playlist/detail?id=${route.query.id}`).then(({ data }) => {
      console.log(data.playlist)
      playlist.value = data.playlist
    })

    const dropdown = () => {
      if (introEle.value) {
        if (introEle.value.classList.contains(style.unfold)) {
          introEle.value.classList.remove(style.unfold)
        } else {
          introEle.value.classList.add(style.unfold)
        }
      }
    }

    onUpdated(() => {
      if (descEle.value) {
        isVisible.value = descEle.value.scrollHeight > 90
      }
    })

    return {
      style,
      playlist,
      dropdown,
      introEle,
      isVisible,
      descEle
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

a {
  color: #668DB9;
}

p {
  margin: 0;
}

.grey {
  color: var(--grey);
}

.container {
  display: flow-root;
}

.header {
  display: flex;
  align-items: start;
  font-size: small;

  img {
    flex-shrink: 0;
    width: 250px;
    border-radius: 10px;
  }
}

.header-content {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 13px;
  width: 100%;
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
  flex-wrap: wrap;
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

.tags {
  display: flex;
}

.breadcrumb {
  display: flex;
  margin: 0;

  li:not(:first-child):before {
    content: '/';
    padding: 0 3px;
  }
}

.count {
  display: flex;
  gap: 20px;
}

.introduction {
  position: relative;
  overflow: hidden;
  max-height: 54px;
  transition: max-height 0.3s linear;

  .description {
    color: var(--grey);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-indent: 4em;
    margin-top: -18px;
    animation: close 0s linear 0.3s forwards;
  }

  .dropdown {
    position: absolute;
    top: calc(18px * 2.5);
    right: 0;
    border: 6px solid transparent;
    border-top-color: var(--grey);
    cursor: pointer;
    transform-origin: 50% 25%;
  }

  &.unfold {
    max-height: 100rem;

    .description {
      animation: open 0s linear forwards;
    }

    .dropdown {
      transform: rotate(180deg);
    }
  }
}

.content {
  display: flow-root;
  color: var(--grey);
  margin-top: 20px;

  nav {
    display: flow-root;
  }

  nav ul {
    display: flex;
    gap: 30px;
    margin: 0;
  }

  nav li {
    padding: 5px 0;
  }
}

.commentcount {
  font-size: small;
}

.songlist {
  width: 100%;

  :global(.icon) {
    font-size: x-large;
  }

  colgroup col:first-child,
  colgroup col:last-child {
    width: min-content;
  }

  th {
    text-align: start;
    font-weight: normal;
    white-space: nowrap;
  }

  tbody tr:nth-child(odd) {
    background-color: #FAFAFA;
  }

  td,
  th {
    border-collapse: collapse;
    border: 5px solid transparent;
  }
}

.serial {
  display: flex;
  gap: 5px;
  align-items: center;
  font-family: Courier, monospace, 'Courier New';

  span {
    margin-right: 10px;
  }
}

.songtitle {
  color: black;

  span {
    margin-right: 5px;
  }

  :global(.icon) {
    font-size: large;
    color: var(--main-color);
  }
}
</style>
