<template>
  <nav :class="style['container']">
    <ul :class="style['nav']">
      <router-link :class="[style['nav-item'], style['active']]" to="/">个性推荐</router-link>
      <router-link :class="style['nav-item']" to="/">歌单</router-link>
      <router-link :class="style['nav-item']" to="/">主播电台</router-link>
      <router-link :class="style['nav-item']" to="/">排行榜</router-link>
      <router-link :class="style['nav-item']" to="/artist">歌手</router-link>
      <router-link :class="style['nav-item']" to="/">最新音乐</router-link>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, useCssModule } from 'vue'

export default defineComponent({
  name: 'GlobalHeader',
  setup () {
    const style = useCssModule()

    return {
      style
    }
  }
})
</script>

<style lang="scss" module>
$black: #000;

.container {
  z-index: 2;
  background-color: rgba(#F6F6F6, .9);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding-left: var(--leftspace);
}

.nav {
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin: 16px 20px;
  padding: 0;
}

.nav-item {
  color: rgba($black, .55);

  &.active {
    color: $black;
  }

  &:hover {
    color: $black;
  }
}
</style>
