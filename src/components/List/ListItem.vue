<template>
  <div :class="style['container']" @click="click">
    <icon v-if="prependIcon" :class="style['icon']" :icon-id="prependIcon"></icon>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, useCssModule } from 'vue'
import { createRipple } from '@/tools'
import Icon from '@/components/Icon.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ListItem',
  components: {
    Icon
  },
  props: {
    prependIcon: String,
    to: String
  },
  setup (props) {
    const style = useCssModule()
    const router = useRouter()

    const click = (event: MouseEvent) => {
      createRipple(event)
      if (props.to) {
        router.push(props.to)
      }
    }
    return {
      style,
      click
    }
  }
})
</script>

<style lang="scss" module>
.container {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
    background-color: currentColor;
    border-radius: inherit;
  }

  &:hover::before {
    opacity: 0.04;
  }
}

.icon {
  flex-shrink: 0;
}
</style>
