<template>
  <div :class="style['container']">
    <slot name="activator" :on="{ mouseenter, mouseleave }"></slot>
    <div
      :class="style['content']"
      ref="contentEle"
      @transitionend="onTransitionEnd"
      @mouseleave="mouseleave"
      @mouseenter="mouseenter"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { debounce, reflow } from '@/tools'
import { defineComponent, Ref, useCssModule, ref, watch } from 'vue'

export default defineComponent({
  name: 'Dropdown',
  setup () {
    const style = useCssModule()
    const contentEle: Ref<HTMLDivElement | undefined> = ref()
    const isActive = ref(false)

    watch(isActive, debounce((val) => {
      const target = contentEle.value
      if (target) {
        if (val) {
          if (!target.classList.contains(style['content-active']) ||
          target.classList.contains(style.fade)) {
            target.classList.add(style['content-active'])
            target.classList.add(style.fade)
            reflow(target)
            target.classList.remove(style.fade)
          }
        } else {
          target.classList.add(style.fade)
        }
      }
    }))

    const mouseenter = () => {
      if (!isActive.value) {
        isActive.value = true
      }
    }
    const mouseleave = () => {
      if (isActive.value) {
        isActive.value = false
      }
    }
    const onTransitionEnd = () => {
      const target = contentEle.value
      if (target && !isActive.value) {
        target.classList.remove(style['content-active'], style.fade)
      }
    }

    return {
      style,
      mouseenter,
      contentEle,
      mouseleave,
      onTransitionEnd
    }
  }
})
</script>

<style lang="scss" module>
.container {
  position: relative;
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
  opacity: 1;
  transition: all .3s ease;

  &-active {
    display: flex;
  }
}

.fade {
  opacity: 0;
}
</style>
