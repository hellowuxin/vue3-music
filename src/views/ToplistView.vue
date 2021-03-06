<template>
  <div :class="style['container']">
    ToplistView
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, useCssModule } from 'vue'

export default defineComponent({
  name: 'ToplistView',
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
