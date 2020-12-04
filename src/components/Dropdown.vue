<template>
  <div :class="style['container']">
    <slot name="activator" :on="{ mouseenter }"></slot>
    <div :class="style['content']">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useCssModule } from 'vue'

export default defineComponent({
  name: 'Dropdown',
  setup () {
    const style = useCssModule()
    const mouseenter = () => {
      console.log(1)
    }
    return {
      style,
      mouseenter
    }
  }
})
</script>

<style lang="scss" module>
.container {
  position: relative;

  &:hover .content,
  .content:hover {
    display: flex;
  }
}

.content {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
  background-color: white;
  border-radius: 4px;
  display: none;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  box-shadow: var(--shadow);
}
</style>
