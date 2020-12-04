import { createStore } from 'vuex'
import { Track } from './interface'
import axios from 'axios'

export interface GlobalStore {
  track: Track | ''
  paused: boolean
  songUrl: string
  currentTime: number
  volume: number
  muted: boolean
}

export default createStore<GlobalStore>({
  state: {
    track: '',
    paused: true,
    songUrl: '',
    currentTime: 0,
    volume: 1,
    muted: false
  },
  mutations: {
    changeSong (state, payload: { track: Track, songUrl: string }) {
      state.track = payload.track
      state.songUrl = payload.songUrl
    },
    play (state) {
      state.paused = false
    },
    pause (state) {
      state.paused = true
    },
    changePaused (state) {
      state.paused = !state.paused
    },
    timeUpdate (state, current: number) {
      state.currentTime = current
    },
    changeVolume (state, volume: number) {
      state.volume = volume
    },
    mute (state) {
      state.muted = true
    },
    unmute (state) {
      state.muted = false
    },
    changeMuted (state) {
      state.muted = !state.muted
    }
  },
  actions: {
    async playSong ({ commit, state }, track: Track) {
      if (!state.track || track.id !== state.track.id) {
        const { data } = await axios.get(`/song/url?id=${track.id}`)
        commit('pause')
        commit({
          type: 'changeSong',
          track,
          songUrl: data.data[0].url
        })
        commit('play')
      } else {
        commit('changePaused')
      }
    }
  }
})
