<template>
  <div :class="style['container']">
    <span :class="style['title']">精彩评论</span>
    <div :class="style['comment']" v-for="comment in commentResp.hotComments.slice(0, 10)" :key="comment.commentId">
      <img :src="comment.user.avatarUrl" alt="">
      <div :class="style['content']">
        <div>
          <router-link to="#">{{ comment.user.nickname }}：</router-link>
          <span>{{ comment.content }}</span>
        </div>
        <div>
          <span :class="style['time']">{{ getChinaDate(new Date(comment.time)) }}</span>
          <div :class="style['action']">
            <div>
              <icon iconId="iconlike"></icon>
              <span>{{ comment.likedCount }}</span>
            </div>
            <icon iconId="iconfenxiang"></icon>
            <icon iconId="iconcomment"></icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, useCssModule } from 'vue'
import { CommentResp } from '../interface'
import Icon from './Icon.vue'

export default defineComponent({
  name: 'Commentlist',
  components: {
    Icon
  },
  props: {
    commentResp: {
      type: Object as PropType<CommentResp>,
      required: true
    }
  },
  setup (props) {
    const style = useCssModule()
    const getChinaDate = (date: Date) => {
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`
    }

    console.log(props.commentResp)

    return {
      style,
      getChinaDate
    }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flow-root;
  margin-top: 20px;
}

.title {
  font-weight: 450;
}

.comment {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  margin-top: 20px;

  img {
    border-radius: 50%;
    width: 50px;
  }

  a {
    color: var(--blue)
  }
}

.content {
  flex: auto;
  border-bottom: 1px solid #F2F2F2;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.time {
  font-size: small;
  color: var(--lightgrey);
}

.action {
  float: right;
  display: flex;
  gap: 20px;
  align-items: center;
  color: var(--lightgrey);

  span {
    font-size: small;
    margin-left: 5px;
  }
}
</style>
