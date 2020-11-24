<template>
  <div :class="style['container']">
    <div :class="style['content']">
      <div
        ref="contentEle"
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
    <ol :class="style['indicators']" ref="indicatorsEle" v-if="indicators">
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
import Icon from '@/components/Icon.vue'
import debounce from '@/tools/debounce'
import itemStyle from './CarouselItem.module.scss'

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
    const contentEle: Ref<Element | undefined> = ref()
    const indicatorsEle: Ref<Element | undefined> = ref()
    const indicators: Ref<number[] | undefined> = ref()
    const style = useCssModule()
    const {
      prev: itemPrev,
      active: itemActive,
      deactive: itemDeactive,
      next: itemNext,
      container: itemContainer
    } = itemStyle

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
      const activeItem = document.querySelector(`.${itemContainer}.${itemActive}`)

      if (activeItem) {
        const prevItem = circleElement(activeItem, false)
        const nextItem = circleElement(activeItem)

        if (next) {
          activeIndex.value = circleIndex(1)
          prevItem.classList.remove(itemPrev)
          activeItem.classList.replace(itemActive, itemPrev)
          nextItem.classList.replace(itemNext, itemActive)
          circleElement(nextItem).classList.add(itemNext)
        } else {
          activeIndex.value = circleIndex(-1)
          prevItem.classList.replace(itemPrev, itemActive)
          activeItem.classList.replace(itemActive, itemNext)
          nextItem.classList.remove(itemNext)
          circleElement(prevItem, false).classList.add(itemPrev)
        }
      }
    }
    const makeActive = (index: number) => {
      if (index === circleIndex(1)) {
        controlClick()
      } else if (index === circleIndex(-1)) {
        controlClick(false)
      } else if (index !== activeIndex.value && contentEle.value) {
        activeIndex.value = index
        const activeItem = document.querySelector(`.${itemContainer}.${itemActive}`)
        const newActiveItem = contentEle.value.children[index]

        if (activeItem) {
          const prevItem = circleElement(activeItem, false)
          const nextItem = circleElement(activeItem)
          activeItem.classList.replace(itemActive, itemDeactive)
          prevItem.classList.remove(itemPrev)
          nextItem.classList.remove(itemNext)
        }
        newActiveItem.classList.add(itemActive)
        circleElement(newActiveItem, false).classList.add(itemPrev)
        circleElement(newActiveItem).classList.add(itemNext)
      }
    }
    const onTransitionend = debounce(() => {
      if (contentEle.value) {
        const deactive = contentEle.value.querySelector(itemDeactive)
        if (deactive) {
          deactive.classList.remove(itemDeactive)
        }
      }
    })

    onMounted(() => {
      if (contentEle.value) {
        const { children } = contentEle.value
        if (children.length > 3) {
          indicators.value = [...new Array(children.length).keys()]
          children[children.length - 1].classList.add(itemPrev)
          children[0].classList.add(itemActive)
          children[1].classList.add(itemNext)
        }
      }
      // setInterval(() => {
      //   controlClick(true)
      // }, 3000)
    })

    return {
      style,
      itemStyle,
      activeIndex,
      controlClick,
      contentEle,
      indicators,
      indicatorsEle,
      makeActive,
      onTransitionend
    }
  }
})
</script>

<style lang="scss" module>
.container {
  margin: 10px 0;
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
  justify-content: center;
  margin: 5px 0;

  li {
    padding: .4rem;

    &.active::after {
      background-color: var(--main-color);
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
