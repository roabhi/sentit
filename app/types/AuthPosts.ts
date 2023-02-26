export type AuthPosts = {
  email: string
  image: string
  name: string
  Post: {
    createdAt: string
    id: string
    postId: string
    title: string
    comments?: {
      createdAt: string
      id: string
      postId: string
      title: string
      userId: string
    }[]
  }[]
}
