// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client';
import { allPostsQuery } from '../../../utils/queries'



export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        const q = allPostsQuery();

        const data = await client.fetch(q);

        res.status(200).json(data)
    } else if (req.method === 'POST') {
        const doc = req.body;

        client.create(doc)
            .then(() => res.status(201).json('Video Uploaded'))
    }
}
