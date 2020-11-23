<template>
  <div :class="style['container']" ref="tabsItemsEle" @transitionend="onTransitionEnd">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref, useCssModule, watch } from 'vue'
import reflow from '../tools/reflow'
import debounce from '../tools/debounce'

export default defineComponent({
  name: 'TabsItems',
  props: {
    modelValue: Number
  },
  setup (props) {
    const style = useCssModule()
    const tabsItemsEle: Ref<HTMLDivElement | undefined> = ref()
    let activeElement: HTMLElement | undefined,
      nextElement: HTMLElement | undefined,
      prevElement: HTMLElement | undefined

    const onTransitionEnd = debounce(() => {
      if (activeElement) {
        if (nextElement) {
          activeElement.classList.remove(style.active, style.left)
          nextElement.classList.remove(style.next, style.left)
          nextElement.classList.add(style.active)
          nextElement = undefined
        } else if (prevElement) {
          activeElement.classList.remove(style.active, style.right)
          prevElement.classList.remove(style.prev, style.right)
          prevElement.classList.add(style.active)
          prevElement = undefined
        }
        activeElement = undefined
      }
    })

    watch(() => props.modelValue, (val, oldVal) => {
      if (tabsItemsEle.value && val !== undefined && oldVal !== undefined) {
        const children = [...tabsItemsEle.value.children] as HTMLElement[]

        activeElement = children[oldVal]
        if (val > oldVal) {
          nextElement = children[val]
          activeElement.classList.add(style.left)
          nextElement.classList.add(style.next)
          reflow(nextElement)
          nextElement.classList.add(style.left)
        } else if (val < oldVal) {
          prevElement = children[val]
          activeElement.classList.add(style.right)
          prevElement.classList.add(style.prev)
          reflow(prevElement)
          prevElement.classList.add(style.right)
        }
      }
    })

    onMounted(() => {
      if (tabsItemsEle.value) {
        const children = [...tabsItemsEle.value.children] as HTMLElement[]

        children.forEach((element, index) => {
          if (index === props.modelValue) {
            element.classList.add(style.active)
          }
        })
      }
    })

    return {
      style,
      tabsItemsEle,
      onTransitionEnd
    }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  overflow: hidden;

  > div {
    flex-basis: 100%;
    flex-shrink: 0;
    display: none;
    transition: .3s ease;
    margin-right: -100%;

    &.active,
    &.next,
    &.prev {
      display: block;
    }

    &.active.left,
    &.prev:not(.right) {
      transform: translateX(-100%);
    }

    &.active.right,
    &.next:not(.left) {
      transform: translateX(100%);
    }
  }
}
</style>
