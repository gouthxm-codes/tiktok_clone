// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client';

import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from '../../../utils/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {

        const { id } = req.query;

        const q = singleUserQuery(id)
        const uVideos = userCreatedPostsQuery(id)
        const uLiked = userLikedPostsQuery(id)
        const user = await client.fetch(q)
        const userVideos = await client.fetch(uVideos)
        const userLiked = await client.fetch(uLiked)


        res.status(200).json({ user: user[0], userVideos, userLiked })

    }
}
