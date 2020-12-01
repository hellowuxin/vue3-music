import { createStore } from 'vuex'
import { Track } from './interface'

interface StoreData {
  track: Track | ''
}

export default createStore<StoreData>({
  state: {
    track: ''
  }
})
