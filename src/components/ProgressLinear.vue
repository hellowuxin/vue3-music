<template>
  <div :class="containerClass" :style="containerStyle" @click="onProgressClick" ref="containerEle">
    <div :class="style['bar']" :style="barStyle"></div>
    <div :class="style['thumb']" :style="thumbStyle"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useCssModule, ref, Ref, computed, onMounted, ComputedRef } from 'vue'

export default defineComponent({
  name: 'ProgressLinear',
  emits: ['progress-click'],
  props: {
    vertical: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      default: 100
    },
    height: {
      type: String,
      default: ''
    }
  },
  setup (props, context) {
    const containerEle: Ref<HTMLDivElement | undefined> = ref()
    const style = useCssModule()
    const containerStyle = { height: props.height }
    const containerRect: Ref<DOMRect | undefined> = ref()
    let barScale: string,
      containerClass: string,
      thumbPosMax: ComputedRef<number>,
      thumbStyle: ComputedRef<{ transform: string }>

    const proportion = computed(() => props.value / props.max)

    if (props.vertical) {
      barScale = 'scaleY'
      containerClass = style['vertical-container']

      thumbPosMax = computed(() => parseInt(props.height, 10))
      thumbStyle = computed(() => {
        return { transform: `translateY(${thumbPosMax.value * (1 - proportion.value) - 5}px)` }
      })
    } else {
      barScale = 'scaleX'
      containerClass = style.container

      thumbPosMax = computed(() => (containerRect.value ? containerRect.value.width : 0))
      thumbStyle = computed(() => {
        return { transform: `translateX(${thumbPosMax.value * proportion.value - 5}px)` }
      })
    }

    const barStyle = computed(() => {
      return { transform: `${barScale}(${proportion.value})` }
    })

    const onProgressClick = (event: MouseEvent) => {
      if (containerEle.value) {
        const offset = containerEle.value.getBoundingClientRect()
        let percent
        if (props.vertical) {
          const top = offset.bottom - event.clientY
          percent = top / offset.height
        } else {
          const left = event.clientX - offset.left
          percent = left / offset.width
        }
        percent = Math.max(Math.min(percent, 1), 0)
        context.emit('progress-click', percent)
      }
    }

    onMounted(() => {
      if (containerEle.value) {
        containerRect.value = containerEle.value.getBoundingClientRect()
      }
    })

    return {
      style,
      containerEle,
      onProgressClick,
      barStyle,
      thumbStyle,
      containerClass,
      containerStyle
    }
  }
})
</script>

<style lang="scss" module>
.container,
.vertical-container {
  position: relative;
  height: 2px;
  background-color: #F4F4F4;
  display: flex;
  align-items: center;
  padding: 5px 0;
  cursor: pointer;
  background-clip: content-box;

  .bar {
    width: 100%;
    position: absolute;
    transform-origin: left;
    transform: scaleX(0);
    height: inherit;
    background-color: var(--main-color);
  }

  .thumb {
    display: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--main-color);
  }

  &:hover .thumb {
    display: block;
  }
}

.vertical-container {
  width: 4px;
  padding: 0 5px;
  flex-direction: column;
  background-color: #E3E3E3;

  .bar {
    height: inherit;
    width: inherit;
    transform-origin: bottom;
  }

  .thumb {
    display: block;
    width: 10px;
    height: 10px;
  }
}

.rounded {
  border-radius: 28px;
}
</style>
