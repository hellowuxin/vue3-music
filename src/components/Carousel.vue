<template>
  <div :class="style['container']">
    <div :class="style['content']">
      <div
        ref="contentRef"
        :style="{ height: `${height}px` }"
        @transitionend="onTransitionend"
      >
        <slot/>
      </div>
      <a :class="style['control-prev']" @click="controlClick(false)">
        <icon iconId="iconleft"/>
      </a>
      <a :class="style['control-next']" @click="controlClick()">
        <icon iconId="iconright"/>
      </a>
    </div>
    <ol :class="style['indicators']" ref="indicatorsRef" v-if="indicators">
      <li
        v-for="indic in indicators"
        :key="indic"
        @mouseenter="makeActive(indic)"
        :class="{[style['active']]: indic === activeIndex}"
      ></li>
    </ol>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, useCssModule } from 'vue'
import Icon from './Icon.vue'
import debounce from '../tools/debounce'

export default defineComponent({
  name: 'Carousel',
  components: {
    Icon
  },
  props: {
    height: {
      type: Number,
      default: 238
    }
  },
  setup () {
    const activeIndex = ref(0)
    const contentRef: Ref<Element | undefined> = ref()
    const indicatorsRef: Ref<Element | undefined> = ref()
    const indicators: Ref<number[] | undefined> = ref()
    const style = useCssModule()

    const circleIndex = (step: number) => {
      const { length } = indicators.value as number[]
      const index = (activeIndex.value + step) % length
      return index > -1 ? index : index + length
    }
    const circleElement = (ele: Element, next = true) => {
      return next
        ? (ele.nextElementSibling || ele.parentElement?.firstElementChild || ele)
        : (ele.previousElementSibling || ele.parentElement?.lastElementChild || ele)
    }
    const controlClick = (next = true) => {
      const activeItem = document.querySelector('.carousel-item.active')

      if (activeItem) {
        const prevItem = circleElement(activeItem, false)
        const nextItem = circleElement(activeItem)

        if (next) {
          activeIndex.value = circleIndex(1)
          prevItem.classList.remove('carousel-item-prev')
          activeItem.classList.replace('active', 'carousel-item-prev')
          nextItem.classList.replace('carousel-item-next', 'active')
          circleElement(nextItem).classList.add('carousel-item-next')
        } else {
          activeIndex.value = circleIndex(-1)
          prevItem.classList.replace('carousel-item-prev', 'active')
          activeItem.classList.replace('active', 'carousel-item-next')
          nextItem.classList.remove('carousel-item-next')
          circleElement(prevItem, false).classList.add('carousel-item-prev')
        }
      }
    }
    const makeActive = (index: number) => {
      if (index === circleIndex(1)) {
        controlClick()
      } else if (index === circleIndex(-1)) {
        controlClick(false)
      } else if (index !== activeIndex.value && contentRef.value) {
        activeIndex.value = index
        const activeItem = document.querySelector('.carousel-item.active')
        const newActiveItem = contentRef.value.children[index]

        if (activeItem) {
          const prevItem = circleElement(activeItem, false)
          const nextItem = circleElement(activeItem)
          activeItem.classList.replace('active', 'deactive')
          prevItem.classList.remove('carousel-item-prev')
          nextItem.classList.remove('carousel-item-next')
        }
        newActiveItem.classList.add('active')
        circleElement(newActiveItem, false).classList.add('carousel-item-prev')
        circleElement(newActiveItem).classList.add('carousel-item-next')
      }
    }
    const onTransitionend = debounce(() => {
      if (contentRef.value) {
        const deactive = contentRef.value.querySelector('.deactive')
        if (deactive) {
          deactive.classList.remove('deactive')
        }
      }
    })

    onMounted(() => {
      if (contentRef.value) {
        const { children } = contentRef.value
        if (children.length > 3) {
          indicators.value = [...new Array(children.length).keys()]
          children[children.length - 1].classList.add('carousel-item-prev')
          children[0].classList.add('active')
          children[1].classList.add('carousel-item-next')
        }
      }
      // setInterval(() => {
      //   controlClick(true)
      // }, 3000)
    })

    return {
      style,
      activeIndex,
      controlClick,
      contentRef,
      indicators,
      indicatorsRef,
      makeActive,
      onTransitionend
    }
  }
})
</script>

<style lang="scss" module>
.container {
  margin: 20px 0;
}

.content {
  position: relative;
}

.control-prev,
.control-next {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: .5;
  transition: opacity .15s ease;
  cursor: pointer;
  color: white;
  width: max(50px, calc(100% - 642px) / 2);

  &:hover {
    opacity: 1;
  }

  :global(.icon) {
    width: 2rem;
    height: 2rem;
  }
}

.control-prev {
  left: 0;
}

.control-next {
  right: 0
}

.indicators {
  display: flex;
  list-style: none;
  justify-content: center;
  padding-inline-start: 0;
  margin: 5px 0;

  li {
    padding: .4rem;

    &.active::after {
      background-color: #D33A31;
    }

    &::after {
      display: block;
      content: '';
      width: 7px;
      height: 7px;
      background-color: #E5E5E5;
      border-radius: 50%;
    }
  }
}
</style>
