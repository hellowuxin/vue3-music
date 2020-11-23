<template>
  <div :class="style['container']">
    <img :src="playlist.coverImgUrl" alt="">
    <div :class="style['content']">
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
        <ul class="breadcrumb">
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
</template>

<script lang="ts">
import { defineComponent, useCssModule, Ref, ref, PropType, onMounted } from 'vue'
import { Playlist } from '../interface'
import Icon from './Icon.vue'

export default defineComponent({
  name: 'PlaylistHeader',
  components: {
    Icon
  },
  props: {
    playlist: {
      type: Object as PropType<Playlist>,
      required: true
    }
  },
  setup () {
    const style = useCssModule()
    const introEle: Ref<HTMLParagraphElement | undefined> = ref()
    const descEle: Ref<HTMLSpanElement | undefined> = ref()
    const isVisible = ref(true)

    const dropdown = () => {
      if (introEle.value) {
        if (introEle.value.classList.contains(style.unfold)) {
          introEle.value.classList.remove(style.unfold)
          introEle.value.style.maxHeight = ''
        } else {
          introEle.value.classList.add(style.unfold)
          introEle.value.style.maxHeight = `${descEle.value?.offsetHeight}px`
        }
      }
    }

    onMounted(() => {
      if (descEle.value) {
        isVisible.value = descEle.value.scrollHeight > 90
      }
    })

    return {
      style,
      introEle,
      descEle,
      isVisible,
      dropdown
    }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  align-items: start;
  font-size: small;

  img {
    flex-shrink: 0;
    width: 250px;
    border-radius: 10px;
  }

  a {
    color: #668DB9;
  }

  p {
    margin: 0;
  }
}

.content {
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

.count {
  display: flex;
  gap: 20px;
}

.introduction {
  position: relative;
  overflow: hidden;
  max-height: 54px;
  transition: max-height 0.3s ease;

  .description {
    color: var(--grey);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-indent: 4em;
    margin-top: -18px;
    animation: close 0s 0.3s forwards;
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

    .description {
      animation: open 0s forwards;
    }

    .dropdown {
      transform: rotate(180deg);
    }
  }
}
</style>
