<template>
  <li :class="chipStyle" @click="ripple ? createRipple : ''">
    <slot></slot>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createRipple } from '@/tools'
import style from './Chip.module.scss'

export default defineComponent({
  name: 'Chip',
  props: {
    ripple: {
      type: Boolean,
      default: true
    },
    outline: Boolean,
    label: Boolean,
    small: Boolean
  },
  setup (props) {
    const chipStyle = [style.container]
    if (props.outline) {
      chipStyle.push(style.outline)
    }
    if (props.label) {
      chipStyle.push(style.label)
    }
    if (props.small) {
      chipStyle.push(style.small)
    }
    return {
      chipStyle,
      createRipple
    }
  }
})
</script>

<style>
@import './Chip.module.scss'
</style>
