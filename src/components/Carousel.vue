<template>
  <div class="carousel" :style="{ height: `${imgHeight}px` }">
    <div class="carousel-inner" ref="carouselInner">
      <carousel-item
        v-for="item in [1,2,3,4]"
        :key="item"
        :width="imgWidth"
      />
    </div>
    <a class="carousel-control-prev" @click="controlClick(false)">
      <icon class="carousel-control-prev-icon" iconId="iconleft"/>
    </a>
    <a class="carousel-control-next" @click="controlClick(true)">
      <icon class="carousel-control-next-icon" iconId="iconright"/>
    </a>
    <ol class="carousel-indicators">
      <li class="active"></li>
      <li></li>
      <li></li>
    </ol>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, Ref } from 'vue'
import Icon from './Icon.vue'
import CarouselItem from './CarouselItem.vue'
export interface CarouselItemProp {
  imgSrc: string;
  imgAlt?: string;
}

export default defineComponent({
  name: 'Carousel',
  components: {
    Icon,
    CarouselItem
  },
  props: {
    imgHeight: {
      type: Number,
      default: 250
    },
    imgWidth: {
      type: Number,
      default: 642
    },
    value: {
      type: Array as PropType<CarouselItemProp[]>,
      required: true
    }
  },
  setup (props) {
    let activeIndex = 0
    const circleIndex = (step: number) => {
      const index = (activeIndex + step) % props.value.length
      return index > -1 ? index : index + props.value.length
    }
    const circleElement = (ele: Element, next: boolean) => {
      return next
        ? (ele.nextElementSibling || ele.parentElement?.firstElementChild || ele)
        : (ele.previousElementSibling || ele.parentElement?.lastElementChild || ele)
    }
    const controlClick = (next: boolean) => {
      const activeItem = document.querySelector('.carousel-item.active')
      if (activeItem) {
        const prevItem = circleElement(activeItem, false) as Element
        const nextItem = circleElement(activeItem, true) as Element
        const deactiveItem = circleElement(nextItem, true) as Element

        if (next) {
          activeIndex = circleIndex(1)
          prevItem.classList.remove('carousel-item-prev')
          activeItem.classList.replace('active', 'carousel-item-prev')
          nextItem.classList.replace('carousel-item-next', 'active')
          deactiveItem.classList.add('carousel-item-next')
          deactiveItem.children[0].setAttribute('src', props.value[circleIndex(1)].imgSrc)
        } else {
          activeIndex = circleIndex(-1)
          prevItem.classList.replace('carousel-item-prev', 'active')
          activeItem.classList.replace('active', 'carousel-item-next')
          nextItem.classList.remove('carousel-item-next')
          deactiveItem.classList.add('carousel-item-prev')
          deactiveItem.children[0].setAttribute('src', props.value[circleIndex(-1)].imgSrc)
        }
      }
    }
    const carouselInner: Ref<Element | null> = ref(null)

    onMounted(() => {
      if (carouselInner.value) {
        const { children } = carouselInner.value
        const { value } = props
        const prev = children[children.length - 1]
        prev.classList.add('carousel-item-prev')
        prev.children[0].setAttribute('src', value[circleIndex(-1)].imgSrc)
        const active = children[0]
        active.classList.add('active')
        active.children[0].setAttribute('src', value[activeIndex].imgSrc)
        const next = children[1]
        next.classList.add('carousel-item-next')
        next.children[0].setAttribute('src', value[circleIndex(1)].imgSrc)
      }

      // setInterval(() => {
      //   controlClick(true)
      // }, 2000)
    })

    return {
      controlClick,
      carouselInner
    }
  }
})
</script>

<style lang="scss">
.carousel {
  position: relative;
  margin: 10px 0;

  .carousel-inner {
    height: inherit;
    position: relative;
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
</style>
