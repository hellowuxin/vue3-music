export interface Creator {
  nickname: string
  avatarUrl: string
}

export interface Artist {
  id: number
  name: string
}

export interface Album {
  id: number
  name: string
}

export interface Track {
  name: string
  id: number
  ar: Artist[]
  al: Album
  mv: number
}

export interface Playlist {
  name: string
  coverImgUrl: string
  creator: Creator
  createTime: number
  tags: string[]
  trackCount: number
  playCount: number
  description: string
  shareCount: number
  subscribedCount: number
  tracks: Track[]
  commentCount: number
}
