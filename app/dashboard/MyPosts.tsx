'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { AuthPosts } from '../types/AuthPosts'
import EditPost from './EditPost'

const fetchAuthPosts = async () => {
  const response = await axios.get('/api/posts/authPosts')
  return response.data
}

const MyPosts = () => {
  const { data, isLoading } = useQuery<AuthPosts>({
    queryFn: fetchAuthPosts,
    queryKey: ['auth-posts'],
  })
  if (isLoading) {
    return <h4 className="text-neutral-300 font-semibold mt-6">Loading...</h4>
  }

  return (
    <div>
      {data?.Post?.map((post) => (
        <EditPost
          id={post.id}
          key={post.id}
          avatar={data.image}
          name={data.name}
          title={post.title}
          comments={post.comments}
        />
      ))}
    </div>
  )
}

export default MyPosts
