<template>
  <div :class="style['container']">
    <span>精彩评论</span>
    <div v-for="comment in commentResp.hotComments" :key="comment.commentId">
      <img src="" alt="">
      <span>{{ comment.user.nickname }}</span>
      <span>{{ comment.content }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, useCssModule } from 'vue'
import { CommentResp } from '../interface'

export default defineComponent({
  name: 'Commentlist',
  props: {
    commentResp: {
      type: Object as PropType<CommentResp>,
      required: true
    }
  },
  setup (props) {
    const style = useCssModule()
    console.log(props.commentResp)
    return {
      style
    }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flow-root;
}
</style>
