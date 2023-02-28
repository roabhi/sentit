'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'

type PostProps = {
  id?: string
}

type Comment = {
  postId?: string
  title: string
}

const AddComment = ({ id }: PostProps) => {
  const [title, setTitle] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)

  const queryClient = useQueryClient()
  let commentToastId: string

  const { mutate } = useMutation(
    async (data: Comment) =>
      await axios.post('/api/posts/addComment', { data }),
    {
      onSuccess: (data) => {
        setTitle('')
        setIsDisabled(false)
        queryClient.invalidateQueries(['detail-post'])
        toast.success('Comment added successfully', { id: commentToastId })
      },
      onError: (error) => {
        setIsDisabled(false)
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: commentToastId })
        }
      },
    }
  )

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisabled(true)
    commentToastId = toast.loading('Adding your comment', {
      id: commentToastId,
    })
    mutate({ title, postId: id })
  }

  return (
    <form onSubmit={submitComment} className="my-8">
      <h3 className="text-neutral-300 font-semibold">Add Comment</h3>
      <div className="flex flex-col my-2">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"
          className="p4 text-teal-700 rounded-md my-2 bg-neutral-800 focus:outline-none focus:border-2 focus:border-teal-700 placeholder:text-zinc-400"
        ></input>
      </div>
      <div className="flex items-center justify-between gap-2">
        <button
          disabled={isDisabled}
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-md disabled:opacity-25"
          type="submit"
        >
          Add Comment
        </button>
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? 'text-red-500' : 'text-gray-500'
          }`}
        >{`${title.length}/300`}</p>
      </div>
    </form>
  )
}

export default AddComment
