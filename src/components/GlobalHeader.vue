<template>
  <nav class="global-header">
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

.global-header {
  z-index: 5;
  background-color: rgba(white, .9);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  .container {
    display: flex;

    .nav-ul {
      flex: auto;
      display: flex;
      justify-content: space-between;
      list-style: none;
      padding: 0;

      .nav-li {
        a {
          color: rgba($black, .55);

          &.active {
            color: $black;
          }

          &:hover {
            color: $black;
          }
        }
      }
    }
  }
}
</style>
