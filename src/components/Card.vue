<template>
  <div :class="style['container']">
    <div :class="style['content']">
      <span :class="style['play-count']" v-if="playCount">
        <icon iconId="iconplay1"/>
        <span>{{ Math.floor(playCount / 10000) }}万</span>
      </span>
      <icon iconId="iconplay" :class="style['iconplay']" @click.stop="clickPlay"/>
      <img :src="imgSrc"/>
    </div>
    <span :class="style['title']">{{ title }}</span>
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
    playCount: Number
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
</style>
