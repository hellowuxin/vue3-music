import { createStore } from 'vuex'
import { Track } from './interface'
import axios from 'axios'

export interface GlobalStore {
  track: Track | undefined
  paused: boolean
  songUrl: string
  currentTime: number
  volume: number
  muted: boolean
  playMode: 'order' | 'loop' | 'order-loop'
  tracklist: Track[]
  playView: boolean
}

export default createStore<GlobalStore>({
  state: {
    track: undefined,
    paused: true,
    songUrl: '',
    currentTime: 0,
    volume: 0.3,
    muted: false,
    playMode: 'order',
    tracklist: [],
    playView: false
  },
  mutations: {
    changeTrack (state, payload: { track: Track, songUrl: string }) {
      state.track = payload.track
      state.songUrl = payload.songUrl
    },
    changeTrackList (state, tracklist: Track[]) {
      state.tracklist = tracklist
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
    },
    changePlayView (state) {
      state.playView = !state.playView
    }
  },
  actions: {
    async playSong ({ commit, state }, payload: { track: Track, tracklist?: Track[] }) {
      if (!state.track || payload.track.id !== state.track.id) {
        const { data } = await axios.get(`/song/url?id=${payload.track.id}`)
        commit('pause')
        commit({
          type: 'changeTrack',
          track: payload.track,
          songUrl: data.data[0].url
        })
        commit('play')
      } else {
        commit('changePaused')
      }
      if (payload.tracklist && state.tracklist !== payload.tracklist) {
        console.log(1)
        commit('changeTrackList', payload.tracklist)
      }
    },
    end ({ commit, state, dispatch }) {
      commit('pause')
      if (state.track && state.playMode === 'order') {
        const nextIndex = state.tracklist.indexOf(state.track) + 1
        if (nextIndex < state.tracklist.length) {
          dispatch({
            type: 'playSong',
            track: state.tracklist[nextIndex]
          })
        }
      }
    }
  }
})
