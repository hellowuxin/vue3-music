<template>
  <div :class="style['container']" :style="inlineStyle" ref="itemEle" @click="click">
    <img v-bind="$attrs">
    <span :class="style['label']" v-if="label">{{ label.title }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, Ref, ref } from 'vue'
import style from './CarouselItem.module.scss'

export default defineComponent({
  name: 'CarouselItem',
  inheritAttrs: false,
  props: {
    width: {
      type: Number,
      default: 642
    },
    label: Object as PropType<{ title: string, color: string }>
  },
  emits: ['click'],
  setup (props, context) {
    const itemEle: Ref<Element | undefined> = ref()
    const imgWidth = props.width + 'px'
    const inlineStyle = ref({
      width: `min(100%, ${imgWidth})`,
      margin: `0 max(0px, calc(100% - ${imgWidth}) / 2)`
    })

    const changeStyle = (mutationsList: MutationRecord[]) => {
      const { classList } = mutationsList[0].target as Element
      if (classList.contains(style.prev)) {
        inlineStyle.value.margin = `0 max(0px, calc(100% - ${imgWidth})) 0 0`
      } else if (classList.contains(style.next)) {
        inlineStyle.value.margin = `0 0 0 max(0px, calc(100% - ${imgWidth}))`
      } else {
        inlineStyle.value.margin = `0 max(0px, calc(100% - ${imgWidth}) / 2)`
      }
    }
    const click = () => {
      context.emit('click')
    }

    onMounted(() => {
      const observer = new MutationObserver(changeStyle)
      observer.observe(itemEle.value as Element, { attributes: true, attributeFilter: ['class'] })
    })

    return {
      style,
      itemEle,
      inlineStyle,
      click
    }
  }
})
</script>

<style>
@import './CarouselItem.module.scss'
</style>
