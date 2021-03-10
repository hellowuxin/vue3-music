<template>
  <button :class="containerClass" @click="createRipple" ref="btnEle">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { createRipple } from '@/tools'
import { defineComponent, useCssModule } from 'vue'

export default defineComponent({
  name: 'Btn',
  props: {
    icon: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const style = useCssModule()
    let containerClass = style.container

    if (props.rounded) {
      containerClass = style['container-rounded']
    } else if (props.icon) {
      containerClass = style['container-icon']
    }

    return {
      style,
      createRipple,
      containerClass
    }
  }
})
</script>

<style lang="scss" module>
.container,
.container-icon,
.container-rounded {
  display: flex;
  align-items: center;
  gap: 3px;
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  border-color: #D9D9D9;
  padding: 3px 10px;
  background-color: white;
  cursor: pointer;
  color: inherit;
  overflow: hidden;
  position: relative;
}

.container-rounded {
  border-radius: 28px;
}

.container-icon {
  padding: 5px;
  border-style: none;
  background-color: transparent;
  border-radius: 50%;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: currentColor;
    opacity: 0;
    transition: opacity .2s cubic-bezier(.4,0,.6,1);
  }

  &:hover::before {
    opacity: 0.24;
  }
}
</style>
