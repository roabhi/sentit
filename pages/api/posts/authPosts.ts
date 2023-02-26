import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import prisma from '../../../prisma/client'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
      return res.status(401).json({ message: 'Please sign in' })
    }

    //? Get auth user posts

    try {
      const data = await prisma.user.findUnique({
        where: {
          email: session.user?.email,
        },
        include: {
          Post: {
            orderBy: {
              createdAt: 'desc',
            },
            include: {
              comments: true,
            },
          },
        },
      })
      res.status(200).json(data)
    } catch (error) {
      res.status(403).json({ message: 'Error fething user posts' })
    }
  }
}

export default handler
