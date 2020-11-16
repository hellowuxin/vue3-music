<template>
  <div class="playlist-view"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

export default defineComponent({
  name: 'PlaylistView',
  setup () {
    const route = useRoute()
    axios.get(`/playlist/detail?id=${route.query.id}`).then(({ data }) => {
      console.log(data)
    })
  }
})
</script>

<style>

</style>
