<template>
  <div :class="style['container']">
    DiscoverToplistView
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, useCssModule } from 'vue'

export default defineComponent({
  name: 'DiscoverToplistView',
  setup () {
    const style = useCssModule()

    return {
      style
    }
  }
})
</script>

<style lang="scss" module>
</style>
