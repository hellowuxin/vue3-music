<template>
  <div :class="style['container']">
    <img :src="comment.user.avatarUrl" alt="">
    <div :class="style['content']">
      <div>
        <router-link to="#">{{ comment.user.nickname }}：</router-link>
        <span>{{ comment.content }}</span>
      </div>
      <div v-if="comment.beReplied.length > 0" :class="style['beReplied']">
        <div v-if="comment.beReplied[0].status !== -5">
          <router-link to="#">@{{ comment.beReplied[0].user.nickname }}：</router-link>
          <span>{{ comment.beReplied[0].content }}</span>
        </div>
        <div v-else :class="style['delete']">该评论已删除</div>
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
</template>

<script lang="ts">
import { defineComponent, PropType, useCssModule } from 'vue'
import { Comment } from '@/interface'
import Icon from './Icon.vue'
import { getChinaDate } from '@/tools'

export default defineComponent({
  name: 'Comment',
  components: {
    Icon
  },
  props: {
    comment: {
      type: Object as PropType<Comment>,
      required: true
    }
  },
  setup () {
    const style = useCssModule()

    return {
      style,
      getChinaDate
    }
  }
})
</script>

<style lang="scss" module>
.container {
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

.beReplied {
  background-color: #F2F2F2;
  padding: 10px;
  color: var(--grey);
  border-radius: 4px;

  .delete {
    text-align: center;
  }
}
</style>
