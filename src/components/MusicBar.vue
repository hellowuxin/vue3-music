<template>
  <div class="music-bar">
    <div class="bar-start">
      <img src="http://p1.music.126.net/BPaZelNOF3p2Ov2zkSlq0A==/2528876745087477.jpg?param=177y177" alt="">
      <div class="bar-start-content">
        <div>As The Deer</div>
        <div>00:33 / 05:01</div>
      </div>
    </div>
    <div class="bar-center">
      <icon iconId="iconaixin"/>
      <icon iconId="iconshangyishou"/>
      <icon iconId="iconplay"/>
      <icon iconId="iconxiayishou"/>
      <icon iconId="iconfenxiang"/>
    </div>
    <div class="bar-end">
      <icon iconId="iconxunhuan"/>
      <icon iconId="iconbofangliebiao"/>
      <icon iconId="iconyinliang"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from './Icon.vue'

export default defineComponent({
  name: 'MusicBar',
  components: {
    Icon
  }
})
</script>

<style lang="scss">
.music-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding: 10px;
  border-width: 3px 0 0 0;
  border-color: #D33A31;
  border-style: solid;
  color: #4C4C4C;

  .bar-start {
    display: flex;
    height: inherit;

    img {
      height: inherit;
      border-radius: 4px;
    }

    .bar-start-content {
      padding: 0 10px;
    }
  }

  .bar-center, .bar-end {
    display: flex;
    align-items: center;
    font-size: 22px;

    .icon {
      margin: 0 10px;
    }

    .iconplay {
      padding: 10px;
      border-radius: 50%;
      color: white;
      background-color:  #D33A31;
    }

    .iconxiayishou,
    .iconshangyishou {
      color: #D33A31;
    }
  }
}
</style>
