<template>
  <div :class="style['container']">
    <div :class="style['left']">
      <img src="http://p1.music.126.net/BPaZelNOF3p2Ov2zkSlq0A==/2528876745087477.jpg?param=177y177" alt="">
      <div :class="style['left-content']">
        <div>As The Deer</div>
        <div>00:33 / 05:01</div>
      </div>
    </div>
    <div :class="style['center']">
      <icon iconId="iconaixin"/>
      <icon iconId="iconshangyishou" :class="style['iconshangyishou']"/>
      <icon iconId="iconplay2" :class="style['iconplay']"/>
      <icon iconId="iconxiayishou" :class="style['iconxiayishou']"/>
      <icon iconId="iconfenxiang"/>
    </div>
    <div :class="style['right']">
      <icon iconId="iconxunhuan"/>
      <icon iconId="iconbofangliebiao"/>
      <icon iconId="iconyinliang"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useCssModule } from 'vue'
import Icon from './Icon.vue'

export default defineComponent({
  name: 'MusicBar',
  components: {
    Icon
  },
  setup () {
    const style = useCssModule()

    return {
      style
    }
  }
})
</script>

<style lang="scss" module>
$red: #D33A31;

.container {
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
  border-color: $red;
  border-style: solid;
  color: #4C4C4C;
}

.left {
  display: flex;
  height: inherit;

  img {
    height: inherit;
    border-radius: 4px;
  }
}

.left-content {
  padding: 0 10px;
}

.center,
.right {
  display: flex;
  align-items: center;
  font-size: 22px;

  :global(.icon) {
    margin: 0 10px;
  }
}

.iconplay {
  font-size: 40px;
  color: $red;
}

.iconxiayishou,
.iconshangyishou {
  color: $red;
}
</style>
