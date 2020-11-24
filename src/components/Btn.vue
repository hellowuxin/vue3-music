<template>
  <button :class="style['container']">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, useCssModule } from 'vue'

export default defineComponent({
  name: 'Btn',
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
  align-items: center;
  gap: 3px;
  border-radius: 28px;
  border-style: solid;
  border-width: 1px;
  border-color: #D9D9D9;
  padding: 3px 10px;
  background-color: white;

  &:hover {
    cursor: pointer;
  }
}
</style>
