<template>
  <transition
    :enter-from-class="style['enter-from']"
    :enter-active-class="style['enter-active']"
    :leave-active-class="style['enter-active']"
    :leave-to-class="style['enter-from']"
  >
    <div
      v-show="visible"
      :class="[style['container'], style[type]]"
      :style="{ top: `${verticalOffset}px` }"
    >
      <icon :iconId="iconObj[type]"></icon>
      <span>{{ message }}</span>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, useCssModule, ref } from 'vue'
import { MessageType } from '.'
import Icon from '@/components/Icon.vue'

export default defineComponent({
  name: 'Message',
  components: {
    Icon
  },
  props: {
    message: String,
    type: {
      type: String as PropType<MessageType>,
      default: 'default'
    },
    duration: {
      type: Number,
      default: 3000
    },
    verticalOffset: Number
  },
  emits: ['close'],
  setup (props, context) {
    const style = useCssModule()
    const visible = ref(false)
    const animationDura = 300
    const iconObj = {
      success: 'iconbx-check-circle',
      error: 'iconbx-error-alt',
      default: 'iconbx-error-circle'
    }

    onMounted(() => {
      visible.value = true

      if (props.duration !== 0) {
        setTimeout(() => {
          visible.value = false

          setTimeout(() => {
            context.emit('close')
          }, animationDura)
        }, props.duration + animationDura)
      }
    })

    return {
      style,
      visible,
      iconObj
    }
  }
})
</script>

<style lang="scss" module>
.container {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  padding: 8px 16px;
  border: 1px solid transparent;
  border-radius: 4px;
}

.enter-active {
  transition: all .3s ease;
}

.enter-from {
  transform: translate(-50%, -100%);
  opacity: 0;
}

.success,
.error,
.default {
  display: flex;
  align-items: center;
  gap: 10px;

  :global(.icon) {
    font-size: x-large;
  }
}

.success {
  color: #0f5132;
  background-color: #d1e7dd;
  border-color: #badbcc;
}

.error {
  color: #842029;
  background-color: #f8d7da;
  border-color: #f5c2c7;
}

.default {
  color: #084298;
  background-color: #cfe2ff;
  border-color: #b6d4fe;
}
</style>
