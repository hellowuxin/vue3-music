<template>
  <div :class="style['container']" @click="createRipple">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, useCssModule } from 'vue'
import { createRipple } from '@/tools'

export default defineComponent({
  name: 'TabsItems',
  setup () {
    const style = useCssModule()

    return {
      style,
      createRipple
    }
  }
})
</script>

<style lang="scss" module>
.container {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
    background-color: currentColor;
    border-radius: inherit;
  }

  &:hover::before {
    opacity: 0.04;
  }
}
</style>
