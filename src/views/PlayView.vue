<template>
  <transition name="slideInUp">
    <div v-show="playView" :class="style['container']">
      <div>
        <div>图片</div>
        <div>歌词</div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, useCssModule } from 'vue'
import { useStore } from 'vuex'
import { GlobalStore } from '@/store'

export default defineComponent({
  name: 'PlayView',
  setup () {
    const style = useCssModule()
    const store = useStore<GlobalStore>()

    const playView = computed(() => {
      return store.state.playView
    })

    return {
      style,
      playView
    }
  }
})
</script>

<style lang="scss" module>
.container {
  background-color: lawngreen;
}
</style>
