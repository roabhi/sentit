'use client'

import Image from 'next/image'
import { useState } from 'react'
import Toggle from './Toggle'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'

type EditProps = {
  id: string
  avatar: string
  name: string
  title: string
  comments?: {
    id: string
    postId: string
    userId: string
  }[]
}

const EditPost = ({ avatar, name, title, comments, id }: EditProps) => {
  // ? Toggle
  const [toggle, setToggle] = useState(false)
  let deleteToastId: string
  const queryClient = useQueryClient()
  // ? Delete Post
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete('/api/posts/deletePost', { data: id }),
    {
      onError: (error) => {
        console.log(error)
        toast.error('Error deleting the post', { id: deleteToastId })
      },
      onSuccess: (data) => {
        console.log(data)
        toast.success('Post has been deleted', { id: deleteToastId })
        queryClient.invalidateQueries(['auth-posts'])
      },
    }
  )

  const deletePost = () => {
    deleteToastId = toast.loading('Deleting the post')
    mutate(id)
  }
  return (
    <>
      <div className="bg-zinc-800 my-8 p-8 rounded-lg">
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full"
            width={32}
            height={32}
            alt="avatar"
            src={avatar}
          />
          <h3 className="font-bold text-gray-700">{name}</h3>
        </div>
        <div className="my-8">
          <p className="break-all text-zinc-400">{title}</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-bold text-gray-500">
            {comments?.length} Comments
          </p>
          <button
            className="text-sm font-bold px-4 py-2 rounded-md bg-red-500 text-neutral-200"
            onClick={(e) => {
              setToggle(true)
            }}
          >
            Delete
          </button>
        </div>
      </div>
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
    </>
  )
}

export default EditPost
