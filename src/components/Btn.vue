<template>
  <button :class="icon ? style['container-icon'] : style['container']">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, useCssModule } from 'vue'

export default defineComponent({
  name: 'Btn',
  props: {
    icon: {
      type: Boolean,
      default: false
    }
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
.container,
.container-icon {
  display: flex;
  align-items: center;
  gap: 3px;
  border-radius: 28px;
  border-style: solid;
  border-width: 1px;
  border-color: #D9D9D9;
  padding: 3px 10px;
  background-color: white;
  cursor: pointer;
  color: inherit;
}

.container-icon {
  padding: 5px;
  border-style: none;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 50%;
    background-color: currentColor;
    opacity: 0;
    transition: opacity .2s cubic-bezier(.4,0,.6,1);
  }

  &:hover::before {
    opacity: 0.08;
  }
}
</style>
