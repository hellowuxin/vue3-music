<template>
  <div :class="style['container']">
    <div v-for="subscriber in subscribers" :key="subscriber.userId" :class="style['subscriber']">
      <img :src="subscriber.avatarUrl" alt="">
      <div>
        <span>{{ subscriber.nickname }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, useCssModule } from 'vue'
import { User } from '@/interface'

export default defineComponent({
  name: 'Subscriberlist',
  props: {
    subscribers: {
      type: Array as PropType<User[]>,
      required: true
    }
  },
  setup () {
    const style = useCssModule()

    return {
      style
    }
  }
})
</script>

<style lang="scss" module>
.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 20px;

  img {
    width: 100px;
    border-radius: 50%;
  }
}

.subscriber {
  display: flex;
  gap: 10px;

  > div {
    display: flex;
    align-items: center;
  }
}
</style>
