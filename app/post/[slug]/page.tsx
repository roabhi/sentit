'use client'

import Post from '@/app/components/Post'
import { PostType } from '@/app/types/Post'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import AddComment from '@/app/components/AddComment'
import Image from 'next/image'

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
  // console.log(data)
  return (
    <div>
      <Post
        id={data?.id}
        name={data?.user.name}
        avatar={data?.user.image}
        postTitle={data?.title}
        comments={data?.comments}
      />
      <AddComment id={data?.id} />
      {data?.comments?.map((comment) => (
        <div key={comment.id} className="my-6 bg-neutral-800 p-8 rounded-md">
          <div className="flex items-center gap-2">
            <Image
              className="rounded-full"
              width={24}
              height={24}
              src={comment.user?.image}
              alt="avatar"
            />
            <h3 className="font-bold pl-3 text-gray-500">
              {comment?.user?.name}
            </h3>
            <h2 className="text-sm pl-3 text-gray-500">{comment.createdAt}</h2>
          </div>
          <div className="pt-6 text-gray-500">{comment.message}</div>
        </div>
      ))}
    </div>
  )
}

export default PostDetail
