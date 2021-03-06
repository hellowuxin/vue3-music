<template>
  <li :class="style['container']" @click="createRipple">
    <slot></slot>
  </li>
</template>

<script lang="ts">
import { defineComponent, useCssModule } from 'vue'
import { createRipple } from '@/tools'
export default defineComponent({
  name: 'Chip',
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
  color: var(--darkgrey);
  padding: 3px 12px;
  border-radius: 13px;
  font-size: small;
  cursor: pointer;

  &::before {
    content: '';
    opacity: 0;
    background-color: currentColor;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: inherit;
    pointer-events: none;
  }

  &:hover::before {
    opacity: .04;
  }
}
</style>
