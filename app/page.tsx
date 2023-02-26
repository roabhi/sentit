'use client'

import AddPost from './components/AddPost'

export default function Home() {
  return (
    <main className="container mx-auto text-teal-500">
      <h4 className="text-neutral-300 font-semibold">Write your crap</h4>
      <AddPost />
    </main>
  )
}
