import { createStore } from 'vuex'
import { Track } from './interface'

export interface StoreData {
  track: Track | ''
  playing: boolean
}

export default createStore<StoreData>({
  state: {
    track: '',
    playing: false
  },
  mutations: {
    playSong (state, track: Track) {
      state.track = track
      state.playing = true
    },
    play (state) {
      state.playing = !state.playing
    }
  }
})
