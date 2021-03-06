<template>
  <div :class="style['container']">
    AlbumView
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, useCssModule } from 'vue'

export default defineComponent({
  name: 'AlbumView',
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
