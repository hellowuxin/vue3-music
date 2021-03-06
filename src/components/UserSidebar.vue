<template>
  <div :class="style['container']">
    <list-item @click="loginDialog = true" :class="style['profile']">
      <img v-if="profile" :src="profile.avatarUrl" alt="">
      <icon v-else icon-id="iconaccount-circle"></icon>
      <span>{{ profile ? profile.nickname : '未获取用户信息' }}</span>
    </list-item>
    <list-item prepend-icon="iconnetease">
      <span>发现音乐</span>
    </list-item>
    <list-item prepend-icon="iconwuxiandianbo">
      <span>私人电台</span>
    </list-item>
    <list-group>
      <template #header>
        <list-item>创建的歌单</list-item>
      </template>
      <list-item
        v-for="pl in createdPlaylist"
        :key="pl.id"
        prepend-icon="icongedan"
        :to="`/playlist?id=${pl.id}`"
      >
        <span class="ellipsis">{{ pl.name }}</span>
      </list-item>
    </list-group>
  </div>
  <overlay :visible="loginDialog">
    <div :class="style['login-dialog']">
      <div :class="style['login-dialog-header']">
        <span>获取用户详情</span>
        <btn :icon="true" @click="loginDialog = false">
          <icon icon-id="iconclose"></icon>
        </btn>
      </div>
      <div :class="style['login-dialog-body']">
        <input type="text" placeholder="请输入您的网易云音乐uid" v-model="uid">
        <div :class="style['login-dialog-tips']">
          <p>1、请<a href="https://music.163.com" target="_blank">点我(https://music.163.com)</a>打开网易云音乐官网</p>
          <p>2、点击页面右上角的“登录”</p>
          <p>3、点击您的头像，进入我的主页</p>
          <p>4、复制浏览器地址栏 /user/home?id= 后面的数字（网易云音乐uid）</p>
        </div>
      </div>
      <btn :class="style['login-dialog-footer']" @click="getUserDetail">确定</btn>
    </div>
  </overlay>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, useCssModule, ref, Ref } from 'vue'
import Icon from '@/components/Icon.vue'
import Overlay from '@/components/Overlay.vue'
import Btn from '@/components/Btn.vue'
import { ListGroup, ListItem } from './List'
import { Playlist } from '@/interface'

interface Profile {
  avatarUrl: string
  nickname: string
  userId: number
}

export default defineComponent({
  name: 'UserSidebar',
  components: {
    Icon,
    Overlay,
    Btn,
    ListItem,
    ListGroup
  },
  setup () {
    const style = useCssModule()
    const loginDialog = ref(false)
    const uid = ref('344201762')
    const profile: Ref<Profile | undefined> = ref()
    const createdPlaylist: Ref<Playlist[]> = ref([])
    const favorPlaylist: Ref<Playlist[]> = ref([])

    const getUserDetail = () => {
      const intUid = parseInt(uid.value, 10)
      if (intUid) {
        axios.get(`/user/detail?uid=${intUid}`).then(({ data }) => {
          profile.value = data.profile
          loginDialog.value = false
        })
        axios.get(`/user/playlist?uid=${intUid}`).then(({ data }) => {
          data.playlist.forEach((pl: Playlist) => {
            if (pl.userId === intUid) {
              createdPlaylist.value.push(pl)
            } else {
              favorPlaylist.value.push(pl)
            }
          })
        })
      }
    }

    getUserDetail()

    return {
      style,
      loginDialog,
      getUserDetail,
      uid,
      profile,
      createdPlaylist,
      favorPlaylist
    }
  }
})
</script>

<style lang="scss" module>
.container {
  box-sizing: border-box;
  position: fixed;
  width: var(--leftspace);
  left: 0;
  top: var(--topspace);
  bottom: var(--bottomspace);
  background-color: #EDEDED;
  padding: 8px;
  color: var(--darkgrey);
}

.profile {
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  :global(.icon) {
    font-size: 40px;
  }
}

.login-dialog {
  background-color: white;
  border-radius: 4px;
  width: 300px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 30px;

  &-header {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &-footer {
    box-sizing: border-box;
    justify-content: center;
    background-color: var(--main-color);
    color: white;
  }
}

.login-dialog-body {
  display: flex;
  flex-direction: column;
  gap: 10px;

  input {
    box-sizing: border-box;
    outline: none;
    border: none;
    border-radius: 4px;
    background-color: #EDEDED;
    padding: 4px 16px;
    font-size: inherit;
  }

  .login-dialog-tips {
    display: flex;
    flex-direction: column;
    gap: 5px;

    a {
      color: var(--main-color);
    }

    p {
      margin: 0;
    }
  }
}
</style>
