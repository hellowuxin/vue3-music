<template>
  <div :class="style['container']">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, useCssModule } from 'vue'

export default defineComponent({
  name: 'TabsItems',
  setup () {
    const style = useCssModule()

    return {
      style
    }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
}
</style>
