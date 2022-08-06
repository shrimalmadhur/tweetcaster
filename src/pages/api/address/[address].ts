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
  const address = req.query.address;
  try {
    const result = await axios.get("https://searchcaster.xyz/api/profiles?connected_address=" + address);
    // console.log(result)
    res.status(200).json(result.data);
  } catch (error) {
    console.log(error);
    return res.status(500).end(error);
  }
}