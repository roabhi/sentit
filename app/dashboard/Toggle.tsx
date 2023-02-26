'use client'

type ToggleProps = {
  deletePost: () => void
  setToggle: (toggle: Boolean) => void
}

const Toggle = ({ deletePost, setToggle }: ToggleProps) => {
  return (
    <div
      className="fixed bg-black/70 w-full h-full z-20 left-0 top-0"
      onClick={(e) => setToggle(false)}
    >
      <div className="absolute bg-neutral-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <h2 className="text-lg text-center">
          Are you sure you want to delete this post?
        </h2>
        <button
          onClick={deletePost}
          className="text-sm font-bold px-4 py-2 rounded-md bg-red-500 text-neutral-200"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Toggle
