<template>
  <div :class="style['container']">
    <div :class="style['title']">{{ title }}</div>
    <ul :class="style['content']" @click="catchLiClick" ref="ulEle">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref, useCssModule } from 'vue'

export default defineComponent({
  name: 'ChipGroup',
  props: {
    title: String,
    modelValue: String
  },
  setup (props, context) {
    const style = useCssModule()
    const ulEle: Ref<HTMLUListElement | undefined> = ref()

    const catchLiClick = (e: MouseEvent) => {
      const currentTarget = e.currentTarget as HTMLUListElement
      const path = e.composedPath()
      const li = path[path.indexOf(currentTarget) - 1] as HTMLLIElement
      if (li) {
        const oldActiveli = currentTarget.querySelector(`.${style.active}`)
        if (li !== oldActiveli) {
          context.emit('update:modelValue', li.textContent)
          li.classList.add(style.active)
          oldActiveli?.classList.remove(style.active)
        }
      }
    }

    onMounted(() => {
      if (ulEle.value) {
        const { children } = ulEle.value
        for (let index = 0; index < children.length; index += 1) {
          const li = children[index]
          if (li.textContent === props.modelValue) {
            li.classList.add(style.active)
            break
          }
        }
      }
    })

    return {
      style,
      catchLiClick,
      ulEle
    }
  }
})
</script>

<style lang="scss" module>
.container {
  font-size: small;
  display: flex;
  gap: 10px;
}

.title {
  white-space: nowrap;
  padding: 3px 0;
}

.content {
  display: flex;
  margin: 0;
  gap: 10px;
  flex-wrap: wrap;

  li.active {
    color: var(--main-color);

    &::before {
      opacity: .12;
    }
  }

  li:not(.active) {
    background-color: #e0e0e0;
  }
}
</style>
