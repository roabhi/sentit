'use client'

import Post from '@/app/components/Post'
import { PostType } from '@/app/types/Posts'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type URL = {
  params: {
    slug: string
  }
}

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`)
  return response.data
}

const PostDetail = (url: URL) => {
  const { data, isLoading } = useQuery<PostType>({
    queryFn: () => fetchDetails(url.params.slug),
    queryKey: ['detail-post'],
  })

  if (isLoading)
    return <h4 className="text-neutral-300 font-semibold">Loading...</h4>
  console.log(data)
  return (
    <div>
      <h1>Hello</h1>
    </div>
  )
}

export default PostDetail
