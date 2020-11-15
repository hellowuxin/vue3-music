<template>
  <div class="carousel">
    <div class="carousel-container">
      <div
        class="carousel-content"
        ref="carouselContent"
        :style="{ height: `${height || imgHeight}px` }"
        @transitionend="onTransitionend"
      >
        <slot/>
      </div>
      <a class="carousel-control-prev" @click="controlClick(false)">
        <icon class="carousel-control-prev-icon" iconId="iconleft"/>
      </a>
      <a class="carousel-control-next" @click="controlClick()">
        <icon class="carousel-control-next-icon" iconId="iconright"/>
      </a>
    </div>
    <ol class="carousel-indicators" ref="carouselIndicators" v-if="indicators">
      <li
        v-for="indic in indicators"
        :key="indic"
        @mouseenter="makeActive(indic)"
        :class="{active: indic === activeIndex}"
      ></li>
    </ol>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue'
import Icon from './Icon.vue'
import debounce from '../tools/debounce'

export default defineComponent({
  name: 'Carousel',
  components: {
    Icon
  },
  props: {
    height: Number
  },
  setup () {
    const activeIndex = ref(0)
    const carouselContent: Ref<Element | undefined> = ref()
    const carouselIndicators: Ref<Element | undefined> = ref()
    const indicators: Ref<number[] | undefined> = ref()
    const imgHeight: Ref<number | undefined> = ref()

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
      } else if (index !== activeIndex.value && carouselContent.value) {
        activeIndex.value = index
        const activeItem = document.querySelector('.carousel-item.active')
        const newActiveItem = carouselContent.value.children[index]

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
      if (carouselContent.value) {
        const deactive = carouselContent.value.querySelector('.deactive')
        if (deactive) {
          deactive.classList.remove('deactive')
        }
      }
    })

    onMounted(() => {
      if (carouselContent.value) {
        const { children } = carouselContent.value
        if (children.length > 3) {
          indicators.value = [...new Array(children.length).keys()]
          children[children.length - 1].classList.add('carousel-item-prev')
          children[0].classList.add('active')
          children[1].classList.add('carousel-item-next')

          imgHeight.value = (children[0] as HTMLElement).offsetHeight
        }
      }
      // setInterval(() => {
      //   controlClick(true)
      // }, 2000)
    })

    return {
      activeIndex,
      controlClick,
      carouselContent,
      indicators,
      carouselIndicators,
      makeActive,
      onTransitionend,
      imgHeight
    }
  }
})
</script>

<style lang="scss">
.carousel {
  margin: 20px 0;

  .carousel-container {
    position: relative;

    .carousel-content {
      position: relative;
    }
  }
}

.carousel-control-prev,
.carousel-control-next {
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

  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    width: 2rem;
    height: 2rem;
  }
}

.carousel-control-prev {
  left: 0;
}

.carousel-control-next {
  right: 0
}

.carousel-indicators {
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
