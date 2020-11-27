<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#${iconId}`"></use>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Icon',
  props: {
    iconId: {
      type: String,
      required: true
    }
  }
})
</script>
