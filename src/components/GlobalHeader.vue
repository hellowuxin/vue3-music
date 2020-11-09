<template>
  <nav>
    <div class="container">
      <ul class="nav-ul">
        <li class="nav-li"><a class="active" href="#">个性推荐</a></li>
        <li class="nav-li"><a href="#">歌单</a></li>
        <li class="nav-li"><a href="#">主播电台</a></li>
        <li class="nav-li"><a href="#">排行榜</a></li>
        <li class="nav-li"><a href="#">歌手</a></li>
        <li class="nav-li"><a href="#">最新音乐</a></li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GlobalHeader'
})
</script>

<style lang="scss">
$black: #000;

nav {
  background-color: #F9F9F9;
}

.container {
  display: flex;
  padding: 0 calc(1.5rem / 2);
}

.nav-ul {
  flex: auto;
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0;
}

.nav-li {
  a {
    color: rgba($black, .55);
    text-decoration: none;

    &.active {
      color: $black;
    }

    &:hover {
      color: $black;
    }
  }
}
</style>
