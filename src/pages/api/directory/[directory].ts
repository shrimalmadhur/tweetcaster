// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const url = req.query.directory;
  try {
    const result = await axios.get(url);
    res.status(200).json(result.data);
  } catch (error) {
    console.log(error);
    return res.status(500).end(error);
  }
}
