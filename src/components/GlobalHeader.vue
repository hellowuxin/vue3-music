<template>
  <nav :class="style['container']">
    <ul :class="style['nav']">
      <router-link
        v-for="[path, text] in navItems"
        :key="path"
        :class="[style['nav-item'], activeItem === path ? style['active'] : '']"
        :to="path"
      >{{ text }}</router-link>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, useCssModule, watch } from 'vue'
import { useRoute } from 'vue-router'

const navItems = new Map<string, string>()
navItems.set('/discover', '个性推荐')
navItems.set('/discover/playlist', '歌单')
navItems.set('/discover/djradio', '主播电台')
navItems.set('/discover/toplist', '排行榜')
navItems.set('/discover/artist', '歌手')
navItems.set('/discover/album', '最新音乐')

export default defineComponent({
  name: 'GlobalHeader',
  setup () {
    const style = useCssModule()
    const route = useRoute()
    const activeItem = ref('/')

    watch(() => route.path, (val) => {
      activeItem.value = val
    })

    return {
      style,
      activeItem,
      navItems
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
