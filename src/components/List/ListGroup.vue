<template>
  <div :class="style['container']">
    <div :class="style['header']">
      <slot name="header"></slot>
    </div>
    <div :class="style['content']">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useCssModule } from 'vue'

export default defineComponent({
  name: 'ListGroup',
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

}

.header {
  font-size: small;
}
</style>
