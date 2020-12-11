<template>
  <teleport to="#overlay">
    <div :class="style['container']" v-show="visible">
      <div :class="style['overlay']"></div>
      <div :class="style['content']">
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, useCssModule } from 'vue'

export default defineComponent({
  name: 'Overlay',
  props: {
    visible: Boolean
  },
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
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
}

.overlay {
  opacity: 0.46;
  background-color: rgb(33, 33, 33);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.content {
  position: relative;
}
</style>
