'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'

const AddPost = () => {
  const [title, setTitle] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)

  const queryClient = useQueryClient()

  // * Create a Post
  const { mutate } = useMutation(
    /**
     * ? A mutation from tanstack query tells
     * ? our app that we intent on making changes
     * ? but we need to use either the fetch API
     * ? or axios in order to actually make the calls
     *
     * ? here we just declaring the fucntion as mutation
     */

    async (title: string) => await axios.post('/api/posts/addPost', { title }),
    {
      onError: (error) => {
        // ? Wrap the error on its own type to avoid TS hints
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message)
        }
        setIsDisabled(false)
      },
      onSuccess: (data) => {
        toast.success('Post created successfully')
        setTitle('')
        setIsDisabled(false)
      },
    }
  )

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(title)
    setIsDisabled(true)
    mutate(title)
  }

  return (
    <form onSubmit={submitPost} className="bg-neutral-800 my-8 p-8 rounded-md">
      <div className="flex flex-col my-4">
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          name="title"
          placeholder="What's on your mind?"
          className="p-4 text-lg rounded-md my-2 bg-neutral-900 focus:outline-none focus:border-2 focus:border-teal-700"
        ></textarea>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? 'text-red-500' : 'text-gray-500'
          }`}
        >{`${title.length}/300`}</p>
        <button
          disabled={isDisabled}
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-md disabled:opacity-25"
          type="submit"
        >
          Create a Post
        </button>
      </div>
    </form>
  )
}

export default AddPost
