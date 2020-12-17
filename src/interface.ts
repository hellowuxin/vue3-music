export interface User {
  userId: number
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
  picUrl: string
}

export interface Track {
  name: string
  id: number
  ar: Artist[]
  al: Album
  mv: number
  alia: string[]
  dt: number
}

export interface Playlist {
  id: number
  name: string
  coverImgUrl: string
  creator: User
  createTime: number
  tags: string[]
  trackCount: number
  playCount: number
  description: string
  shareCount: number
  subscribedCount: number
  subscribers: User[]
  tracks: Track[]
  commentCount: number
  userId: number
}

export interface beReplied {
  beRepliedCommentId: number
  content: string
  user: User
  status: number
}

export interface Comment {
  user: User
  content: string
  commentId: number
  liked: boolean
  likedCount: number
  time: number
  beReplied: beReplied[]
}

export interface CommentResp {
  comments: Comment[]
  total: number
  hotComments: Comment[]
  topComments: Comment[]
}
