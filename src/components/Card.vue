<template>
  <div :class="style['container']" :style="{ width }">
    <div :class="style['content']">
      <div v-if="label" :class="style['label']">
        <icon :icon-id="label" :class="style['label-content']"></icon>
        <div :class="style['triangle-topleft']"></div>
      </div>
      <span :class="style['play-count']" v-if="playCount">
        <icon icon-id="iconplay1"/>
        <span>{{ Math.floor(playCount / 10000) }}万</span>
      </span>
      <icon v-if="play" icon-id="iconplay" :class="style['iconplay']" @click.stop="clickPlay"/>
      <img :src="imgSrc"/>
      <span v-if="creator" :class="style['creator']">
        <icon icon-id="iconcontent_account"></icon>
        <span>{{ creator }}</span>
      </span>
    </div>
    <span v-if="title" :class="style['title']">{{ title }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, useCssModule } from 'vue'
import Icon from './Icon.vue'

export default defineComponent({
  name: 'Card',
  components: {
    Icon
  },
  props: {
    imgSrc: String,
    title: String,
    playCount: Number,
    play: Boolean,
    creator: String,
    label: String,
    width: String
  },
  emits: ['click-play'],
  setup (props, context) {
    const style = useCssModule()
    const clickPlay = () => {
      context.emit('click-play')
    }

    return {
      style,
      clickPlay
    }
  }
})
</script>

<style lang="scss" module>
.container {
  cursor: pointer;
}

.content {
  position: relative;
  width: inherit;

  img {
    display: block;
    border-radius: 4px;
    width: 100%;
  }

  &:hover .iconplay {
    opacity: 1;
  }
}

.play-count {
  position: absolute;
  right: 0;
  color: white;
  padding: 5px 10px;
  font-size: smaller;
}

.iconplay {
  opacity: 0;
  position: absolute;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  padding: 8px;
  margin: 10px;
  color: white;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(5px);
  transition: opacity .3s ease;
}

.title {
  display: block;
  margin: 5px 0;
  font-weight: 300;
}

.creator {
  position: absolute;
  left: 0;
  bottom: 0;
  color: white;
  padding: 5px 10px;
  font-size: small;
  display: flex;
  align-items: center;
  gap: 5px;
}

.label {
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 4px;
  z-index: 0;
  font-size: x-large;
  width: 32px;
  height: 32px;

  &-content {
    vertical-align: 0 !important;
    color: white;
    transform: rotate(-45deg);
  }

  .triangle-topleft {
    border-top-left-radius: inherit;
    width: 0;
    height: 0;
    border: 22px solid transparent;
    border-top-color: #F3B067;
    border-left-color: #F3B067;
    position: absolute;
    top: 0;
    z-index: -1;
  }
}
</style>
