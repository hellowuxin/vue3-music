<template>
  <nav :class="style['container']">
    <ul ref="tabsEle" @click="catchLiClick">
      <slot></slot>
    </ul>
    <div :class="style['slider']" :style="sliderStyle"></div>
    <div :class="style['dividing-line']"></div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref, useCssModule } from 'vue'

export default defineComponent({
  name: 'Tabs',
  props: {
    modelValue: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:modelValue'],
  setup (props, context) {
    const tabsEle: Ref<HTMLUListElement | undefined> = ref()
    const sliderStyle = ref({ width: '', left: '0px' })
    const style = useCssModule()

    const catchLiClick = (e: MouseEvent) => {
      const currentTarget = e.currentTarget as HTMLUListElement
      const path = e.composedPath()
      const li = path[path.indexOf(currentTarget) - 1] as HTMLLIElement
      if (li) {
        createRipple(e, li)
        const oldActiveli = currentTarget.querySelector(`.${style.active}`)

        if (li !== oldActiveli) {
          context.emit('update:modelValue', [...currentTarget.children].indexOf(li))
          li.classList.add(style.active)
          oldActiveli?.classList.remove(style.active)
          sliderStyle.value.width = `${li.offsetWidth}px`
          sliderStyle.value.left = `${li.offsetLeft}px`
        }
      }
    }
    const createRipple = (event: MouseEvent, button: HTMLElement) => {
      const circle = document.createElement('span')
      const diameter = Math.max(button.clientWidth, button.clientHeight)
      const radius = diameter / 2
      const offset = button.getBoundingClientRect()

      circle.style.width = circle.style.height = `${diameter}px`
      circle.style.left = `${event.clientX - (offset.left + radius)}px`
      circle.style.top = `${event.clientY - (offset.top + radius)}px`
      circle.classList.add(style.ripple)
      button.appendChild(circle)

      setTimeout(() => {
        circle.remove()
      }, 600)
    }

    onMounted(() => {
      if (tabsEle.value) {
        const { children } = tabsEle.value
        const activeLi = children[props.modelValue] as HTMLLIElement
        sliderStyle.value.width = `${activeLi.offsetWidth}px`
        activeLi.classList.add(style.active)
      }
    })

    return {
      tabsEle,
      sliderStyle,
      style,
      catchLiClick
    }
  }
})
</script>

<style lang="scss" module>
@keyframes rippleA {
  from {
    transform: scale(0.5);
    opacity: 0.5;
  }

  to {
    transform: scale(4);
    opacity: 0;
  }
}

.ripple {
  position: absolute;
  border-radius: 50%;
  animation: rippleA 0.6s linear forwards;
  background-color: var(--main-color);
}

.container {
  display: flow-root;
  position: relative;
  color: var(--grey);

  ul {
    display: flex;
    margin: 0;
  }

  li {
    padding: 5px 15px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &.active,
    &:hover {
      color: var(--main-color)
    }
  }
}

.slider {
  background-color: var(--main-color);
  height: 2px;
  position: absolute;
  bottom: 0;
  transition: .3s ease;
}

.dividing-line {
  background-color: #F2F2F2;
  height: 1px;
}
</style>
