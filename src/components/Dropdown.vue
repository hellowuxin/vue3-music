<template>
  <div :class="style['container']" ref="containerEle" v-click-outside="temp">
    <slot name="activator" :on="onEvent"></slot>
    <transition name="fade">
      <div
        v-show="isActive"
        :class="contentStyle"
        v-on="hover ? onEvent : {}"
      >
        <slot :close="close"></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, useCssModule, ref, Ref, computed } from 'vue'
import ClickOutside from '@/directives/ClickOutside'

export default defineComponent({
  name: 'Dropdown',
  directives: {
    ClickOutside
  },
  props: {
    offsetY: Boolean,
    hover: Boolean,
    left: Boolean,
    right: Boolean,
    top: Boolean
  },
  setup (props) {
    const style = useCssModule()
    const containerEle: Ref<HTMLDivElement | undefined> = ref()
    const isActive = ref(false)

    const contentStyle = computed(() => {
      const temp = [style.content]
      if (props.offsetY) {
        temp.push(style['offset-y'])
      }
      if (props.left) {
        temp.push(style.left)
      }
      if (props.right) {
        temp.push(style.right)
      }
      if (props.top) {
        temp.push(style.top)
      }
      return temp
    })

    const open = () => { isActive.value = true }
    const close = () => { isActive.value = false }
    const click = open
    const mouseenter = open
    const mouseleave = (e: MouseEvent) => {
      if (containerEle.value?.contains(e.relatedTarget as Node)) {
        return
      }
      close()
    }
    const onEvent = computed(() => {
      if (props.hover) {
        return { mouseenter, mouseleave }
      }
      return { click }
    })

    const temp = props.hover
      ? false
      : {
          handler: close,
          closeConditional: () => isActive.value && !props.hover,
          include: () => [containerEle.value]
        }
    return {
      style,
      mouseenter,
      mouseleave,
      isActive,
      contentStyle,
      containerEle,
      onEvent,
      temp,
      close
    }
  }
})
</script>

<style lang="scss" module>
.container {
  position: relative;
}

.content {
  display: flex;
  justify-content: center;
  background-color: white;
  border-radius: 4px;
  box-shadow: var(--shadow);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.offset-y {
  bottom: 100%;
}

.left {
  right: 0;
  left: auto;
  transform: none;
}

.right {
  left: 0;
  transform: none;
}

.top {
  top: 0;
}
</style>
