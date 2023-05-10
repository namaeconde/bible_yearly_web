// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { promises as fs } from 'fs'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { month } = req.query;
    const jsonDirectory = path.join(process.cwd(), 'json');
    fs.readFile(jsonDirectory + `/${month}.json`, 'utf8').then((content) => {
        const reading = JSON.parse(content);

        res.status(200).json(reading);
    })
}
