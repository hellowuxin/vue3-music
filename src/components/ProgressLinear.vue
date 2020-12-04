<template>
  <div :class="containerClass" :style="containerStyle" @click="onProgressClick" ref="containerEle">
    <div :class="style['bar']" :style="barStyle" ref="barEle"></div>
    <div :class="style['thumb']" :style="thumbStyle"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useCssModule, ref, Ref, watch, computed } from 'vue'

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
    },
    width: {}
  },
  setup (props, context) {
    const containerEle: Ref<HTMLDivElement | undefined> = ref()
    const barEle: Ref<HTMLDivElement | undefined> = ref()
    const style = useCssModule()
    const thumbElePos = ref(-5)
    const barScale = `scale${props.vertical ? 'Y' : 'X'}`
    const thumbTranslate = `translate${props.vertical ? 'Y' : 'X'}`
    const containerClass = props.vertical ? style['vertical-container'] : style.container
    const containerStyle = { height: props.height }

    const barStyle = computed(() => {
      return {
        transform: `${barScale}(${props.value / props.max})`
      }
    })
    const thumbStyle = computed(() => {
      return { transform: `${thumbTranslate}(${thumbElePos.value}px)` }
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
    const onBarChange = () => {
      if (barEle.value) {
        let pos
        const offset = barEle.value.getBoundingClientRect()
        if (props.vertical) {
          pos = parseInt(props.height, 10) - offset.height - 5
        } else {
          pos = offset.width - 5
        }
        thumbElePos.value = pos
      }
    }
    const ob = new MutationObserver(onBarChange)
    watch(barEle, (val) => {
      if (val) {
        ob.observe(val, { attributeFilter: ['style'] })
      }
    })

    return {
      thumbElePos,
      style,
      containerEle,
      barEle,
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
