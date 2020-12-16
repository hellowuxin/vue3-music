<template>
  <div :class="style['container']">
    <div :class="style['user-status']" @click="loginDialog = true">
      <!-- <img src="" alt=""> -->
      <icon iconId="iconaccount-circle"></icon>
      <span>未登陆</span>
    </div>
    <div>发现音乐</div>
  </div>
  <overlay :visible="loginDialog">
    <div :class="style['login-dialog']">
      <div :class="style['login-dialog-header']">
        <span>获取用户详情</span>
        <btn :icon="true" @click="loginDialog = false">
          <icon iconId="iconclose"></icon>
        </btn>
      </div>
      <div :class="style['login-dialog-body']">
        <input type="text" placeholder="请输入您的网易云音乐uid">
        <div :class="style['login-dialog-tips']">
          <p>1、请<a href="https://music.163.com" target="_blank">点我(https://music.163.com)</a>打开网易云音乐官网</p>
          <p>2、点击页面右上角的“登录”</p>
          <p>3、点击您的头像，进入我的主页</p>
          <p>4、复制浏览器地址栏 /user/home?id= 后面的数字（网易云音乐uid）</p>
        </div>
      </div>
      <btn :class="style['login-dialog-footer']">确定</btn>
    </div>
  </overlay>
</template>

<script lang="ts">
// import axios from 'axios'
import { defineComponent, useCssModule, ref } from 'vue'
import Icon from '@/components/Icon.vue'
import Overlay from '@/components/Overlay.vue'
import Btn from '@/components/Btn.vue'

export default defineComponent({
  name: 'UserSidebar',
  components: {
    Icon,
    Overlay,
    Btn
  },
  setup () {
    const style = useCssModule()
    const loginDialog = ref(false)

    return {
      style,
      loginDialog
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
  color: #2F2F2F;
}

.user-status {
  display: flex;
  align-items: center;
  gap: 10px;

  :global(.icon) {
    font-size: xx-large;
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
