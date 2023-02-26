import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import prisma from '../../../prisma/client'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
      return res.status(401).json({ message: 'Please sign in' })
    }

    //? Delete Post

    try {
      const postId = req.body
      const result = await prisma.post.delete({
        where: {
          id: postId,
        },
      })
      res.status(200).json(result)
    } catch (error) {
      res.status(403).json({ message: 'Error fething user posts' })
    }
  }
}

export default handler
