import { createStore } from 'vuex'
import { Track } from './interface'

export interface StoreData {
  track: Track | ''
}

export default createStore<StoreData>({
  state: {
    track: ''
  },
  mutations: {
    playSong (state, track: Track) {
      state.track = track
    }
  }
})
