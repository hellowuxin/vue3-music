<template>
  <global-header></global-header>
  <div class="global-container">
    <router-view></router-view>
  </div>
  <play-view></play-view>
  <music-bar></music-bar>
  <music-audio></music-audio>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GlobalHeader from './components/GlobalHeader.vue'
import MusicBar from './components/MusicBar.vue'
import MusicAudio from './components/MusicAudio.vue'
import PlayView from './views/PlayView.vue'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    MusicBar,
    MusicAudio,
    PlayView
  }
})
</script>

<style lang="scss">
.slideInUp{
  &-enter-active {
    transition: all 0.3s ease-out;
  }
  &-enter-from {
    transform: translateY(100%);
  }
}

:root {
  --main-color: #D33A31;
  --lightgrey: #A6A6A7;
  --grey: #646464;
  --bluelink: #668DB9;
  --monospaced: Courier, monospace, 'Courier New';
  --topspace: 54px;
  --bottomspace: 73px;
  --shadow: 0 5px 5px -3px rgba(0,0,0,.2),
    0 8px 10px 1px rgba(0,0,0,.14),
    0 3px 14px 2px rgba(0,0,0,.12);
}

.grey {
  color: var(--grey)
}

.lightgrey {
  color: var(--lightgrey)
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
  color: inherit;
}

.global-container {
  margin: var(--topspace) 20px var(--bottomspace) 20px;
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

@keyframes rippleA {
  from {
    transform: scale(0.5);
    opacity: 0.5;
  }

  to {
    transform: scale(4);
    opacity: 0;
  }
}

.ripple {
  position: absolute;
  border-radius: 50%;
  animation: rippleA 0.6s linear forwards;
  background-color: currentColor;
}
</style>
