<template>
  <svg aria-hidden="true" :class="[containerClass, 'icon']">
    <use :xlink:href="`#${icon-id}`"></use>
  </svg>
</template>

<script lang="ts">
import { defineComponent, useCssModule } from 'vue'

export default defineComponent({
  name: 'Icon',
  props: {
    iconId: {
      type: String,
      required: true
    },
    xxSmall: {
      type: Boolean,
      default: false
    },
    xSmall: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    medium: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    xLarge: {
      type: Boolean,
      default: false
    },
    xxLarge: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const style = useCssModule()
    let containerClass

    if (props.xxSmall) {
      containerClass = style['xx-small']
    } else if (props.xSmall) {
      containerClass = style['x-small']
    } else if (props.small) {
      containerClass = style.small
    } else if (props.medium) {
      containerClass = style.medium
    } else if (props.large) {
      containerClass = style.large
    } else if (props.xLarge) {
      containerClass = style['x-large']
    } else if (props.xxLarge) {
      containerClass = style['xx-large']
    }

    return {
      style,
      containerClass
    }
  }
})
</script>

<style lang="scss" module>
.xx-small {
  font-size: xx-small;
}

.x-small {
  font-size: x-small;
}

.small {
  font-size: small;
}

.medium {
  font-size: medium;
}

.large {
  font-size: large;
}

.x-large {
  font-size: x-large;
}

.xx-large {
  font-size: xx-large;
}
</style>
