<template>
  <global-header></global-header>
  <div class="global-container">
    <router-view></router-view>
  </div>
  <music-bar></music-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GlobalHeader from './components/GlobalHeader.vue'
import MusicBar from './components/MusicBar.vue'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    MusicBar
  }
})
</script>

<style lang="scss">
:root {
  --main-color: #D33A31;
  --grey: #797979;
  --monospaced: Courier, monospace, 'Courier New';
}

body {
  margin: 0;
}

.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

a {
  text-decoration: none;
}

.global-container {
  margin: 54px 20px 73px 20px;
  padding: 10px 0;
}

button {
  outline: none;
}

ol,
ul {
  list-style: none;
  padding: 0;
}

.breadcrumb {
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;

  li {
    display: inline;
  }

  li:not(:first-child):before {
    content: '/';
    padding: 0 3px;
  }
}
</style>
