<template>
  <div class="carousel-item" :style="itemStyle" ref="item">
    <img v-bind="$attrs">
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue'

export default defineComponent({
  name: 'CarouselItem',
  inheritAttrs: false,
  props: {
    width: {
      type: Number,
      default: 642
    }
  },
  setup (props) {
    const item: Ref<Element | null> = ref(null)
    const imgWidth = props.width + 'px'
    const itemStyle = ref({
      width: `min(100%, ${imgWidth})`,
      margin: `0 max(0px, calc(100% - ${imgWidth}) / 2)`
    })
    const changeStyle = (mutationsList: MutationRecord[]) => {
      const { classList } = mutationsList[0].target as Element
      if (classList.contains('carousel-item-prev')) {
        itemStyle.value.margin = `0 max(0px, calc(100% - ${imgWidth})) 0 0`
      } else if (classList.contains('carousel-item-next')) {
        itemStyle.value.margin = `0 0 0 max(0px, calc(100% - ${imgWidth}))`
      } else {
        itemStyle.value.margin = `0 max(0px, calc(100% - ${imgWidth}) / 2)`
      }
    }

    onMounted(() => {
      const observer = new MutationObserver(changeStyle)
      observer.observe(item.value as Element, { attributes: true, attributeFilter: ['class'] })
    })

    return {
      item,
      itemStyle
    }
  }
})
</script>

<style lang="scss">
@keyframes active-to-deactive {
  from { z-index: 1; }
  to { z-index: 0; }
}

.carousel-item {
  z-index: -2;
  position: absolute;
  border-radius: 10px;
  height: inherit;
  transform: scale(.9);
  transition: all .5s ease-out;

  &.active {
    z-index: 1;
    transform: scale(1);

    &::after {
      opacity: 0;
    }
  }

  &.deactive {
    animation-name: active-to-deactive;
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    content: "";
    background-color: black;
    opacity: 0.5;
    border-radius: inherit;
  }

  img {
    display: block;
    height: inherit;
    width: inherit;
    border-radius: inherit;
    object-fit: cover;
  }
}

.carousel-item-next,
.carousel-item-prev {
  z-index: -1;
  transform: scale(.8);
}

.carousel-item-prev {
  transform-origin: left;
}

.carousel-item-next {
  transform-origin: right;
}
</style>
