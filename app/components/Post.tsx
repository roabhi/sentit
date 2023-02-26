'use client'

import Image from 'next/image'
import Link from 'next/link'

const Post = ({ avatar, name, postTitle, id }) => {
  return (
    <div className="bg-zinc-800 my-8 p-8 rounded-lg">
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          src={avatar}
          alt="avatar"
        />
        <h3 className="font-bold pl-3 text-gray-500">{name}</h3>
      </div>
      <div className="my-8">
        <p className="break-all text-zinc-400">{postTitle}</p>
      </div>
      <div className="flex gap-4 cursor-pointer items-center">
        <Link href={`/posts/${id}`}>
          <p className="text-sm font-bold text-gray-500">Comments</p>
        </Link>
      </div>
    </div>
  )
}

export default Post
