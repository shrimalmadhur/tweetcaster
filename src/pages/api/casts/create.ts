// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }

    console.log(req.body)

    try {
        const result = await axios.post("https://guardian.farcaster.xyz/indexer/activity", req.body, {
            headers: req.headers
        })
        console.log(result)
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }  
}