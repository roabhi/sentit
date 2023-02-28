import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import prisma from '../../../prisma/client'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
      return res.status(401).json({ message: 'Please log in to make a post' })
    }
    const title: string = req.body.title

    //? Get user

    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email! },
    })

    // ?Check on title
    if (title.length > 300) {
      return res.status(403).json({ message: 'Please write a shorter message' })
    }
    if (!title.length) {
      return res
        .status(403)
        .json({ message: 'Please do not leave an empty title' })
    }

    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: prismaUser?.id!,
        },
      })
      res.status(200).json(result)
    } catch (error) {
      res.status(403).json({ message: 'Error while creating a post' })
    }
  }
}

export default handler
