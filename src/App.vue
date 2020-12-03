<template>
  <global-header></global-header>
  <div class="global-container">
    <router-view></router-view>
  </div>
  <music-bar></music-bar>
  <audio ref="audioEle"></audio>
</template>

<script lang="ts">
import { defineComponent, Ref, watch, ref } from 'vue'
import { useStore } from 'vuex'
import GlobalHeader from './components/GlobalHeader.vue'
import MusicBar from './components/MusicBar.vue'
import { GlobalStore } from './store'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    MusicBar
  },
  setup () {
    const audioEle: Ref<HTMLAudioElement | undefined> = ref()
    const store = useStore<GlobalStore>()
    watch(() => store.state.songUrl, (newVal) => {
      if (audioEle.value) {
        audioEle.value.src = newVal
        if (!store.state.paused) {
          audioEle.value.play()
        }
      }
    })
    watch(() => store.state.paused, (newVal) => {
      if (audioEle.value) {
        if (!newVal) {
          audioEle.value.play()
        } else {
          audioEle.value.pause()
        }
      }
    })
    // onMounted(() => {
    //   if (audioEle.value) {
    //     audioEle.value.addEventListener('loadstart', () => {
    //       console.log('audio loadstart')
    //     })
    //     audioEle.value.addEventListener('loadedmetadata', () => {
    //       console.log('audio loadedmetadata')
    //     })
    //     audioEle.value.addEventListener('loadeddata', () => {
    //       console.log('audio loadeddata')
    //     })
    //     audioEle.value.addEventListener('progress', () => {
    //       console.log('audio progress')
    //     })
    //     audioEle.value.addEventListener('canplay', () => {
    //       console.log('audio canplay')
    //     })
    //     audioEle.value.addEventListener('error', () => {
    //       console.log('audio error', audioEle.value?.error)
    //     })
    //   }
    // })

    return {
      audioEle
    }
  }
})
</script>

<style lang="scss">
:root {
  --main-color: #D33A31;
  --lightgrey: #A6A6A7;
  --grey: #646464;
  --blue: #668DB9;
  --monospaced: Courier, monospace, 'Courier New';
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
