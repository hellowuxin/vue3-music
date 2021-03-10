export interface User {
  userId: number
  nickname: string
  avatarUrl: string
}

export interface Artist {
  id: number
  name: string
  img1v1Url: string
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
  description: string | null
  shareCount: number
  subscribedCount: number
  subscribers: User[]
  tracks: Track[]
  commentCount: number
  userId: number
  copywriter: string
  highQuality: boolean
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

export interface Tag {
  id: number
  name: string
  category: number
  hot: boolean
  type: number
}
