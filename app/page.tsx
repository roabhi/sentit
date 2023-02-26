'use client'

import AddPost from './components/AddPost'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Post from './components/Post'

// ? Fetch all posts
const allPosts = async () => {
  const response = await axios.get('/api/posts/getPost')
  return response.data
}

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryFn: allPosts,
    queryKey: ['posts'],
  })

  if (error) return error
  if (isLoading)
    return <h4 className="text-neutral-300 font-semibold">Loading...</h4>
  console.log(data)
  return (
    <main className="container mx-auto text-teal-500">
      {/* <h4 className="text-neutral-300 font-semibold">Write your crap</h4> */}
      <AddPost />
      {data?.map((post) => (
        <Post
          key={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title}
          id={post.id}
        />
      ))}
    </main>
  )
}
