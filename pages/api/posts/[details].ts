import prisma from '../../../prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      console.log(req.query)
      const data = await prisma.post.findUnique({
        where: { id: req.query.details },
        include: {
          user: true,
          comments: { orderBy: { createdAt: 'desc' }, include: { user: true } },
        },
      })
      return res.status(200).json(data)
    } catch (error) {
      res.status(403).json({ error: 'Error ocurred' })
    }
  }
}

export default handler
