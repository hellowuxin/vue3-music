<template>
  <div :class="style['container']">
    <div v-if="commentResp.hotComments.length > 0">
      <span :class="style['title']">精彩评论</span>
      <comment
        v-for="comment in commentResp.hotComments.slice(0, 10)"
        :key="comment.commentId"
        :comment="comment"
      ></comment>
      <btn :class="style['footer']" v-if="commentResp.hotComments.length > 10">
        <span>更多精彩评论</span>
        <icon :class="style['iconright']"  iconId="iconright"></icon>
      </btn>
    </div>
    <div v-if="commentResp.comments.length > 0">
      <span :class="style['title']">最新评论</span>
      <comment
        v-for="comment in commentResp.comments"
        :key="comment.commentId"
        :comment="comment"
      ></comment>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, useCssModule } from 'vue'
import { CommentResp } from '../interface'
import Icon from './Icon.vue'
import Btn from './Btn.vue'
import Comment from './Comment.vue'

export default defineComponent({
  name: 'Commentlist',
  components: {
    Icon,
    Btn,
    Comment
  },
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
  margin-top: 20px;

  > div {
    margin-bottom: 20px;
  }
}

.title {
  font-weight: 450;
}

.footer {
  margin: 20px auto 0 auto;
  padding: 5px 10px;
}
</style>
