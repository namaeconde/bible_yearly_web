// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { promises as fs } from 'fs'

type Data = {
  Date: string,
  "Old Testament": string,
  "New Testament": string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const months = ['January','February','March','April','May','June',
    'July','August','September','October','November','December'];
  const now = new Date();
  const date = now.getDate();
  const month = months[now.getMonth()];

  const jsonDirectory = path.join(process.cwd(), 'json');
  fs.readFile(jsonDirectory + `/${month.toLowerCase()}.json`, 'utf8').then((content) => {
    const reading = JSON.parse(content)[date > -1 ? date-1 : 0];
    res.status(200).json({
      Date: `${month} ${date}, ${now.getFullYear()}`,
      "Old Testament": reading["Old Testament"],
      "New Testament": reading["New Testament"]
    })
  })
}
