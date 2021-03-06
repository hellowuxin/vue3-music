<template>
  <div :class="style['container']">
    <div :class="style['header']">
      <chip-group title="语种：" v-model="area">
        <chip
          v-for="[text, key] in areaChips"
          :key="key"
        >{{ text }}</chip>
      </chip-group>
      <chip-group title="分类：" v-model="type">
        <chip
          v-for="[text, key] in typeChips"
          :key="key"
        >{{ text }}</chip>
      </chip-group>
      <chip-group title="筛选：" v-model="initial">
        <chip
          v-for="[text, key] in initialChips"
          :key="key"
        >{{ text }}</chip>
      </chip-group>
    </div>
    <div :class="style['content']" v-if="artistList">
      <card
        v-for="artist in artistList"
        :key="artist.id"
        :imgSrc="`${artist.img1v1Url}?param=400y400`"
        :title="artist.name"
      ></card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, useCssModule, watch } from 'vue'
import Card from '../components/Card.vue'
import axios from 'axios'
import { Artist } from '@/interface'
import { ChipGroup, Chip } from '../components/Chip'

// 语种
const areaChips = new Map<string, number>()
areaChips.set('全部', -1)
areaChips.set('华语', 7)
areaChips.set('欧美', 96)
areaChips.set('日本', 8)
areaChips.set('韩国', 16)
areaChips.set('其他', 0)
// 分类
const typeChips = new Map<string, number>()
typeChips.set('全部', -1)
typeChips.set('男歌手', 1)
typeChips.set('女歌手', 2)
typeChips.set('乐队', 3)
// 筛选
const initialChips = new Map<string, number | string>()
initialChips.set('热门', -1)
for (let i = 97; i < 123; i++) {
  const letter = String.fromCharCode(i)
  initialChips.set(letter, letter)
}
initialChips.set('#', 0)

export default defineComponent({
  name: 'ArtistView',
  components: {
    Card,
    ChipGroup,
    Chip
  },
  setup () {
    const style = useCssModule()
    const artistList: Ref<Artist[] | undefined> = ref()
    const area = ref('全部')
    const type = ref('全部')
    const initial = ref('热门')

    watch([area, type, initial], ([area, type, initial]) => {
      const areaKey = areaChips.get(area)
      const typeKey = typeChips.get(type)
      const initialKey = initialChips.get(initial)

      axios.get('/artist/list', {
        params: {
          type: typeKey,
          area: areaKey,
          initial: initialKey
        }
      }).then(({ data }) => {
        artistList.value = data.artists
      })
    }, {
      immediate: true
    })

    return {
      style,
      artistList,
      areaChips,
      typeChips,
      initialChips,
      area,
      type,
      initial
    }
  }
})
</script>

<style lang="scss" module>
.header {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.content {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 30px 20px;
}
</style>
